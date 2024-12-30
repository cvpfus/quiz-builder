import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "./use-toast";

export const useRegister = () => {
  return useMutation({
    mutationFn: async ({ email, password, role }) => {
      const response = await axios.post("/api/register", {
        email,
        password,
        role,
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
