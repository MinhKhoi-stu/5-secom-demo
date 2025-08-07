// hooks/option/useCreateOption.ts
import { useMutation } from "react-query";
import { optionAPI } from "api/option";
import { CreateOptionDto } from "dto/option/create-option.dto";

export const useCreateOption = () => {
  return useMutation((data: CreateOptionDto) => optionAPI.createOption(data));
};
