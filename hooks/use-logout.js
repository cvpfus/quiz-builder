import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export const useLogout = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/logout");

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      return response.data;
    },
    onError: (error) => {
      toast({
        title: t("error"),
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
