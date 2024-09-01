import React, { useState } from "react";
import "../Style/LoginPage.css";
import { isMobile } from "../utilities/DetectViewportSize";
import {
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import Header from "../Components/Header";

const CreateAccount = () => {
  const mobileView = isMobile();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          onClick={() => {
            //TODO: handle continue action
          }}
        >
          Create Account
        </Button>
      </Box>
    </LocalizationProvider>
  );
};

export default CreateAccount;
