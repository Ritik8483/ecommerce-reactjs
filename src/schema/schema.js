import * as yup from "yup";

const loginSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

const signupSchema = yup
  .object({
    name: yup.string().required("User name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  })
  .required();

const addProductSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(1, "Price must be a postive value")
      .required("Price is required"),
  })
  .required();

export { loginSchema, signupSchema, addProductSchema };
