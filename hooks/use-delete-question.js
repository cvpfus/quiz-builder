import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export function useDeleteQuestion() {
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
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
