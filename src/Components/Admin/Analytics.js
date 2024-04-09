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
      label: "Doctors Count",
    },
  ],
  width: 500,
  height: 400,
};

const patientChartSetting = {
  xAxis: [
    {
      label: "Doctors Count",
    },
  ],
  width: 500,
  height: 400,
};

const valueFormatter = (value) => `${value}mm`;

export const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(""); // State to store analytics data
  const [docSpecData, setDocSpecData] = useState(""); // State to store doctor speciality data
  const [appSpecData, setAppSpecData] = useState(""); // State to store appointment speciality data
  const [patientAgeData, setPatientAgeData] = useState(""); // State to store patient age data
  const [patientGenderData, setPatientGenderData] = useState(""); // State to store
  const [appDateData, setAppDateData] = useState(""); // State to store

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
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
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
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
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
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
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
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
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
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
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
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchPatientGenderData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts



  useEffect(() => {
    // Function to fetch analytics data from the backend API
    const fetchAppDateData = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve the token from local storage
        const response = await axios.get(
          "http://localhost:9191/admin/appointment-count-by-day",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          }
        );
        setAppDateData(response.data); // Set the analytics data in state
        console.log("Analytics data fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        // setLoading(false); // Update loading state in case of error
      }
    };
    // console.log("Analytics data fetched successfully:", analyticsData);

    fetchAppDateData(); // Call the function to fetch analytics data when the component mounts
  }, []); // Empty dependency array ensures the effect runs only once after the component mounts








  return (
    <div className="m-3">
      <div className="flex gap-3 w-full">
        <Card variant="solid" color="success" invertedColors className="w-full">
          <CardContent
            orientation="horizontal"
            style={{ display: "flex", alignItems: "center" }}
          >
            <CircularProgress size="lg" determinate value={20}>
              <SvgIcon>
                <svg
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
                </svg>
              </SvgIcon>
            </CircularProgress>
            <CardContent style={{ textAlign: "center" }}>
              <Typography
                level="h4"
                style={{ fontSize: "1.5rem", textAlign: "center" }}
              >
                Total Registered Patients
              </Typography>
              <Typography level="h2">{analyticsData.totalPatients}</Typography>
            </CardContent>
          </CardContent>
        </Card>

        <Card variant="solid" color="danger" invertedColors className="w-full">
          <CardContent
            orientation="horizontal"
            style={{ display: "flex", alignItems: "center" }}
          >
            <CircularProgress size="lg" determinate value={20}>
              <SvgIcon>
                <svg
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
                </svg>
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
          className="w-full"
          style={{ height: "150px" }}
        >
          <CardContent
            orientation="horizontal"
            style={{ display: "flex", alignItems: "center" }}
          >
            <CircularProgress size="lg" determinate value={20}>
              <SvgIcon>
                <svg
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
                </svg>
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
        <div style={{ width: "70%" }}>
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={1400}
            height={350}
          />




          {/* <LineChart
        xAxis={[{ data: appDateData.map((data) => data.day) }]}
        series={[
          {
            data: appDateData.map((data) => data.count),
          },
        ]}
        width={1400}
        height={350}
      /> */}






        </div>

        {/* <PieChart
          series={[
            {
              data: [
                { id: 0, value: {patientGenderData.Male}, label: "Male" },
                { id: 1, value: {patientGenderData.Female}, label: "Female" },
                // { id: 2, value: 10, label: "Other" },
              ],
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={310}
          style={{ margin: "7px" }}
        /> */}

        <PieChart
        series={[
          {
            data: [
              { id: 0, value: patientGenderData.Male, label: "Male" },
              { id: 1, value: patientGenderData.Female, label: "Female" },
            ],
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        height={310}
        style={{ margin: "7px" }}
      />
      </div>

      <div className="flex">
        {docSpecData && Object.keys(docSpecData).length > 0 && (
          <BarChart
            dataset={Object.entries(docSpecData).map(([speciality, count]) => ({
              speciality,
              Count: count,
            }))}
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
            dataset={Object.entries(appSpecData).map(([speciality, count]) => ({
              speciality,
              Count: count,
            }))}
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
  );
};
