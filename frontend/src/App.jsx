import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { AuthPage } from "./components/AuthPage";
import { DashboardPage } from "./components/DashboardPage";
import { Toaster } from "./components/ui/sonner";
import { ForgotPasswordPage } from "./components/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/ResetPasswordPage";
import FeaturesPage from "./components/FeaturesPage";
import ContactPage from "./components/ContactPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsOfServicePage from "./components/TermsOfServicePage";
import CookiePolicyPage from "./components/CookiePolicyPage";
import DisclaimerPage from "./components/DisclaimerPage";

const SESSION_KEY = "medipredict.session";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [session, setSession] = useState(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (session) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [session]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const page = params.get("page");

    if (page === "reset-password") {
      setCurrentPage("reset-password");
    }
  }, []);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (nextSession) => {
    setSession(nextSession);
    handleNavigation("dashboard");
  };

  const handleLogout = () => {
    setSession(null);
    handleNavigation("home");
  };

  const renderPage = () => {
    if (currentPage === "dashboard" && !session?.token) {
      return (
        <AuthPage
          onNavigate={handleNavigation}
          onAuthSuccess={handleAuthSuccess}
        />
      );
    }

    switch (currentPage) {
      case "home":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <HomePage
              onNavigate={handleNavigation}
              isLoggedIn={Boolean(session)}
            />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case "about":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <AboutPage />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case "auth":
        return (
          <AuthPage
            onNavigate={handleNavigation}
            onAuthSuccess={handleAuthSuccess}
          />
        );
      case "forgot-password":
        return <ForgotPasswordPage onNavigate={handleNavigation} />;
      case "reset-password":
        return <ResetPasswordPage onNavigate={handleNavigation} />;
      case "dashboard":
        return (
          <>
          
          <DashboardPage
            onNavigate={handleNavigation}
            session={session}
            onLogout={handleLogout}
            onSessionUpdate={setSession}
          />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      case "features":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <FeaturesPage />
            <Footer onNavigate={handleNavigation} />
          </>
        );

      case "contact":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <ContactPage />
            <Footer onNavigate={handleNavigation} />
          </>
        );

      case "privacy-policy":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <PrivacyPolicyPage />
            <Footer onNavigate={handleNavigation} />
          </>
        );

      case "terms-of-service":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <TermsOfServicePage />
            <Footer onNavigate={handleNavigation} />
          </>
        );

      case "cookie-policy":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <CookiePolicyPage />
            <Footer onNavigate={handleNavigation} />
          </>
        );

      case "disclaimer":
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <DisclaimerPage />
            <Footer onNavigate={handleNavigation} />
          </>
        );
      default:
        return (
          <>
            <Navbar
              onNavigate={handleNavigation}
              currentPage={currentPage}
              isLoggedIn={Boolean(session)}
              user={session?.user}
              onLogout={handleLogout}
            />
            <HomePage
              onNavigate={handleNavigation}
              isLoggedIn={Boolean(session)}
            />
            <Footer onNavigate={handleNavigation} />
          </>
        );
    }
  };

  return (
    <>
      {renderPage()}
      <Toaster />
    </>
  );
}

export default App;
