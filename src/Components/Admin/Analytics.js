import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { FiberPin } from "@mui/icons-material";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  plugins,
} from "chart.js";
import { Step } from "@mui/material";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const chartSetting = {
  xAxis: [
    {
      label: "Doctors Count",
    },
  ],
  width: 500,
  height: 400,
};

const appChartSetting = {
  xAxis: [
    {
      label: "Appointments Count",
    },
  ],
  width: 500,
  height: 400,
};

const patientChartSetting = {
  xAxis: [
    {
      label: "Patients Count",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}`;

export const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(""); // State to store analytics data
  const [docSpecData, setDocSpecData] = useState(""); // State to store doctor speciality data
  const [appSpecData, setAppSpecData] = useState(""); // State to store appointment speciality data
  const [patientAgeData, setPatientAgeData] = useState(""); // State to store patient age data
  const [patientGenderData, setPatientGenderData] = useState(""); // State to store
  // const [appDateData, setAppDateData] = useState(""); // State to store
  const [appDateData, setAppDateData] = useState([]);

  // const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchAnalyticsData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/analytics",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setAnalyticsData(response.data); // Set the analytics data in state
        // console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchAnalyticsData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchDocSpecData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/doctorCountBySpeciality",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setDocSpecData(response.data); // Set the analytics data in state
        // console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchDocSpecData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchAppSpecData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/patient-count-by-appointment-speciality",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setAppSpecData(response.data); // Set the analytics data in state
        // console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchAppSpecData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchPatientAgeData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/patient-count-by-age-group",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setPatientAgeData(response.data); // Set the analytics data in state
        // console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchPatientAgeData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchPatientGenderData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/patient-count-by-gender",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setPatientGenderData(response.data); // Set the analytics data in state
        // console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchPatientGenderData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchPatientGenderData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/patient-count-by-gender",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setPatientGenderData(response.data); // Set the analytics data in state
        // console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchPatientGenderData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts

  useEffect(() => {
    const fetchAppDateData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:9191/admin/appointment-count-by-day",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedData = Object.entries(response.data).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        // Sort the formatted data by date
        formattedData.sort((a, b) => new Date(a.date) - new Date(b.date));

        setAppDateData(formattedData);
        // console.log("Analytics data fetched successfully:", formattedData);
      } catch (error) {
        // console.error("Error fetching analytics data:", error);
        // Optionally, set an error state and display an error message to the user
      }
    };

    fetchAppDateData();
  }, []);

  const data = {
    labels: appDateData ? appDateData.map((entry) => entry.date) : [],
    datasets: [
      {
        label: "Number of Appointments",
        data: appDateData ? appDateData.map((entry) => entry.count) : [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "transparent",
        tension: 0.1,
        borderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // Increase font size
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
          font: {
            size: 20, // Increase font size
          },
        },
        ticks: {
          stepSize: 4, // Set x-axis step size
          autoSkip: true, // Enable auto-skipping of ticks
          padding: 10, // Adjust the padding between ticks
          font: {
            size: 18, // Increase tick font size
          },
        },
        grid: {
          display: false, // Hide x-axis grid lines
          offset: true, // Adds spacing between the grid lines and the data
        },
      },
      y: {
        min: 0,
        ticks: {
          font: {
            size: 20, // Increase tick font size
          },
        },
        title: {
          display: true,
          text: "Number of Appointments",
          font: {
            size: 18, // Increase font size
          },
        },
      },
    },
    layout: {
      padding: {
        left: 20, // Adjust left padding
        right: 20, // Adjust right padding
      },
    },
  };

  // Optionally, display a loading state while fetching data
  if (!appDateData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="background-table">
      <div className="pt-3 mx-3">
        <div className="d-flex gap-5 w-full justify-content-around px-10">
          <Card
            variant="solid"
            color="success"
            invertedColors
            className="w-50"
            style={{
              height: "150px",
              background: "linear-gradient(to right, #4FACFE, #00F2FE)",
            }}
          >
            <CardContent
              orientation="horizontal"
              style={{ display: "flex", alignItems: "center" }}
            >
              <CircularProgress size="lg" determinate value={100}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16">
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                  </svg>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg> */}
                </SvgIcon>
              </CircularProgress>
              <CardContent style={{ textAlign: "center" }}>
                <Typography
                  level="h4"
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                >
                  Total Registered Patients
                </Typography>
                <Typography level="h2">
                  {analyticsData.totalPatients}
                </Typography>
              </CardContent>
            </CardContent>
          </Card>

          <Card
            variant="solid"
            color="danger"
            invertedColors
            className="w-50"
            style={{
              height: "150px",
              background: "linear-gradient(to right, #4FACFE, #00F2FE)",
            }}
          >
            <CardContent
              orientation="horizontal"
              style={{ display: "flex", alignItems: "center" }}
            >
              <CircularProgress size="lg" determinate value={100}>
                <SvgIcon>
                  <svg
                    fill="#ffffff" height="83px" width="83px" version="1.1" id="Layer_1" viewBox="0 0 503.607 503.607" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" stroke-width="0">
                    </g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                    </g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <g>
                          <g>
                            <path d="M495.213,235.016h-58.754v-16.787c0-4.633-3.76-8.393-8.393-8.393v-16.787c4.633,0,8.393-3.76,8.393-8.393 c0-32.399-26.355-58.754-58.754-58.754s-58.754,26.355-58.754,58.754c0,4.633,3.76,8.393,8.393,8.393v16.787 c-4.633,0-8.393,3.76-8.393,8.393v16.787H218.23v-50.361c0-24.257-11.826-47.213-31.635-61.398 c-2.929-2.09-6.857-2.09-9.778,0.008c-7.084,5.078-15.167,8.268-23.518,9.77l20.505,20.505c2.728,2.719,3.248,6.95,1.259,10.257 l-25.18,41.967c-1.511,2.526-4.247,4.071-7.193,4.071s-5.682-1.544-7.193-4.071l-25.18-41.967 c-1.989-3.307-1.469-7.537,1.259-10.257l20.505-20.505c-8.351-1.502-16.434-4.692-23.518-9.77 c-2.921-2.098-6.849-2.098-9.778-0.008c-19.809,14.185-31.635,37.141-31.635,61.398v50.361H8.393 c-4.633,0-8.393,3.76-8.393,8.393v50.361c0,4.633,3.76,8.393,8.393,8.393v117.508h67.148c4.633,0,8.393,3.76,8.393,8.393 s-3.76,8.393-8.393,8.393H8.393v16.787h67.148c4.633,0,8.393,3.76,8.393,8.393s-3.76,8.393-8.393,8.393H8.393v8.393 c0,13.883,11.298,25.18,25.18,25.18h436.459c13.883,0,25.18-11.298,25.18-25.18v-8.393h-67.148c-4.633,0-8.393-3.76-8.393-8.393 s3.76-8.393,8.393-8.393h67.148v-16.787h-67.148c-4.633,0-8.393-3.76-8.393-8.393s3.76-8.393,8.393-8.393h67.148V302.164 c4.633,0,8.393-3.76,8.393-8.393V243.41C503.607,238.777,499.846,235.016,495.213,235.016z M377.705,142.689 c20.27,0,37.225,14.445,41.12,33.574h-82.239C340.48,157.134,357.435,142.689,377.705,142.689z M243.41,470.033 c-41.648,0-75.541-33.893-75.541-75.541c0-41.648,33.893-75.541,75.541-75.541s75.541,33.893,75.541,75.541 C318.951,436.14,285.058,470.033,243.41,470.033z M486.82,285.377H16.787v-33.574h58.754h134.295h117.508h100.721h58.754V285.377 z">
                            </path>
                            <path d="M142.689,117.508c32.399,0,58.754-26.355,58.754-58.754S175.087,0,142.689,0S83.934,26.355,83.934,58.754 S110.29,117.508,142.689,117.508z M142.689,16.787c23.141,0,41.967,18.826,41.967,41.967c0,23.141-18.826,41.967-41.967,41.967 c-23.141,0-41.967-18.826-41.967-41.967C100.721,35.613,119.548,16.787,142.689,16.787z">
                            </path>
                            <polygon points="142.689,185.127 157.301,160.778 142.689,146.165 128.076,160.778 "></polygon>
                            <path d="M243.41,335.738c-32.399,0-58.754,26.355-58.754,58.754c0,32.399,26.355,58.754,58.754,58.754 s58.754-26.355,58.754-58.754C302.164,362.093,275.809,335.738,243.41,335.738z M243.41,436.459 c-23.141,0-41.967-18.826-41.967-41.967c0-4.633,3.76-8.393,8.393-8.393s8.393,3.76,8.393,8.393 c0,13.883,11.298,25.18,25.18,25.18c4.633,0,8.393,3.76,8.393,8.393S248.043,436.459,243.41,436.459z M276.984,402.885 c-4.633,0-8.393-3.76-8.393-8.393c0-13.883-11.298-25.18-25.18-25.18c-4.633,0-8.393-3.76-8.393-8.393s3.76-8.393,8.393-8.393 c23.141,0,41.967,18.826,41.967,41.967C285.377,399.125,281.617,402.885,276.984,402.885z">
                            </path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg> */}
                </SvgIcon>
              </CircularProgress>
              <CardContent style={{ textAlign: "center" }}>
                <Typography
                  level="h4"
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                >
                  Total Registered Receptionists
                </Typography>
                <Typography level="h2">
                  {analyticsData.totalReceptionists}
                </Typography>
              </CardContent>
            </CardContent>
          </Card>

          <Card
            variant="solid"
            color="primary"
            invertedColors
            className="w-50"
            style={{
              height: "150px",
              background: "linear-gradient(to right, #4FACFE, #00F2FE)",
            }}
          >
            <CardContent
              orientation="horizontal"
              style={{ display: "flex", alignItems: "center" }}
            >
              <CircularProgress size="lg" determinate value={100}>
                <SvgIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path fill="#ffffff" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zM104 424c0 13.3 10.7 24 24 24s24-10.7 24-24-10.7-24-24-24-24 10.7-24 24zm216-135.4v49c36.5 7.4 64 39.8 64 78.4v41.7c0 7.6-5.4 14.2-12.9 15.7l-32.2 6.4c-4.3 .9-8.5-1.9-9.4-6.3l-3.1-15.7c-.9-4.3 1.9-8.6 6.3-9.4l19.3-3.9V416c0-62.8-96-65.1-96 1.9v26.7l19.3 3.9c4.3 .9 7.1 5.1 6.3 9.4l-3.1 15.7c-.9 4.3-5.1 7.1-9.4 6.3l-31.2-4.2c-7.9-1.1-13.8-7.8-13.8-15.9V416c0-38.6 27.5-70.9 64-78.4v-45.2c-2.2 .7-4.4 1.1-6.6 1.9-18 6.3-37.3 9.8-57.4 9.8s-39.4-3.5-57.4-9.8c-7.4-2.6-14.9-4.2-22.6-5.2v81.6c23.1 6.9 40 28.1 40 53.4 0 30.9-25.1 56-56 56s-56-25.1-56-56c0-25.3 16.9-46.5 40-53.4v-80.4C48.5 301 0 355.8 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-72-56.8-130.3-128-133.8z" />
                  </svg>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg> */}
                </SvgIcon>
              </CircularProgress>
              <CardContent style={{ textAlign: "center" }}>
                <Typography
                  level="h4"
                  style={{ fontSize: "1.5rem", textAlign: "center" }}
                >
                  Total Registered Doctors
                </Typography>
                <Typography level="h2">{analyticsData.totalDoctors}</Typography>
              </CardContent>
            </CardContent>
          </Card>
        </div>

        <br></br>

        <div className="flex">
          <div style={{ width: "180%" }}>
            <div className="flex flex-col">
              {/* <p>Appointments By Day</p> */}
              <h2>Appointments Line Chart</h2>

              <div
                className="d-flex justify-content-center"
                style={{ width: "100%", height: "280px", marginLeft: "20px" }}
              >
                <Line
                  data={data}
                  options={options}
                  style={{ width: "500px" }}
                ></Line>
              </div>
            </div>
          </div>

          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: patientGenderData.M, label: "Male Patient" },
                  {
                    id: 1,
                    value: patientGenderData.F,
                    label: "Female Patient",
                  },
                ],
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            height={310}
            style={{ margin: "7px" }}
          />
        </div>

        <div className="flex">
          {docSpecData && Object.keys(docSpecData).length > 0 && (
            <BarChart
              dataset={Object.entries(docSpecData).map(
                ([speciality, count]) => ({
                  speciality,
                  Count: count,
                })
              )}
              yAxis={[{ scaleType: "band", dataKey: "speciality" }]}
              series={[
                {
                  dataKey: "Count",
                  label: "Doctors By Speciality",
                  valueFormatter,
                },
              ]}
              layout="horizontal"
              {...chartSetting}
            />
          )}

          {appSpecData && Object.keys(appSpecData).length > 0 && (
            <BarChart

              dataset={Object.entries(appSpecData).map(
                ([speciality, count]) => ({
                  speciality,
                  Count: count,
                })
              )}
              yAxis={[{ scaleType: "band", dataKey: "speciality" }]}
              series={[
                {
                  dataKey: "Count",
                  label: "Appointments By Speciality",
                  valueFormatter,
                },
              ]}
              layout="horizontal"
              {...appChartSetting}
            />
          )}

          {patientAgeData && Object.keys(patientAgeData).length > 0 && (
            <BarChart
              dataset={Object.entries(patientAgeData).map(
                ([speciality, count]) => ({
                  speciality,
                  Count: count,
                })
              )}
              yAxis={[{ scaleType: "band", dataKey: "speciality" }]}
              series={[
                {
                  dataKey: "Count",
                  label: "Patients By Ages",
                  valueFormatter,
                },
              ]}
              layout="horizontal"
              {...patientChartSetting}
            />
          )}
        </div>
      </div>
    </div>
  );
};
