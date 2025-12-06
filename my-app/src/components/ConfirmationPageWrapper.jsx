import LoadingPage from "./LoadingPage";
// import Page from "./Page";
import { Suspense, React } from "react";
// import Information from "./Information";
// import ScheduleComponent from "./ScheduleComponent";
import { useState, useEffect } from "react";
import ConfirmationPage from "./ConfirmationPage";

export function ConfirmationPageWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return <LoadingPage />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmationPage />
    </Suspense>
  );
}
