import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { AuthPage } from "./components/AuthPage";
import { DashboardPage } from "./components/DashboardPage";
import { Toaster } from "./components/ui/sonner";

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
            <HomePage onNavigate={handleNavigation} isLoggedIn={Boolean(session)} />
            <Footer />
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
            <Footer />
          </>
        );
      case "auth":
        return (
          <AuthPage
            onNavigate={handleNavigation}
            onAuthSuccess={handleAuthSuccess}
          />
        );
      case "dashboard":
        return (
          <DashboardPage
            onNavigate={handleNavigation}
            session={session}
            onLogout={handleLogout}
            onSessionUpdate={setSession}
          />
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
            <HomePage onNavigate={handleNavigation} isLoggedIn={Boolean(session)} />
            <Footer />
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
