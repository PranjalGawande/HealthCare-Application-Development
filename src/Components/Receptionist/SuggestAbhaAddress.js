import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import patientImage from "../../assets/PatientPage.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Progressbar } from "./Progressbar";
import API_URL from "../../Config/config";

export const SuggestAbhaAddress = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [userChoice, setUserChoice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
          `${API_URL}/receptionist/suggestAbhaAddress`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        const suggestedAddresses = response.data.choices;
        setSuggestions(suggestedAddresses);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error fetching suggestions");
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const handleUserChoiceChange = (e) => {
    setUserChoice(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setUserChoice(suggestion);
  };

  const handleSubmit = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const formData = { abhaAddress: userChoice, password: "" };

      axios.defaults.withCredentials = true;
      await axios.post(`${API_URL}/receptionist/createAbhaAddress`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Abha Address submitted successfully");
      navigate("/receptionist/new-patient");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit Abha Address");
    }
  };

  return (
    <div>
      <Progressbar step={4} />
      <div className="h-full flex justify-center items-center progPageMargin">
        <div className="flex admin-dashboard justify-evenly items-center  border-amber-300 border-solid ">
          <div className="image-container">
            <img
              src={patientImage}
              className="admin-image"
              alt="patientImage"
            />
            <div className="dashboard-name-patient">ABHA CREATION</div>
          </div>
          <div className="container glass-background mt-5">
            <label className="text-login fw-bold text-center pt-5">
              Enter <br /> Abha Address
            </label>
            <h1 className="text-2xl font-semibold pb-3">
              Suggestions for Abha Address
            </h1>

            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <div className="loader"></div>
              </div>
            ) : (
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    style={{
                      cursor: "pointer",
                      padding: "0.5rem",
                      margin: "0.5rem",
                      border: "5px solid #ccc",
                      borderRadius: "20px",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}

            <TextField
              id="userChoice"
              label="Abha Address"
              value={userChoice}
              onChange={handleUserChoiceChange}
              required
              style={{ width: "50%", marginTop: "2rem" }}
            />
            <button
              type="submit"
              className="button text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              style={{
                marginTop: "2rem",
                width: "50%",
                height: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
