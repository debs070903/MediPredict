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

import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";

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
  ResponsiveContainer
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

  alcohol_freq: "",
  urban_rural: "",
  household_size: "",
  income: "",
  employment_status: "",

  visits_last_year: "",
  hospitalizations_last_3yrs: "",
  days_hospitalized_last_3yrs: "",
  medication_count: "",

  hypertension: false,
  diabetes: false,
  asthma: false,
  copd: false,
  cardiovascular_disease: false,
  cancer_history: false,
  kidney_disease: false,
  liver_disease: false,
  arthritis: false,
  mental_health: false,

  systolic_bp: "",
  diastolic_bp: "",
  ldl: "",
  hba1c: "",

  had_major_procedure: false,
  proc_imaging_count: "",
  proc_surgery_count: "",
  proc_physio_count: "",
  proc_consult_count: "",
  proc_lab_count: "",
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
  const [usdToInrRate, setUsdToInrRate] = useState(85);
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

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");

        const data = await response.json();

        if (data?.rates?.INR) {
          setUsdToInrRate(data.rates.INR);
        }
      } catch (error) {
        console.error("Exchange rate fetch failed:", error);
      }
    };

    fetchExchangeRate();
  }, []);

  const chronicConditions = [
    "hypertension",
    "diabetes",
    "asthma",
    "copd",
    "cardiovascular_disease",
    "cancer_history",
    "kidney_disease",
    "liver_disease",
    "arthritis",
    "mental_health",
  ];

  const chronicCount = chronicConditions.filter(
    (condition) => formData[condition]
  ).length;

  const isHighRisk =
    chronicCount >= 3 ||
    formData.smoking === "smoker" ||
    Number(formData.hospitalizations_last_3yrs || 0) > 2;

  const monthlyPremiumData = useMemo(
    () => buildMonthlyChartData(summary?.monthlyTrend),
    [summary]
  );

  const historyRows = summary?.recentPredictions || [];
  useEffect(() => {
    console.log("Prediction Result:", predictionResult);
    console.log("Breakdown:", predictionResult?.breakdown);
  }, [predictionResult]);

  const localContributions = (
    predictionResult?.mlResponse?.interpretability?.localFeatureContributions ||
    []
  )
    .filter(
      (item) =>
        item.contribution !== null &&
        item.contribution !== undefined &&
        item.contribution !== 0
    )
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));

  const baseValue =
    predictionResult?.mlResponse?.interpretability?.baseValue || 0;

  const contributionLedger = localContributions.map((item) => ({
    feature: item.feature.replaceAll("_", " "),
    contribution: Number(item.contribution || 0),
  }));

  const positiveContributions = contributionLedger.filter(
    (item) => item.contribution >= 1
  );

  const negativeContributions = contributionLedger.filter(
    (item) => item.contribution <= -1
  );

  const globalImportance =
    predictionResult?.mlResponse?.interpretability?.globalFeatureImportance ||
    [];

  const annualPremium =
    (summary?.latestPrediction?.annualPremium ||
      predictionResult?.annualPremium ||
      0) * (usdToInrRate || 85);
  const monthlyPremium =
    (predictionResult?.monthlyPremium ||
      summary?.latestPrediction?.monthlyPremium ||
      0) * (usdToInrRate || 85);
  const currentFallback = Boolean(predictionResult?.fallbackUsed);

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
    { icon: TrendingUp, label: "Premium Predictor", id: "premium" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const handleLogout = () => {
    setPredictionResult(null);
    setFormData(DEFAULT_FORM);

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

        bmi: formData.bmi ? Number(formData.bmi) : 0,

        smokingStatus: formData.smoking,
        region: formData.region,

        children: Number(formData.children || 0),

        alcoholFreq: formData.alcohol_freq,
        urbanRural: formData.urban_rural,
        householdSize: Number(formData.household_size || 0),
        income: Number(formData.income || 0),
        employmentStatus: formData.employment_status,

        visitsLastYear: Number(formData.visits_last_year || 0),

        hospitalizationsLast3Yrs: Number(
          formData.hospitalizations_last_3yrs || 0
        ),

        daysHospitalizedLast3Yrs: Number(
          formData.days_hospitalized_last_3yrs || 0
        ),

        medicationCount: Number(formData.medication_count || 0),

        hypertension: formData.hypertension,
        diabetes: formData.diabetes,
        asthma: formData.asthma,
        copd: formData.copd,
        cardiovascularDisease: formData.cardiovascular_disease,
        cancerHistory: formData.cancer_history,
        kidneyDisease: formData.kidney_disease,
        liverDisease: formData.liver_disease,
        arthritis: formData.arthritis,
        mentalHealth: formData.mental_health,

        chronicCount,
        highRisk: isHighRisk,

        systolicBp: Number(formData.systolic_bp || 0),
        diastolicBp: Number(formData.diastolic_bp || 0),

        ldl: Number(formData.ldl || 0),
        hba1c: Number(formData.hba1c || 0),

        hadMajorProcedure: formData.had_major_procedure,

        procImagingCount: Number(formData.proc_imaging_count || 0),

        procSurgeryCount: Number(formData.proc_surgery_count || 0),

        procPhysioCount: Number(formData.proc_physio_count || 0),

        procConsultCount: Number(formData.proc_consult_count || 0),

        procLabCount: Number(formData.proc_lab_count || 0),
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
    <div className="flex bg-[#F5F7FA] overflow-hidden">
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

      <div className="flex-1 min-h-0 overflow-auto">
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
                    <CardTitle>Top Premium Drivers</CardTitle>

                    <CardDescription>
                      Factors that had the strongest impact on your most recent
                      premium estimate
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {localContributions.length > 0 ? (
                      <div className="space-y-5">
                        {localContributions.slice(0, 10).map((item, index) => {
                          const contribution = Number(item.contribution || 0);

                          const maxContribution = Math.max(
                            ...localContributions.map((x) =>
                              Math.abs(x.contribution)
                            )
                          );

                          const percentage =
                            maxContribution > 0
                              ? (Math.abs(contribution) / maxContribution) * 100
                              : 0;

                          return (
                            <div
                              key={`${item.feature}-${index}`}
                              className="space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium text-gray-800 capitalize">
                                    {item.feature.replaceAll("_", " ")}
                                  </p>

                                  <p className="text-xs text-gray-500">
                                    {contribution > 0
                                      ? "Increased premium"
                                      : "Reduced premium"}
                                  </p>
                                </div>

                                <p
                                  className={`font-semibold ${
                                    contribution > 0
                                      ? "text-red-600"
                                      : "text-green-600"
                                  }`}
                                >
                                  {contribution > 0 ? "+" : ""}
                                  {formatCurrency(
                                    (Math.abs(contribution) / 12) * usdToInrRate
                                  )}
                                </p>
                              </div>

                              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-700 ${
                                    contribution > 0
                                      ? "bg-red-500"
                                      : "bg-green-500"
                                  }`}
                                  style={{
                                    width: `${percentage}%`,
                                  }}
                                />
                              </div>
                            </div>
                          );
                        })}

                        <div className="rounded-xl border bg-[#F5F7FA] p-4">
                          <p className="font-semibold text-[#005BEA] mb-2">
                            Model Explanation
                          </p>

                          <p className="text-sm text-gray-600 leading-relaxed">
                            Green factors reduced your premium, while red
                            factors increased it. The magnitude reflects how
                            strongly each feature influenced the machine
                            learning model's prediction.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed p-10 text-center text-sm text-gray-500">
                        Generate a premium prediction to view the premium
                        drivers.
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

                  <CardContent>
                    {predictionResult ? (
                      <div className="space-y-4">
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
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed p-10 text-center text-sm text-gray-500">
                        No prediction available yet. Generate your first premium
                        estimate to view the latest prediction snapshot.
                      </div>
                    )}
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
                              {formatCurrency(
                                row.monthlyPremium * usdToInrRate
                              )}
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
                      <div className="md:col-span-2">
                        <Separator className="my-2" />
                        <h3 className="text-lg font-semibold text-[#005BEA]">
                          Lifestyle & Healthcare
                        </h3>
                      </div>

                      <div className="space-y-2">
                        <Label>Alcohol Frequency</Label>

                        <Select
                          value={formData.alcohol_freq}
                          onValueChange={(value) =>
                            setFormData({ ...formData, alcohol_freq: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select alcohol frequency" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="never">Never</SelectItem>
                            <SelectItem value="occasionally">
                              Occasionally
                            </SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Urban / Rural</Label>

                        <Select
                          value={formData.urban_rural}
                          onValueChange={(value) =>
                            setFormData({ ...formData, urban_rural: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location type" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="urban">Urban</SelectItem>
                            <SelectItem value="rural">Rural</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Household Size</Label>

                        <Input
                          type="number"
                          value={formData.household_size}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              household_size: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Annual Income</Label>

                        <Input
                          type="number"
                          placeholder="Annual income"
                          value={formData.income}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              income: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Employment Status</Label>

                        <Select
                          value={formData.employment_status}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              employment_status: value,
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Employment status" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectItem value="employed">Employed</SelectItem>
                            <SelectItem value="self-employed">
                              Self Employed
                            </SelectItem>
                            <SelectItem value="unemployed">
                              Unemployed
                            </SelectItem>
                            <SelectItem value="student">Student</SelectItem>
                            <SelectItem value="retired">Retired</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Doctor Visits Last Year</Label>

                        <Input
                          type="number"
                          value={formData.visits_last_year}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              visits_last_year: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Hospitalizations (Last 3 Years)</Label>

                        <Input
                          type="number"
                          value={formData.hospitalizations_last_3yrs}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hospitalizations_last_3yrs: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Days Hospitalized</Label>

                        <Input
                          type="number"
                          value={formData.days_hospitalized_last_3yrs}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              days_hospitalized_last_3yrs: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Medication Count</Label>

                        <Input
                          type="number"
                          value={formData.medication_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              medication_count: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Separator className="my-2" />

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-[#005BEA]">
                              Medical Conditions
                            </h3>

                            <p className="text-sm text-gray-500">
                              Select any chronic conditions you currently have
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Chronic Count
                            </p>

                            <p className="text-2xl font-bold text-[#005BEA]">
                              {chronicCount}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          ["hypertension", "Hypertension"],
                          ["diabetes", "Diabetes"],
                          ["asthma", "Asthma"],
                          ["copd", "COPD"],
                          ["cardiovascular_disease", "Cardiovascular Disease"],
                          ["cancer_history", "Cancer History"],
                          ["kidney_disease", "Kidney Disease"],
                          ["liver_disease", "Liver Disease"],
                          ["arthritis", "Arthritis"],
                          ["mental_health", "Mental Health Condition"],
                        ].map(([key, label]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between rounded-xl border p-4 bg-white shadow-sm"
                          >
                            <Label className="cursor-pointer">{label}</Label>

                            <Checkbox
                              checked={formData[key]}
                              onCheckedChange={(checked) =>
                                setFormData({
                                  ...formData,
                                  [key]: Boolean(checked),
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>

                      <div className="md:col-span-2">
                        <div
                          className={`rounded-xl p-4 border ${
                            isHighRisk
                              ? "bg-red-50 border-red-200"
                              : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p
                                className={`font-semibold ${
                                  isHighRisk ? "text-red-700" : "text-green-700"
                                }`}
                              >
                                {isHighRisk
                                  ? "High Risk Profile"
                                  : "Moderate Risk Profile"}
                              </p>

                              <p className="text-sm text-gray-600 mt-1">
                                Risk level derived automatically using smoking
                                status, hospitalization history, and chronic
                                conditions.
                              </p>
                            </div>

                            <Shield
                              className={`h-8 w-8 ${
                                isHighRisk ? "text-red-600" : "text-green-600"
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <Separator className="my-2" />

                        <h3 className="text-lg font-semibold text-[#005BEA]">
                          Clinical Measurements (Optional)
                        </h3>

                        <p className="text-sm text-gray-500">
                          Optional health metrics for improved prediction
                          accuracy
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label>Systolic BP</Label>

                        <Input
                          type="number"
                          placeholder="Example: 120"
                          value={formData.systolic_bp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              systolic_bp: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Diastolic BP</Label>

                        <Input
                          type="number"
                          placeholder="Example: 80"
                          value={formData.diastolic_bp}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              diastolic_bp: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>LDL Cholesterol</Label>

                        <Input
                          type="number"
                          placeholder="Example: 100"
                          value={formData.ldl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              ldl: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>HbA1c</Label>

                        <Input
                          type="number"
                          step="0.1"
                          placeholder="Example: 5.7"
                          value={formData.hba1c}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              hba1c: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Separator className="my-2" />

                        <h3 className="text-lg font-semibold text-[#005BEA]">
                          Procedure History
                        </h3>

                        <p className="text-sm text-gray-500">
                          Previous procedures and medical service usage
                        </p>
                      </div>

                      <div className="md:col-span-2 flex items-center justify-between rounded-xl border p-4 bg-white shadow-sm">
                        <div>
                          <p className="font-medium">Major Procedure History</p>

                          <p className="text-sm text-gray-500">
                            Includes surgeries or major interventions
                          </p>
                        </div>

                        <Checkbox
                          checked={formData.had_major_procedure}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              had_major_procedure: Boolean(checked),
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Imaging Procedures</Label>

                        <Input
                          type="number"
                          value={formData.proc_imaging_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              proc_imaging_count: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Surgery Procedures</Label>

                        <Input
                          type="number"
                          value={formData.proc_surgery_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              proc_surgery_count: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Physiotherapy Procedures</Label>

                        <Input
                          type="number"
                          value={formData.proc_physio_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              proc_physio_count: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Consultation Procedures</Label>

                        <Input
                          type="number"
                          value={formData.proc_consult_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              proc_consult_count: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Lab Procedures</Label>

                        <Input
                          type="number"
                          value={formData.proc_lab_count}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              proc_lab_count: e.target.value,
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
                        {formatCurrency(
                          predictionResult.monthlyPremium * usdToInrRate
                        )}
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
                        {/* PREMIUM LEDGER */}

                        <div className="rounded-2xl border bg-white p-5 shadow-sm">
                          <div className="mb-5">
                            <h3 className="text-xl font-semibold text-[#005BEA]">
                              Premium Impact Analysis
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              See how different factors increased or reduced
                              your predicted monthly premium
                            </p>
                          </div>

                          <div className="space-y-4">
                            {/* BASE MONTHLY PREMIUM */}

                            <div className="flex justify-between items-center p-3 rounded-lg bg-blue-50 border">
                              <span className="font-semibold">
                                Base Monthly Premium
                              </span>

                              <span className="font-bold text-[#005BEA]">
                                {formatCurrency(
                                  ((baseValue || 0) / 12) * usdToInrRate
                                )}
                              </span>
                            </div>

                            {/* FACTORS INCREASING PREMIUM */}

                            {positiveContributions.length > 0 && (
                              <>
                                <h4 className="font-semibold text-red-600">
                                  Factors Increasing Premium
                                </h4>

                                {positiveContributions.map((item, index) => (
                                  <div
                                    key={`${item.feature}-${index}`}
                                    className="flex justify-between border-b pb-2"
                                  >
                                    <span className="capitalize">
                                      {item.feature}
                                    </span>

                                    <span className="font-bold text-red-600">
                                      +
                                      {formatCurrency(
                                        (item.contribution / 12) * usdToInrRate
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </>
                            )}

                            {/* FACTORS REDUCING PREMIUM */}

                            {negativeContributions.length > 0 && (
                              <>
                                <h4 className="font-semibold text-green-600 pt-4">
                                  Factors Reducing Premium
                                </h4>

                                {negativeContributions.map((item, index) => (
                                  <div
                                    key={`${item.feature}-${index}`}
                                    className="flex justify-between border-b pb-2"
                                  >
                                    <span className="capitalize">
                                      {item.feature}
                                    </span>

                                    <span className="font-bold text-green-600">
                                      {formatCurrency(
                                        (item.contribution / 12) * usdToInrRate
                                      )}
                                    </span>
                                  </div>
                                ))}
                              </>
                            )}

                            {/* FINAL MONTHLY PREMIUM */}

                            <div className="border-t pt-5 mt-5">
                              <div className="flex justify-between items-center">
                                <span className="text-lg font-bold">
                                  Final Monthly Premium
                                </span>

                                <span className="text-2xl font-bold text-[#005BEA]">
                                  {formatCurrency(
                                    predictionResult.monthlyPremium *
                                      usdToInrRate
                                  )}
                                </span>
                              </div>
                            </div>
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
                              {formatCurrency(
                                predictionResult.annualPremium * usdToInrRate
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* ================= INTERPRETABILITY SECTION ================= */}

                      {(localContributions.length > 0 ||
                        globalImportance.length > 0) && (
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
                          {localContributions.length > 0 && (
                            <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
                              <CardHeader className="bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">
                                <CardTitle>
                                  Local Feature Contributions
                                </CardTitle>

                                <CardDescription>
                                  Influence of each feature on the current
                                  prediction
                                </CardDescription>
                              </CardHeader>

                              <CardContent className="pt-6">
                                <div className="h-[380px]">
                                  <ResponsiveContainer
                                    width="100%"
                                    height="100%"
                                  >
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
                          )}

                          {/* GLOBAL IMPORTANCE */}
                          {globalImportance.length > 0 && (
                            <Card className="rounded-2xl border-0 shadow-md overflow-hidden">
                              <CardHeader className="bg-gradient-to-r from-[#005BEA]/5 to-[#00C6FB]/5">
                                <CardTitle>Global Feature Importance</CardTitle>

                                <CardDescription>
                                  Overall contribution of features learned by
                                  the model
                                </CardDescription>
                              </CardHeader>

                              <CardContent className="space-y-5 pt-6">
                                {globalImportance.map((item, index) => (
                                  <div
                                    key={`${item.feature}-${index}`}
                                    className="space-y-2"
                                  >
                                    <div className="flex items-center justify-between text-sm font-medium">
                                      <span>{item.feature}</span>

                                      <span className="text-[#005BEA]">
                                        {Number(item.importance || 0).toFixed(
                                          3
                                        )}
                                      </span>
                                    </div>

                                    <div className="w-full h-3 rounded-full bg-gray-100 overflow-hidden">
                                      <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#005BEA] to-[#00C6FB] transition-all duration-700"
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
                          )}
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
