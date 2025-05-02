
/**
  Primera version de la pagina de registro de usuario
  Se utiliza la libreria de Material UI para el diseño
 */

//pagina de registro de usuario
// nombre completo,  correo, contraseña, confirmar contraseña
// telefono, C.c

/**
  implementar mas bootstrap
  añadir mas criterios de password (min 8 charctr, mayusculas, minusculas, simbolos, etc...) 
 */



import {
  Typography,
  Stack,
  TextField,
  SxProps,
  Theme,
  Button,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
import { useState } from "react";

const stylesInput: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "grey",
    },
    "&:hover fieldset": {
      borderColor: "#26c6da",
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#0d253f",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#26c6da",
  },
  "& .MuiInputBase-input": {
    color: "black",
  },
};

export const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "Pepito Perez",
    email: "test@gmail.com",
    password: "",
    confirmPassword: "",
    phone: Number(""),
    cc: Number(""),
  });

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.fullName === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === "" ||
      formData.phone.toString() === "" ||
      formData.cc.toString() === ""
    ) {
      setError("All fields are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("The passwords doesn't matches");
      return;
    }

    if (formData.phone.toString().length !== 8) {
      setError("The phone number must to be 8 digits");
      return;
    }

    if (
      formData.cc.toString().length < 10 ||
      formData.cc.toString().length > 12
    ) {
      setError("The identification card must have 10 to 12 digits");
      return;
    }

    setError("");
    alert("The user has been registered successfully");
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${logo})`,
        backgroundRepeat: "repeat",
        backgroundSize: "33.33% 10%",
        backgroundAttachment: "fixed",
        opacity: 0.9, //transparencia
      }}
    >
      <Stack
        p={2}
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor="rgba(13, 37, 63)" // Fondo semitransparente para el formulario
        component="main"
      >
        <Stack
          bgcolor="#f5f5f5"
          gap={2}
          p={5}
          borderRadius="16px"
          component="form"
          onSubmit={handleSubmit}
          sx={{ position: "relative" }} // Asegura que el formulario esté encima
        >
          <Box component="img" src={logo} alt="Logo" pb={3} />

          <Stack gap={2} direction="row">
            <TextField
              label="Full Name"
              variant="outlined"
              sx={stylesInput}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              variant="outlined"
              sx={stylesInput}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <TextField
              label="Password"
              variant="outlined"
              sx={stylesInput}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              label="Confirm Password"
              variant="outlined"
              sx={stylesInput}
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Stack>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <TextField
            label="Phone"
            variant="outlined"
            sx={stylesInput}
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="identification Card"
            variant="outlined"
            sx={stylesInput}
            type="number"
            name="cc"
            value={formData.cc}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Register
          </Button>
          <Link component={RouterLink} to="/login" color="#0d253f">
            If you aren't Register, Click here to login
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};