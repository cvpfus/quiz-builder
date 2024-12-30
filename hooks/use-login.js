import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post("/api/login", {
        email,
        password,
      });

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
