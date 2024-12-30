import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export function useAddQuestion() {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ quiz_id, question }) => {
      try {
        const response = await axios.post("/api/question", {
          quiz_id,
          question,
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
}
