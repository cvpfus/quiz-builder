import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await axios.post("/api/login", {
          email,
          password,
        });

        return response.data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
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
