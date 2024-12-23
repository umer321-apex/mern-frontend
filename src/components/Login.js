




// import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { TextField, Button, Typography, Box, Container } from "@mui/material";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login } = useContext(AuthContext);
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post("/login", { email, password });
//       localStorage.setItem("authToken", response.data.userId);
//       alert(response.data.message);

//       login(response.data.token); // Store JWT in context and cookies
//       navigate("/upload", { state: { ...response.data } }); 
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };
//   const handleEmailChange = (e) => {
//     const emailValue = e.target.value;
//     setEmail(emailValue);
//   };
//   const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

//   return (
//     <Container maxWidth="xs">
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           padding: 2,
//           backgroundColor: "#fff",
//           borderRadius: 2,
//           boxShadow: 3,
//           mt:4
//         }}
//       >
//         <Typography variant="h4" sx={{ marginBottom: 2, textAlign: "center" }}>
//           Login
//         </Typography>

//         <TextField
//           label="Email"
//           variant="outlined"
//           value={email}
//           onChange={handleEmailChange}
//           required
//           fullWidth
//           error={!isEmailValid && email.length > 0}
//           helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
//           sx={{ marginBottom: 2 }}
//         />

//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           fullWidth
//           sx={{ marginBottom: 2 }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{
//             padding: "10px",
//             backgroundColor: "#FE2C55", // Razzmatazz color
//             "&:hover": {
//               backgroundColor: "#D91C4F",
//             },
//           }}
//         >
//           Login
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Login;




// LoginVariant2.jsx
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { TextField, Button, Typography, Box, Container } from "@mui/material";

const LoginVariant2 = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("authToken", response.data.userId);
      alert(response.data.message);

      login(response.data.token);
      navigate("/upload", { state: { ...response.data } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          backgroundColor: "linear-gradient(to right, #ff7e5f, #feb47b)",
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          mt: 5,
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: 3, color: "#fff", textAlign: "center" }}>
          Welcome Back
        </Typography>

        <TextField
          label="Email"
          variant="filled"
          value={email}
          onChange={handleEmailChange}
          required
          fullWidth
          error={!isEmailValid && email.length > 0}
          helperText={!isEmailValid && email.length > 0 ? "Invalid email address" : ""}
          sx={{
            marginBottom: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        />

        <TextField
          label="Password"
          type="password"
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{
            marginBottom: 3,
            backgroundColor: "#fff",
            borderRadius: 2,
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            padding: "12px",
            fontSize: "16px",
            backgroundColor: "#ff6f61",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#d9534f",
            },
          }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default LoginVariant2;
