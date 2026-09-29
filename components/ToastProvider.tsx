"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#111419",
          color: "#ffffff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        success: {
          iconTheme: {
            primary: "#ccff00",
            secondary: "#000000",
          },
        },
      }}
    />
  );
}