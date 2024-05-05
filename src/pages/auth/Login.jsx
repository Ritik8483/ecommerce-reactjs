import { useState } from "react";
import Input from "../../components/reuseables/Input";
import { Box, Typography } from "@mui/material";
import { anchorTag, formContainer } from "../../styles/style";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signupSchema } from "../../schema/schema";
import Buttons from "../../components/reuseables/Buttons";
import { useDispatch } from "react-redux";
import {
  useLoginUserMutation,
  useSignupUserMutation,
} from "../../redux/api/api";
import { storeLoginToken } from "../../redux/slices/authSlice";
import { openAlert } from "../../redux/slices/snackbarSlice";
import { useNavigate } from "react-router-dom";
import { duplicacyErrCode, signupUserCode } from "../../constants/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const [loginUser] = useLoginUserMutation();
  const [signupUser] = useSignupUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(toggle ? signupSchema : loginSchema),
  });

  const handleSubmitForm = async (data) => {
    console.log("data", data);
    if (toggle) {
      try {
        const payload = {
          url: "auth/signup",
          body: data,
        };
        const resp = await signupUser(payload).unwrap();
        if (resp?.code === signupUserCode) {
          reset();
          dispatch(
            openAlert({
              type: "success",
              message: `${resp.message} Please login to continue.`,
            })
          );
          setToggle(!toggle);
        }
      } catch (error) {
        console.log("error", error);
        if (error?.data?.code === duplicacyErrCode) {
          dispatch(
            openAlert({
              type: "error",
              message: "User already exists. Please login to continue",
            })
          );
        }
      }
    } else {
      try {
        const payload = {
          url: "auth/login",
          body: data,
        };
        const resp = await loginUser(payload).unwrap();
        if (resp?.data?.token) {
          dispatch(storeLoginToken(resp?.data));
          dispatch(
            openAlert({
              type: "success",
              message: resp.message,
            })
          );
          reset();
          navigate("/dashboard");
        }
      } catch (error) {
        dispatch(
          openAlert({
            type: "error",
            message: "Invalid login credentials",
          })
        );
        console.log("error", error);
      }
    }
  };

  const handleTogglePage = () => {
    setToggle(!toggle);
    reset();
  };

  return (
    <>
      {toggle ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
          minHeight="100vh"
          gap="20px"
        >
          <Typography textAlign="center">Register here</Typography>
          <form style={formContainer} onSubmit={handleSubmit(handleSubmitForm)}>
            <Box display="flex" flexDirection="column" gap="20px">
              <Input
                placeholder="Name"
                name="name"
                register={register}
                id="name"
                type="text"
                errorMessage={errors.name?.message}
                label="User name"
              />
              <Input
                placeholder="Email"
                name="email"
                register={register}
                id="email"
                type="text"
                errorMessage={errors.email?.message}
                label="Email Address"
              />
              <Input
                placeholder="Password"
                register={register}
                name="password"
                id="password"
                type="password"
                errorMessage={errors?.password?.message}
                label="Password"
              />
              <Buttons
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                text={isSubmitting ? "Login..." : "Login"}
              />
              <Typography>
                Already have an account?{" "}
                <a style={anchorTag} onClick={handleTogglePage}>
                  Login
                </a>
              </Typography>
            </Box>
          </form>
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          width="100%"
          minHeight="100vh"
          gap="20px"
        >
          <Typography textAlign="center">E-commerce App</Typography>
          <form style={formContainer} onSubmit={handleSubmit(handleSubmitForm)}>
            <Box display="flex" flexDirection="column" gap="20px">
              <Input
                placeholder="Email"
                name="email"
                register={register}
                id="email"
                type="text"
                errorMessage={errors.email?.message}
                label="Email Address"
              />
              <Input
                placeholder="Password"
                register={register}
                name="password"
                id="password"
                type="password"
                errorMessage={errors?.password?.message}
                label="Password"
              />
              <Buttons
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                text={isSubmitting ? "Login..." : "Login"}
              />
              <Typography>
                Don't have an account?{" "}
                <a style={anchorTag} onClick={handleTogglePage}>
                  Signup
                </a>
              </Typography>
            </Box>
          </form>
        </Box>
      )}
    </>
  );
};

export default Login;
