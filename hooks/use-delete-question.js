import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export function useDeleteQuestion() {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(`/api/question/${id}`);
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
