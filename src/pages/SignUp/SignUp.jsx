import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { signUp } from "../../services/auth";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";

const defaultTheme = createTheme();

export default function SignUp() {
  const [isNameValid, setIsNameValid] = useState(null);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const navigate = useNavigate();

  async function createAccount(event) {
    event.preventDefault(); 

    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validar campos
    const isNameValid = account.name.trim() !== "";
    const isEmailValid = emailValidation.test(account.email);
    const isPasswordValid = account.password.trim() !== "";
    const doPasswordsMatch = account.password === account.password_confirmation;

    setIsNameValid(isNameValid);
    setIsEmailValid(isEmailValid);
    setIsPasswordValid(isPasswordValid);

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !doPasswordsMatch
    ) {
      if (!doPasswordsMatch) {
        alert("Passwords do not match");
      } else {
        alert("Please fix the errors above");
      }
      return;
    }

    try {
      // Realizar la solicitud de registro
      const signUpResponse = await signUp({
        name: account.name,
        email: account.email,
        password: account.password,
        password_confirmation: account.password_confirmation,
      });

      localStorage.setItem("token", signUpResponse.data.token);
      navigate("/verify");
    } catch (error) {
      console.error("Error:", error);
      alert(
        error.response?.data?.message ||
          "An error occurred or email already exists"
      );
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={createAccount}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={account.name}
                  onChange={(e) =>
                    setAccount({ ...account, name: e.target.value })
                  }
                  error={!isNameValid && isNameValid !== null}
                  helperText={
                    !isNameValid && isNameValid !== null
                      ? "Name is required"
                      : ""
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={account.email}
                  onChange={(e) =>
                    setAccount({ ...account, email: e.target.value })
                  }
                  error={!isEmailValid && isEmailValid !== null}
                  helperText={
                    !isEmailValid && isEmailValid !== null
                      ? "Invalid email address"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={account.password}
                  onChange={(e) =>
                    setAccount({ ...account, password: e.target.value })
                  }
                  error={!isPasswordValid && isPasswordValid !== null}
                  helperText={
                    !isPasswordValid && isPasswordValid !== null
                      ? "Password is required"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password_confirmation"
                  label="Confirm Password"
                  type="password"
                  id="password_confirmation"
                  autoComplete="new-password"
                  value={account.password_confirmation}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
