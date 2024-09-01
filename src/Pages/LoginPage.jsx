import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "../Style/LoginPage.css";
import { isMobile } from "../utilities/DetectViewportSize";
import { useNavigate } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";

const LoginPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const mobileView = isMobile();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/voting");
    }
  };

  return (
    <>
      <div className="header">
        {mobileView ? (
          <>
            <h3>
              <HowToVoteIcon sx={{ marginRight: "8px" }} />
              Fire Voting Management
            </h3>
          </>
        ) : (
          <>
            <h1>
              <HowToVoteIcon sx={{ marginRight: "8px" }} />
              Fire Voting Management
            </h1>
          </>
        )}
      </div>
      <Box
        className="loginbox"
        sx={{
          color: "#fff",
          padding: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: mobileView ? "80vw" : "30vw",
          }}
        >
          <h2 style={{ marginBottom: "20px" }}>Log in</h2>

          <div className="loginForm">
            <p>Username</p>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                margin: "10px 0px",
                backgroundColor: "#333333",
                borderRadius: "8px",
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#fff",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                    color: "#fff",
                  },
                  "& input": {
                    color: "#fff",
                  },
                },
              }}
            />
            <p>Password</p>
            <TextField
              variant="outlined"
              type="password"
              fullWidth
              size="small"
              sx={{
                margin: "10px 0px",
                borderRadius: "8px",
                backgroundColor: "#333333",
                "& .MuiInputLabel-root": { color: "#fff" },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#fff",
                    color: "#fff", // Hover border color
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#fff",
                  },
                  "& input": {
                    color: "#fff", // Text color
                  },
                },
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  sx={{ color: "#fff" }}
                />
              }
              label="Admin"
              sx={{ color: "#fff", margin: "10px 0px" }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "8px",
                margin: "20px 0px",
                backgroundColor: "#fff",
                color: "#000",
                fontFamily: "Inter",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <p style={{ color: "#ccc" }}>or</p>
              <p style={{ color: "#ccc" }}>Don't have an account?</p>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default LoginPage;
