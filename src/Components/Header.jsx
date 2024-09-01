import React from "react";
import { isMobile } from "../utilities/DetectViewportSize";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const mobileView = isMobile();
  const navigate = useNavigate();
  return (
    <>
      {mobileView ? (
        <nav
          style={{
            display: "flex",
            padding: "12px",
            alignItems: "center",
            justifyContent:"space-between",
            marginBottom: "20px",
            width: "100%",
            position: "sticky",
            top: "0",
            left: "0",
            right: "0",
            margin: "0",
          }}
        >
          <div style={{ display: "flex",alignItems:"center" }}>
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
          <IconButton
            style={{ color: "#fff", marginRight: "1em" }}
            onClick={() => navigate("/")}
          >
            <LogoutIcon />
          </IconButton>
        </nav>
      )}
    </>
  );
};

export default Header;
