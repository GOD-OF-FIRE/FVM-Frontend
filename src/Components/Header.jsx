import React, { useEffect, useState } from "react";
import { isMobile } from "../utilities/DetectViewportSize";
import { Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";

const Header = ({ setBtnText, btnText }) => {
  const mobileView = isMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;

  const startorendvoting = async () => {
    try {
      const newStatus = btnText === "Start" ? "started" : "stopped";

      const response = await axios.post(
        "http://localhost:5000/api/admin/setVotingStatus",
        {
          status: newStatus,
        }
      );

      if (response.status === 200) {
        setBtnText(newStatus === "started" ? "End" : "Start");
        console.log(`Voting ${newStatus} successfully`);
        console.log("response", response?.data);
      }
    } catch (error) {
      console.error("Error updating voting status:", error);
    }
  };
  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/voter/getVotingStatus"
        );
        if (response.data?.status == "started") {
          setBtnText("End"); // Set the voting status in state
        } else {
          setBtnText("Start");
        }
      } catch (error) {
        console.error("Error fetching voting status:", error);
      }
    };
    fetchVotingStatus();
  }, []);
  return (
    <>
      {mobileView ? (
        <nav
          style={{
            display: "flex",
            padding: "12px",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "20px",
            width: "100%",
            position: "sticky",
            top: "0",
            left: "0",
            right: "0",
            margin: "0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              style={{ color: "#fff", marginRight: "1em" }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom sx={{ margin: "0px" }}>
              FVM
            </Typography>
          </div>
          <IconButton
            style={{ color: "#fff", marginRight: "1em" }}
            onClick={() => navigate("/")}
          >
            <LogoutIcon />
          </IconButton>
        </nav>
      ) : (
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "12px",
            borderBottom: "1px solid #ccc",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <HowToVoteIcon />
            <h2>FVM</h2>
          </div>
          <div>
            {userData?.role == "admin" ? (
              <Button variant="contained" onClick={startorendvoting}>
                {btnText}
              </Button>
            ) : null}

            <IconButton
              style={{ color: "#fff", marginRight: "1em" }}
              onClick={() => navigate("/")}
            >
              <LogoutIcon />
            </IconButton>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
