import * as yup from "yup";
import { mailValdation} from "../../utils/constant";

export const registerSchema = yup
  .object({
    email: yup
      .string()
      .email("Email address is valid !")
      .required("Email address is required !")
      .matches(mailValdation, "Email address does not exist !"),

    password: yup
      .string()
      .required("No password provided !")
      .min(8, "Password is too short - should be 8 chars minimum !"),
  })
  .required();
