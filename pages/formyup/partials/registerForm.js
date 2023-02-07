import * as yup from "yup";
import { mailValdation, phoneValidation } from "../../../utils/constant";

export const registerSchema = yup.object().shape({
  fullName: yup
    .string()
    .max(30, "Full name no more than 30 characters !")
    .required("Full name is required !")
    .min(2, "Mininum 2 characters"),

  email: yup
    .string()
    .email("Email address is valid !")
    .required("Email address is required !")
    .matches(mailValdation, "Email address does not exist !"),

  phoneNumber: yup
    .string()
    .required("Phone number is Required !")
    .matches(phoneValidation, "Phone number is valid!"),

  file: yup
    .mixed()
    .test(
      "file",
      "File is Required !",
      (value) => value?.length > 0 || value?.file
    )
    .test(
      "fileSize",
      "Upload file no more than 2MB",
      (files) =>
        (files && files[0]?.size <= 2000000) || files[0]?.size <= 2000000
    ),
});
