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
    name: yup
      .string()
      .max(30, "Name must not be greater than 30 digit")
      .required("Name is required"),
    description: yup.string().required("Description is required"),
    price: yup
      .number()
      .typeError("Price must be a number")
      .min(1, "Price must be a postive value")
      .max(10000000, "Price must not be greater than 1Cr.")
      .required("Price is required"),
  })
  .required();

export { loginSchema, signupSchema, addProductSchema };
