import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Clock3,
  FileText,
  LogOut,
  Menu,
  Shield,
  LayoutDashboard,
  Settings,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";
import { api, formatCurrency, formatShortDate } from "../services/api";

const DEFAULT_FORM = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  bmi: "",
  smoking: "",
  region: "",
  children: "",
};

const DEFAULT_PROFILE = {
  name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  bloodGroup: "",
  emergencyContact: "",
};

const COLORS = [
  "#005BEA",
  "#0078F0",
  "#00A8FB",
  "#00C6FB",
  "#6BD6FF",
  "#B3E5FF",
];

function calculateBmi(height, weight) {
  const h = Number(height);
  const w = Number(weight);
  if (!h || !w) {
    return "";
  }

  const bmi = w / (h / 100) ** 2;
  return Number.isFinite(bmi) ? bmi.toFixed(1) : "";
}

function getInitials(name) {
  if (!name) {
    return "MP";
  }

  return (
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") || "MP"
  );
}

function buildPieData(breakdown) {
  if (Array.isArray(breakdown) && breakdown.length > 0) {
    return breakdown.map((item) => ({
      name: item.name,
      value: Number(item.value || 0),
    }));
  }

  return [
    { name: "Base Premium", value: 800 },
    { name: "Age Factor", value: 1000 },
    { name: "Health Factor", value: 1200 },
    { name: "BMI Factor", value: 800 },
    { name: "Smoking Factor", value: 600 },
    { name: "Regional Factor", value: 400 },
  ];
}

function buildMonthlyChartData(monthlyTrend) {
  if (!Array.isArray(monthlyTrend) || monthlyTrend.length === 0) {
    return [];
  }

  return monthlyTrend.map((item) => ({
    month: item.month,
    premium: Math.round(Number(item.premium || 0)),
  }));
}

export function DashboardPage({
  onNavigate,
  session,
  onLogout,
  onSessionUpdate,
}) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSubmittingPrediction, setIsSubmittingPrediction] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [summary, setSummary] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [profileForm, setProfileForm] = useState(DEFAULT_PROFILE);
  const [formData, setFormData] = useState(DEFAULT_FORM);

  const handleSessionExpiry = () => {
    onLogout?.();
    onNavigate("auth");
  };

  useEffect(() => {
    if (!session?.token) {
      onNavigate("auth");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        const [me, summaryResponse] = await Promise.all([
          api.me(session.token),
          api.getDashboardSummary(session.token),
        ]);

        setProfileForm({
          name: me?.name || session?.user?.name || "",
          email: me?.email || session?.user?.email || "",
          phone: me?.phone || "",
          dateOfBirth: me?.dateOfBirth || "",
          bloodGroup: me?.bloodGroup || "",
          emergencyContact: me?.emergencyContact || "",
        });

        setSummary(summaryResponse);
        if (summaryResponse?.latestPrediction) {
          setPredictionResult(summaryResponse.latestPrediction);
        }
      } catch (error) {
        setErrorMessage(error.message || "Unable to load dashboard data");
        toast.error(error.message || "Unable to load dashboard data");
        if (
          /authorization|session expired|unauthorized/i.test(
            error.message || ""
          )
        ) {
          handleSessionExpiry();
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [onNavigate, session]);

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      bmi: calculateBmi(current.height, current.weight),
    }));
  }, [formData.height, formData.weight]);

  const monthlyPremiumData = useMemo(
    () => buildMonthlyChartData(summary?.monthlyTrend),
    [summary]
  );

  const historyRows = summary?.recentPredictions || [];
  const pieData = useMemo(
    () => buildPieData(predictionResult?.breakdown),
    [predictionResult]
  );
  const localContributions =
    predictionResult?.mlResponse?.interpretability?.localFeatureContributions ||
    [];

  const globalImportance =
    predictionResult?.mlResponse?.interpretability?.globalFeatureImportance ||
    [];

  const modelMetrics =
    predictionResult?.mlResponse?.interpretability?.modelMetrics;

  const inputCoverage =
    predictionResult?.mlResponse?.interpretability?.inputCoverage;
  const annualPremium =
    summary?.latestPrediction?.annualPremium ||
    predictionResult?.annualPremium ||
    0;
  const monthlyPremium =
    predictionResult?.monthlyPremium ||
    summary?.latestPrediction?.monthlyPremium ||
    0;
  const currentFallback = Boolean(predictionResult?.fallbackUsed);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: TrendingUp, label: "Premium Predictor", id: "premium" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const handleLogout = () => {
    onLogout?.();
    onNavigate("home");
  };

  const handlePredictionSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmittingPrediction(true);

    try {
      const payload = {
        age: Number(formData.age),
        gender: formData.gender,
        heightCm: Number(formData.height),
        weightKg: Number(formData.weight),
        bmi: formData.bmi ? Number(formData.bmi) : null,
        smokingStatus: formData.smoking,
        region: formData.region,
        children: formData.children ? Number(formData.children) : 0,
      };

      const result = await api.createPrediction(session.token, payload);
      setPredictionResult(result);
      toast.success("Premium prediction created");

      const updatedSummary = await api.getDashboardSummary(session.token);
      setSummary(updatedSummary);
      if (updatedSummary?.latestPrediction) {
        setPredictionResult(result);
      }
    } catch (error) {
      setErrorMessage(error.message || "Unable to generate prediction");
      toast.error(error.message || "Unable to generate prediction");
      if (
        /authorization|session expired|unauthorized/i.test(error.message || "")
      ) {
        handleSessionExpiry();
      }
    } finally {
      setIsSubmittingPrediction(false);
    }
  };

  const handleProfileSave = async () => {
    setErrorMessage("");
    setIsSavingProfile(true);

    try {
      const updated = await api.updateProfile(session.token, profileForm);
      onSessionUpdate?.((current) => ({
        ...current,
        user: {
          ...(current?.user || {}),
          ...updated,
        },
      }));
      toast.success("Profile updated");
    } catch (error) {
      setErrorMessage(error.message || "Unable to update profile");
      toast.error(error.message || "Unable to update profile");
      if (
        /authorization|session expired|unauthorized/i.test(error.message || "")
      ) {
        handleSessionExpiry();
      }
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (!session?.token) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F5F7FA]">
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#005BEA] to-[#00C6FB] text-white shadow-lg">
            <Activity className="h-7 w-7 animate-pulse" />
          </div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F5F7FA] overflow-hidden">
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col transform transition-transform duration-300 ${
          isMobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#005BEA] to-[#00C6FB]">
              <Activity className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#005BEA] to-[#00C6FB] bg-clip-text text-transparent">
              MediPredict
            </span>
          </div>
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="lg:hidden"
          >
            <X />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? "bg-gradient-to-r from-[#005BEA] to-[#00C6FB] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t space-y-3">
          <button
            onClick={() => onNavigate("home")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <FileText className="h-5 w-5" />
            Home
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="flex justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <button
                className="lg:hidden"
                onClick={() => setIsMobileSidebarOpen(true)}
              >
                <Menu />
              </button>
              <div>
                <h1 className="text-xl font-bold">
                  Welcome back, {session?.user?.name || "User"}!
                </h1>
                <p className="text-sm text-gray-600">
                  Insurance premium prediction overview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right">
                <div className="text-sm font-medium">
                  {session?.user?.email}
                </div>
                <div className="text-xs text-gray-500">
                  {summary?.mlServiceHealthy
                    ? "ML service connected"
                    : "ML fallback active"}
                </div>
              </div>
              <Avatar className="bg-gradient-to-br from-[#005BEA] to-[#00C6FB]">
                <AvatarFallback className="text-white">
                  {getInitials(session?.user?.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {errorMessage ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </div>
          ) : null}

          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Annual Insurance Premium</CardTitle>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold">
                    {formatCurrency(annualPremium)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Latest Monthly Premium</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-3xl font-bold text-[#005BEA]">
                      {formatCurrency(monthlyPremium)}
                    </div>
                    <p className="text-sm text-gray-500">
                      {predictionResult?.predictionSource ||
                        summary?.latestPrediction?.predictionSource ||
                        "No prediction yet"}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prediction Count</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="text-3xl font-bold text-[#005BEA]">
                      {summary?.totalPredictions || 0}
                    </div>
                    <p className="text-sm text-gray-500">
                      Stored in your account history
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Recent Cost Breakdown</CardTitle>

                    <CardDescription>
                      Detailed contribution of factors to your latest monthly
                      premium
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {pieData.length > 0 ? (
                      <div className="space-y-6">
                        {/* BREAKDOWN */}
                        <div className="space-y-5">
                          {pieData.map((item, index) => {
                            const percentage =
                              monthlyPremium > 0
                                ? (
                                    (Number(item.value || 0) /
                                      Number(monthlyPremium || 1)) *
                                    100
                                  ).toFixed(1)
                                : 0;

                            return (
                              <div key={item.name} className="space-y-2">
                                {/* LABEL + VALUE */}
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-gray-800">
                                      {item.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                      {percentage}% contribution
                                    </p>
                                  </div>

                                  <p className="font-semibold text-[#005BEA]">
                                    {formatCurrency(item.value)}
                                  </p>
                                </div>

                                {/* PROGRESS BAR */}
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                      width: `${Math.min(percentage, 100)}%`,
                                      background: COLORS[index % COLORS.length],
                                    }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* SUMMARY */}
                        <div className="rounded-xl border bg-[#F5F7FA] p-4">
                          <p className="font-semibold text-[#005BEA] mb-2">
                            Premium Summary
                          </p>

                          <p className="text-sm text-gray-600 leading-relaxed">
                            Your premium is primarily influenced by lifestyle,
                            BMI, age, and regional healthcare costs. Maintaining
                            healthier habits can help reduce long-term insurance
                            premiums.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed p-10 text-center text-sm text-gray-500">
                        Generate a premium prediction to view the latest cost
                        breakdown.
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Prediction Snapshot</CardTitle>
                    <CardDescription>
                      Latest result from the ML service or fallback logic
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-xl bg-gradient-to-br from-[#005BEA]/10 to-[#00C6FB]/10 p-4">
                      <p className="text-sm text-gray-600 mb-1">
                        Current estimate
                      </p>
                      <p className="text-3xl font-bold text-[#005BEA]">
                        {formatCurrency(monthlyPremium)}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Processing time:{" "}
                        {predictionResult?.processingTimeMs || 0} ms
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Sparkles className="h-4 w-4 text-[#005BEA]" />
                      {currentFallback
                        ? "Fallback estimate generated locally"
                        : "Prediction generated from ML microservice"}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock3 className="h-4 w-4 text-[#005BEA]" />
                      Model version:{" "}
                      {predictionResult?.mlModelVersion ||
                        summary?.mlModelVersion ||
                        "unknown"}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Premium Prediction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Region</TableHead>
                        <TableHead>Smoking</TableHead>
                        <TableHead className="text-right">
                          Monthly Premium
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historyRows.length > 0 ? (
                        historyRows.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>
                              {formatShortDate(row.createdAt)}
                            </TableCell>
                            <TableCell>{row.region || "-"}</TableCell>
                            <TableCell>{row.smokingStatus || "-"}</TableCell>
                            <TableCell className="text-right">
                              {formatCurrency(row.monthlyPremium)}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center text-gray-500"
                          >
                            No saved predictions yet
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "premium" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#005BEA]" />
                    Insurance Premium Estimator
                  </CardTitle>
                  <CardDescription>
                    Enter your details to get an estimated monthly insurance
                    premium
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handlePredictionSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Enter your age"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) =>
                            setFormData({ ...formData, gender: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input
                          id="height"
                          type="number"
                          placeholder="Enter height in cm"
                          value={formData.height}
                          onChange={(e) =>
                            setFormData({ ...formData, height: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Enter weight in kg"
                          value={formData.weight}
                          onChange={(e) =>
                            setFormData({ ...formData, weight: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bmi">BMI (Auto Calculated)</Label>
                        <Input
                          id="bmi"
                          type="text"
                          readOnly
                          placeholder="Will be calculated automatically"
                          value={formData.bmi}
                          className="bg-gray-100"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="smoking">Smoking Status</Label>
                        <Select
                          value={formData.smoking}
                          onValueChange={(value) =>
                            setFormData({ ...formData, smoking: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select smoking status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="smoker">Smoker</SelectItem>
                            <SelectItem value="non-smoker">
                              Non-Smoker
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="region">Region</Label>
                        <Select
                          value={formData.region}
                          onValueChange={(value) =>
                            setFormData({ ...formData, region: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="north">North</SelectItem>
                            <SelectItem value="south">South</SelectItem>
                            <SelectItem value="east">East</SelectItem>
                            <SelectItem value="west">West</SelectItem>
                            <SelectItem value="northwest">
                              North West
                            </SelectItem>
                            <SelectItem value="northeast">
                              North East
                            </SelectItem>
                            <SelectItem value="southwest">
                              South West
                            </SelectItem>
                            <SelectItem value="southeast">
                              South East
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="children">Dependents / Children</Label>

                        <Input
                          id="children"
                          type="number"
                          min="0"
                          placeholder="Enter number of dependents"
                          value={formData.children}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              children: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90"
                      size="lg"
                      disabled={isSubmittingPrediction}
                    >
                      <BarChart3 className="mr-2 h-5 w-5" />
                      {isSubmittingPrediction
                        ? "Generating..."
                        : "Generate Premium Cost"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {predictionResult && (
                <Card className="border-2 border-[#005BEA]">
                  <CardHeader>
                    <CardTitle className="text-[#005BEA]">
                      Insurance Premium Results
                    </CardTitle>
                    <CardDescription>
                      Based on your provided details
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="p-4 bg-gradient-to-br from-[#005BEA]/10 to-[#00C6FB]/10 rounded-lg text-center">
                      <p className="text-sm text-gray-600 mb-1">
                        Estimated Monthly Premium
                      </p>
                      <p className="text-3xl text-[#005BEA] font-bold">
                        {formatCurrency(predictionResult.monthlyPremium)}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">
                        {predictionResult.fallbackUsed
                          ? "Generated by fallback logic because the ML service was unavailable."
                          : "Generated by the ML microservice."}
                      </p>
                    </div>

                    <div className="space-y-10">
                      {/* TOP SECTION */}
                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
                        {/* PIE CHART */}
                        <div className="rounded-2xl border bg-white p-5 shadow-sm">
                          <div className="mb-4">
                            <h3 className="text-xl font-semibold text-[#005BEA]">
                              Premium Breakdown
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              Distribution of premium contribution factors
                            </p>
                          </div>

                          <div className="h-[380px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  dataKey="value"
                                  cx="50%"
                                  cy="50%"
                                  outerRadius={120}
                                  label={({ name, value }) =>
                                    `${name}: ${formatCurrency(value)}`
                                  }
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell
                                      key={entry.name}
                                      fill={COLORS[index % COLORS.length]}
                                    />
                                  ))}
                                </Pie>

                                <Tooltip
                                  formatter={(value) => [
                                    formatCurrency(value),
                                    "Premium",
                                  ]}
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* RESULT DETAILS */}
                        <div className="space-y-4">
                          <div className="rounded-2xl border bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                              Processing Time
                            </p>

                            <p className="text-3xl font-bold text-[#005BEA] mt-2">
                              {predictionResult.processingTimeMs || 0} ms
                            </p>
                          </div>

                          <div className="rounded-2xl border bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                              Model Version
                            </p>

                            <p className="text-2xl font-bold text-[#005BEA] mt-2">
                              {predictionResult.mlModelVersion || "unknown"}
                            </p>
                          </div>

                          <div className="rounded-2xl border bg-white p-5 shadow-sm">
                            <p className="text-sm text-gray-500">
                              Prediction Source
                            </p>

                            <p className="text-lg font-semibold mt-2">
                              {predictionResult.predictionSource}
                            </p>
                          </div>

                          <div className="rounded-2xl border bg-gradient-to-br from-[#005BEA]/10 to-[#00C6FB]/10 p-5 shadow-sm">
                            <p className="text-sm text-gray-600">
                              Annual Premium Estimate
                            </p>

                            <p className="text-3xl font-bold text-[#005BEA] mt-2">
                              {formatCurrency(predictionResult.annualPremium)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ================= INTERPRETABILITY SECTION ================= */}

                      {localContributions.length > 0 && (
                        <div className="space-y-8">
                          {/* SECTION HEADER */}
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h2 className="text-2xl font-bold text-[#005BEA]">
                                Model Interpretability
                              </h2>

                              <p className="text-sm text-gray-500 mt-1">
                                Understand how the machine learning model
                                generated this prediction
                              </p>
                            </div>
                          </div>

                          {/* LOCAL CONTRIBUTIONS */}
                          <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">
                              <CardTitle>Local Feature Contributions</CardTitle>

                              <CardDescription>
                                Influence of each feature on the current
                                prediction
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-6">
                              <div className="h-[380px]">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={localContributions}>
                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis
                                      dataKey="feature"
                                      tick={{ fontSize: 12 }}
                                    />

                                    <YAxis />

                                    <Tooltip />

                                    <Bar
                                      dataKey="contribution"
                                      fill="#005BEA"
                                      radius={[8, 8, 0, 0]}
                                    />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </CardContent>
                          </Card>

                          {/* GLOBAL IMPORTANCE */}
                          <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">
                              <CardTitle>Global Feature Importance</CardTitle>

                              <CardDescription>
                                Overall contribution of features learned by the
                                model
                              </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-5 pt-6">
                              {globalImportance.map((item) => (
                                <div key={item.feature} className="space-y-2">
                                  <div className="flex items-center justify-between text-sm font-medium">
                                    <span>{item.feature}</span>

                                    <span className="text-[#005BEA]">
                                      {Number(item.importance || 0).toFixed(3)}
                                    </span>
                                  </div>

                                  <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                                    <div
                                      className="h-full rounded-full bg-gradient-to-r from-[#005BEA] to-[#00C6FB]"
                                      style={{
                                        width: `${Math.min(
                                          Number(item.importance || 0) * 100,
                                          100
                                        )}%`,
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </CardContent>
                          </Card>

                          {/* METRICS + COVERAGE */}
                          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* MODEL METRICS */}
                            {modelMetrics && (
                              <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">
                                  <CardTitle>Model Metrics</CardTitle>

                                  <CardDescription>
                                    Performance metrics of the ML model
                                  </CardDescription>
                                </CardHeader>

                                <CardContent className="pt-6">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="rounded-xl bg-[#F5F7FA] p-5 text-center">
                                      <p className="text-sm text-gray-500">
                                        MAE
                                      </p>

                                      <p className="text-2xl font-bold text-[#005BEA] mt-2">
                                        {modelMetrics.mae ?? "-"}
                                      </p>
                                    </div>

                                    <div className="rounded-xl bg-[#F5F7FA] p-5 text-center">
                                      <p className="text-sm text-gray-500">
                                        RMSE
                                      </p>

                                      <p className="text-2xl font-bold text-[#005BEA] mt-2">
                                        {modelMetrics.rmse ?? "-"}
                                      </p>
                                    </div>

                                    <div className="rounded-xl bg-[#F5F7FA] p-5 text-center">
                                      <p className="text-sm text-gray-500">
                                        R² Score
                                      </p>

                                      <p className="text-2xl font-bold text-[#005BEA] mt-2">
                                        {modelMetrics.r2 ?? "-"}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}

                            {/* INPUT COVERAGE */}
                            {inputCoverage && (
                              <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">
                                  <CardTitle>Input Coverage</CardTitle>

                                  <CardDescription>
                                    Completeness of provided user inputs
                                  </CardDescription>
                                </CardHeader>

                                <CardContent className="space-y-5 pt-6">
                                  <div>
                                    <p className="text-sm text-gray-500">
                                      Coverage Score
                                    </p>

                                    <p className="text-4xl font-bold text-[#005BEA] mt-2">
                                      {inputCoverage.coverageScore ?? "-"}
                                    </p>
                                  </div>

                                  {inputCoverage.missingFeatures?.length >
                                    0 && (
                                    <div>
                                      <p className="font-semibold text-red-600 mb-3">
                                        Missing Features
                                      </p>

                                      <div className="flex flex-wrap gap-2">
                                        {inputCoverage.missingFeatures.map(
                                          (feature) => (
                                            <span
                                              key={feature}
                                              className="px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-sm"
                                            >
                                              {feature}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="pt-6 text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4 bg-gradient-to-br from-[#005BEA] to-[#00C6FB]">
                    <AvatarFallback className="text-white text-2xl">
                      {getInitials(profileForm.name)}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold mb-1">
                    {profileForm.name || "User"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {profileForm.email || session?.user?.email}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setActiveTab("premium")}
                  >
                    Run New Prediction
                  </Button>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={profileForm.name}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input value={profileForm.email} type="email" readOnly />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={profileForm.phone}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Date of Birth</Label>
                      <Input
                        value={profileForm.dateOfBirth}
                        type="date"
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            dateOfBirth: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Blood Group</Label>
                      <Select
                        value={profileForm.bloodGroup || undefined}
                        onValueChange={(value) =>
                          setProfileForm({ ...profileForm, bloodGroup: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="o-positive">O+</SelectItem>
                          <SelectItem value="o-negative">O-</SelectItem>
                          <SelectItem value="a-positive">A+</SelectItem>
                          <SelectItem value="a-negative">A-</SelectItem>
                          <SelectItem value="b-positive">B+</SelectItem>
                          <SelectItem value="b-negative">B-</SelectItem>
                          <SelectItem value="ab-positive">AB+</SelectItem>
                          <SelectItem value="ab-negative">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Emergency Contact</Label>
                      <Input
                        value={profileForm.emergencyContact}
                        onChange={(e) =>
                          setProfileForm({
                            ...profileForm,
                            emergencyContact: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    className="bg-gradient-to-r from-[#005BEA] to-[#00C6FB] hover:opacity-90"
                    onClick={handleProfileSave}
                    disabled={isSavingProfile}
                  >
                    {isSavingProfile ? "Saving..." : "Save Changes"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
