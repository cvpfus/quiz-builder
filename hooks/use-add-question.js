import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export function useAddQuestion() {
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
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
