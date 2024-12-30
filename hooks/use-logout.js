import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "./use-toast";

export const useLogout = () => {
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
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
