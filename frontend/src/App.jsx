import { useState } from "react";

import LandingPage from "./LandingPage";
import AuthSystem from "./AuthSystem";
import TrackAndSave from "./index";
import { ProfileSettings } from "./ProfileSetting";

export default function App() {
  const [page, setPage] = useState("landing");
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "light" ? "dark" : "light"
    );
  };

  if (page === "landing") {
    return (
      <LandingPage
        onNavigate={setPage}
        />
    );
  }

  if (
    page === "signin" ||
    page === "signup"
  ) {
    return (
      <AuthSystem
        mode={page}
        onSuccess={() => setPage("dashboard")}
        onBack={() => setPage("landing")}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <TrackAndSave />
    );
  }

  if (page === "profile") {
    return (
      <ProfileSettings
        theme={theme}
        toggleTheme={toggleTheme}
      />
    );
  }

  return <LandingPage onNavigate={setPage} />;
}