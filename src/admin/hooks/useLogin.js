import { useMutation } from "@tanstack/react-query";
import { postLogin } from "../services/adminServices";

export const useLogin = ({ onSuccess, onError }) => {
  return useMutation(({ email, password }) => postLogin(email, password), {
    onSuccess,
    onError,
  });
};
