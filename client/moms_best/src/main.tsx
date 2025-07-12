import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Aurora from "./components/blocks/Backgrounds/Aurora/Aurora.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-full h-full relative overflow-hidden">
      <Aurora
        blend={0.8}
        amplitude={0.2}
        speed={0.6}
        className="absolute inset-0 opacity-30 pointer-events-none"
      />
      <div className="relative z-10">
        <App />
      </div>
    </div>
  </StrictMode>
);
