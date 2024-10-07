import { useEffect, useState } from "react";
import { Button, Card, CardContent } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Header from "../Components/Header";
import { isMobile } from "../utilities/DetectViewportSize";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function VotingPage() {
  const mobileView = isMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const location = useLocation();
  const [votingStatus, setVotingStatus] = useState([]);
  const userData = location.state?.userData;
  console.log("userData", userData);
  // Fetch the candidate list
  const getCandidateList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admin/candidateList"
      );
      setCandidates(response.data); // assuming response.data is an array of candidate objects
    } catch (err) {
      console.error("Error fetching Candidate List:", err);
    }
  };
  useEffect(() => {
    const fetchVotingStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/voter/getVotingStatus"
        );
        setVotingStatus(response.data?.status); // Set the voting status in state
      } catch (error) {
        console.error("Error fetching voting status:", error);
      }
    };
    fetchVotingStatus();
  }, []);
  useEffect(() => {
    getCandidateList();
  }, []);

  // Filter candidates based on the search term
  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle voting logic
  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
  };

  // Handle vote submission
  const handleSubmit = async () => {
    if (selectedCandidate) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/voter/vote",
          {
            username: userData, // the logged-in user's username
            candidateName: selectedCandidate?.name, // the candidate they're voting for
          }
        );
        alert(response.data.message);
      } catch (err) {
        console.error("Error casting vote:", err);
        alert(err.response?.data?.message || "Failed to cast vote");
      }
    } else {
      alert("Please select a candidate before submitting your vote.");
    }
  };

  return (
    <>
      <Header />
      <main
        style={{ padding: "16px", margin: mobileView ? "5px" : "5px 10rem" }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "16px" }}
        >
          Voting
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <Card
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CheckCircleOutlineIcon sx={{ color: "#fff" }} />
                <div>
                  <h2
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    You are a voter
                  </h2>
                  <p style={{ fontSize: "0.875rem", color: "#9CA3AF" }}>
                    You can only vote once. After submitting your vote, you
                    cannot change it.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.5)",
              backdropFilter: "blur(10px)",
              borderRadius: "8px",
            }}
          >
            <CardContent>
              <h2
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#fff",
                }}
              >
                You have 1 vote
              </h2>
            </CardContent>
          </Card>
        </div>
        <hr style={{ border: "1px solid #ccc", margin: "12px" }} />
        {votingStatus == "started" ? (
          <>
            {" "}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                margin: "12px",
                maxHeight: "50vh",
                overflowY: "auto",
              }}
            >
              {filteredCandidates.map((candidate) => (
                <div
                  key={candidate._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>{candidate.name}</span>
                  <Button
                    variant="outline"
                    onClick={() => handleVote(candidate)}
                    style={{
                      backgroundColor:
                        selectedCandidate === candidate ? "#2563EB" : "#4B5563",
                      color: "white",
                      marginRight: "1rem",
                    }}
                  >
                    {selectedCandidate === candidate ? "Selected" : "Vote"}
                  </Button>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "18px 12px",
              }}
            >
              <Button
                variant="default"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                Submit Vote
              </Button>
            </div>
          </>
        ) : (
          <>Voting hasn't started yet please wait for next Election</>
        )}
      </main>
    </>
  );
}
