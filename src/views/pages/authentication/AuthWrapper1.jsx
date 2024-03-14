// material-ui
import { styled } from "@mui/material/styles";
import loginImg from "../../../assets/images/bg-image.png";
// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled("div")({
  background: `url(${loginImg})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  minHeight: "100vh",
});

export default AuthWrapper1;
