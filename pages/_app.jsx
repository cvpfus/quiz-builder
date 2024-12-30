import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import "@/lib/i18n";
import i18n from "i18next";

import { Button } from "@/components/ui/button";

export default function App({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );

  const [lng, setLng] = useState("en");

  const handleChangeLng = () => {
    setLng(lng === "en" ? "ar" : "en");
    i18n.changeLanguage(lng === "en" ? "ar" : "en");
  };

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="h-screen relative" dir={lng === "ar" ? "rtl" : "ltr"}>
        <Button
          className={`absolute top-4 ${lng === "ar" ? "right-4" : "left-4"}`}
          onClick={handleChangeLng}
        >
          {lng === "en" ? "EN" : "AR"}
        </Button>
        {getLayout(<Component {...pageProps} />)}
      </div>
    </QueryClientProvider>
  );
}
