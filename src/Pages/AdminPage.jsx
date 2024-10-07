import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Header from "../Components/Header";
import { isMobile } from "../utilities/DetectViewportSize";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function AdminPage() {
  const location = useLocation();
  const userData = location.state?.userData;
  const [currentTab, setCurrentTab] = useState("Voter Approval");
  const [voterApprovalTab, setVoterApprovalTab] = useState(0);
  const [pendingVoters, setPendingVoters] = useState([]);
  const [approvedVoters, setApprovedVoters] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [newCandidate, setNewCandidate] = useState("");
  const [btnText, setBtnText] = useState("");
  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleVoterApprovalTabChange = (event, newValue) => {
    setVoterApprovalTab(newValue);
  };

  // const handleAddCandidate = () => {
  //   if (newCandidate.trim()) {
  //     setCandidates([...candidates, { name: newCandidate.trim(), votes: 0 }]);
  //     setNewCandidate("");
  //   }
  // };

  const mobileView = isMobile();
  const handleAddCandidate = async () => {
    if (newCandidate.trim()) {
      try {
        // Send request to the backend to create a new candidate
        const response = await axios.post(
          "http://localhost:5000/api/admin/create",
          { name: newCandidate }
        );

        if (response.status === 201) {
          console.log("Candidate added:", response.data.candidate);
          setNewCandidate("");
          getCandidateList();
        }
      } catch (error) {
        console.error("Error adding candidate:", error);
      }
    }
  };

  const fetchPendingVoters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/pending-voters"
      );
      setPendingVoters(response.data);
    } catch (err) {
      console.error("Error fetching pending voters:", err);
    }
  };

  const fetchApprovedVoters = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/approved-voters"
      );
      setApprovedVoters(response.data);
    } catch (err) {
      console.error("Error fetching approved voters:", err);
    }
  };
  const getCandidateList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/candidateList"
      );
      setCandidates(response.data);
    } catch (err) {
      console.error("Error fetching Candidate List:", err);
    }
  };
  useEffect(() => {
    fetchPendingVoters();
    fetchApprovedVoters();
  }, [voterApprovalTab]);
  useEffect(() => {
    getCandidateList();
  }, [currentTab, btnText]);

  const handleApprove = async (voterId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/admin/approve-voter/${voterId}`
      );
      fetchPendingVoters();
    } catch (error) {
      console.error("Error approving voter:", error);
    }
  };

  return (
    <>
      <Header btnText={btnText} setBtnText={setBtnText} />
      <div
        style={{
          display: "flex",
          flexDirection: mobileView ? "column" : "row",
          backgroundColor: "black",
          color: "white",
        }}
      >
        <aside
          style={{
            width: mobileView ? "100%" : "250px",
            padding: "16px",
            borderBottom: mobileView ? "1px solid #374151" : "none",
          }}
        >
          <Typography
            variant="h6"
            style={{ marginBottom: "16px", fontWeight: "bold" }}
          >
            Voting Management
          </Typography>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            orientation={mobileView ? "horizontal" : "vertical"}
            textColor="inherit"
            indicatorColor="primary"
            variant="fullWidth"
            style={{ marginBottom: "24px" }}
          >
            <Tab
              label="Voter Approval"
              sx={{
                display: "flex",
                alignItems: "start",
                backgroundColor:
                  currentTab === "Voter Approval" ? "rgb(27, 29, 30)" : "",
              }}
              value="Voter Approval"
            />
            <Tab
              label="Candidates"
              sx={{
                display: "flex",
                alignItems: "start",
                backgroundColor:
                  currentTab === "Candidates" ? "rgb(27, 29, 30)" : "",
              }}
              value="Candidates"
            />
          </Tabs>
        </aside>

        <main style={{ flex: 1, padding: mobileView ? "16px" : "24px" }}>
          {currentTab === "Voter Approval" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: mobileView ? "center" : "flex-start",
                  flexDirection: mobileView ? "column" : "row",
                  marginBottom: "24px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: "bold",
                    marginBottom: mobileView ? "16px" : "0",
                  }}
                >
                  Voter Approval
                </Typography>
              </div>
              <Tabs
                value={voterApprovalTab}
                onChange={handleVoterApprovalTabChange}
                textColor="inherit"
                indicatorColor="primary"
                variant={mobileView ? "fullWidth" : "standard"}
                style={{ marginBottom: "24px" }}
              >
                <Tab label="Pending" />
                <Tab label="Approved" />
              </Tabs>
              {voterApprovalTab === 0 && (
                <Section title="Pending">
                  {pendingVoters.map((voter) => (
                    <ApprovalItem
                      key={voter._id}
                      name={`${voter.firstName} ${voter.lastName}`}
                      onApprove={() => handleApprove(voter._id)}
                    />
                  ))}
                </Section>
              )}
              {voterApprovalTab === 1 && (
                <Section title="Approved">
                  {approvedVoters.map((voter) => (
                    <ApprovalItem
                      key={voter._id}
                      name={`${voter.firstName} ${voter.lastName}`}
                      approved
                    />
                  ))}
                </Section>
              )}
            </>
          )}

          {currentTab === "Candidates" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: mobileView ? "column" : "row",
                  marginBottom: "24px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    fontWeight: "bold",
                    marginBottom: mobileView ? "16px" : "0",
                  }}
                >
                  Candidates
                </Typography>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "start",
                  gap: "8px",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter candidate name"
                  value={newCandidate}
                  onChange={(e) => setNewCandidate(e.target.value)}
                  fullWidth
                  style={{
                    marginBottom: "16px",
                    backgroundColor: "rgb(27, 29, 30)",
                    color: "white",
                    borderRadius: "8px",
                  }}
                  inputProps={{
                    style: { color: "white", padding: "8px 14px" },
                  }}
                />
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  style={{
                    backgroundColor: "white",
                    color: "black",
                    height: "2.2rem",
                    marginTop: "2px",
                  }}
                  onClick={handleAddCandidate}
                >
                  Add
                </Button>
              </div>

              <Section title="Candidates">
                {candidates.map((candidate, index) => (
                  <CandidateItem
                    key={index}
                    name={candidate?.name}
                    votes={candidate?.vote}
                  />
                ))}
              </Section>
            </>
          )}
        </main>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section>
      <Typography
        variant="h5"
        style={{ marginBottom: "16px", fontWeight: "bold" }}
      >
        {title}
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {children}
      </div>
    </section>
  );
}

function ApprovalItem({ name, approved = false, onApprove }) {
  return (
    <Paper
      style={{
        padding: "16px",
        backgroundColor: "rgb(27, 29, 30)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: isMobile() ? "16px" : "0",
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <Avatar alt={name} src="/placeholder-user.jpg" />
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          {name}
        </Typography>
      </div>
      {!approved ? (
        <Button
          variant="contained"
          style={{ backgroundColor: "white", color: "black" }}
          onClick={onApprove}
        >
          Approve
        </Button>
      ) : (
        <Typography variant="body2" style={{ color: "#9CA3AF" }}>
          Approved
        </Typography>
      )}
    </Paper>
  );
}

function CandidateItem({ name, votes }) {
  return (
    <Paper
      style={{
        padding: "16px",
        backgroundColor: "rgb(27, 29, 30)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: isMobile() ? "16px" : "0",
      }}
    >
      <div style={{ display: "flex", gap: "16px" }}>
        <Avatar alt={name} src="/placeholder-user.jpg" />
        <Typography
          variant="body1"
          style={{
            fontWeight: "medium",
            color: "#fff",
            display: "flex",
            alignItems: "center",
          }}
        >
          {name}
        </Typography>
      </div>
      <Typography
        variant="body2"
        style={{ color: "#9CA3AF", alignSelf: "center" }}
      >
        Votes: {votes}
      </Typography>
    </Paper>
  );
}
