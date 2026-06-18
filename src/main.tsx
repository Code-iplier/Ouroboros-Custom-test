import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_USE_MOCK_API !== "true") return;
  try {
    const { startWorker } = await import("./mocks/browser");
    await startWorker();
    console.log("[MSW] Mock Service Worker started");
  } catch (error) {
    console.warn("[MSW] Failed to start Mock Service Worker:", error);
  }
}

enableMocking().then(() => {
  const root = document.getElementById("root");
  if (!root) {
    console.error("Root element not found");
    return;
  }
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
