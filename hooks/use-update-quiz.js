import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export const useUpdateQuiz = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async ({ id, title }) => {
      const response = await axios.patch(`/api/quiz/${id}`, { id, title });

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
