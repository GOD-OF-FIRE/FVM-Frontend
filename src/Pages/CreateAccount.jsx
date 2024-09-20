import React, { useState } from "react";
import "../Style/LoginPage.css";
import { isMobile } from "../utilities/DetectViewportSize";
import { Typography, TextField, MenuItem, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Header from "../Components/Header";

const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if the response is not empty and contains valid JSON
    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
      // If response is not ok, throw the error with the returned message or default to "Failed to register user"
      throw new Error(data?.message || "Failed to register user");
    }

    console.log("User registered successfully:", data);
  } catch (error) {
    console.error("Error registering user:", error);
    alert(error.message);
  }
};

const CreateAccount = () => {
  const mobileView = isMobile();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (newDate) => {
    setDob(newDate);
  };

  const calculateAge = (date) => {
    if (!date) return 0;
    const today = dayjs();
    const birthDate = dayjs(date);
    return today.diff(birthDate, "year");
  };

  const isOver18 = calculateAge(dob) >= 18;

  const isFormValid =
    firstName && lastName && gender && dob && username && password && isOver18;

  const handleNameChange = (setter) => (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z]*$/.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = async () => {
    const userData = {
      firstName,
      lastName,
      gender,
      dob: dob.toISOString(),
      username,
      password,
    };

    try {
      const result = await registerUser(userData); // Call the registerUser function
      navigate("/"); // Navigate after successful registration
    } catch (error) {
      setErrorMessage(error.message); // Show error message on failure
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Header />
      <Box
        sx={{
          padding: "20px",
          maxWidth: mobileView ? "90vw" : "400px",
          margin: "0 auto",
          color: "#fff",
        }}
      >
        <div className="header">
          <h1>Create Account</h1>
        </div>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        {/* First Name */}
        <p>First Name</p>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={firstName}
          onChange={handleNameChange(setFirstName)}
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
              },
              "& input": {
                color: "#fff",
              },
            },
          }}
        />
        <p>Last Name</p>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={lastName}
          onChange={handleNameChange(setLastName)}
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
              },
              "& input": {
                color: "#fff",
              },
            },
          }}
        />
        <p>Gender</p>
        <TextField
          variant="outlined"
          fullWidth
          select
          size="small"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
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
              },
              "& input": {
                color: "#fff",
              },
              "& .MuiSelect-select": {
                color: "#fff",
              },
            },
          }}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <p>Date of Birth</p>
        <DatePicker
          value={dob}
          onChange={handleDateChange}
          sx={{
            margin: "10px 0px",
            width: "100%",
            backgroundColor: "#333333",
            borderRadius: "8px",
            "& .MuiInputLabel-root": { color: "#fff" },
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#fff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#fff",
              },
              "& input": {
                color: "#fff",
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
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
                  },
                  "& input": {
                    color: "#fff",
                  },
                },
              }}
            />
          )}
        />
        <p>Username</p>
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
          fullWidth
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
              },
              "& input": {
                color: "#fff",
              },
            },
          }}
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
              backgroundColor: "#fff",
            },
            "&.Mui-disabled": {
              backgroundColor: "lightgrey",
            },
          }}
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Create Account
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateAccount;
