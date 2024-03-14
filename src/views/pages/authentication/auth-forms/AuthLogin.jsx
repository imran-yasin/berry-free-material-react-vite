import { useState } from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import AnimateButton from "../../../../ui-component/extended/AnimateButton";
import Loader from "../../../../ui-component/Loader/Loader";
import config from "../../../../config";

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        officeEmail: "",
        password: "",
        submit: null
      }}
      validationSchema={Yup.object().shape({
        officeEmail: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        password: Yup.string().max(255).required("Password is required")
      })}
      onSubmit={async (values) => {
        setLoader(true);
        localStorage.setItem("token", JSON.stringify(values));
        window.location.href = config.defaultPath;
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl fullWidth error={Boolean(touched.officeEmail && errors.officeEmail)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
              id="outlined-adornment-email-login"
              value={values.officeEmail}
              name="officeEmail"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address / Username"
              inputProps={{}}
            />
            {touched.officeEmail && errors.officeEmail && (
              <FormHelperText error id="standard-weight-helper-text-email-login">
                {errors.officeEmail}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? "text" : "password"}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />
            {touched.password && errors.password && (
              <FormHelperText error id="standard-weight-helper-text-password-login">
                {errors.password}
              </FormHelperText>
            )}
          </FormControl>

          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <AnimateButton>
              <Button
                disableElevation
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  "&:hover": {
                    background: theme.palette.secondary.light
                  }
                }}
              >
                {loader ? <Loader size={30} /> : "Sign in"}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default FirebaseLogin;
