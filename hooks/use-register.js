import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export const useRegister = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ email, password, role }) => {
      try {
        const response = await axios.post("/api/register", {
          email,
          password,
          role,
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
