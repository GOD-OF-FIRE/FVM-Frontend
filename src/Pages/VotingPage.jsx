import { useState } from "react";
import { Button, Card, CardContent, Input } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Header from "../Components/Header";
import { isMobile } from "../utilities/DetectViewportSize";

export default function VotingPage() {
  const mobileView = isMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const candidates = [
    "Candidate 1",
    "Candidate 2",
    "Candidate 3",
    "Candidate 4",
    "Candidate 5",
  ];

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleVote = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleSubmit = () => {
    if (selectedCandidate) {
      alert(`You voted for ${selectedCandidate}`);
      setSelectedCandidate(null);
      // Submit vote logic goes here
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
              key={candidate}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>{candidate}</span>
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
      </main>
    </>
  );
}
