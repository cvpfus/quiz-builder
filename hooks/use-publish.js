import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";
import { useTranslation } from "react-i18next";

export const usePublish = () => {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: async (id) => {
      try {
        const response = await axios.patch(`/api/publish/${id}`);

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
