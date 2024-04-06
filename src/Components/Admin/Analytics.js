import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from '@mui/x-charts/LineChart';


import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';


const chartSetting = {
    xAxis: [
        {
            label: "Doctors Count",
        },
    ],
    width: 500,
    height: 400,
};
const dataset = [
    {
        Count: 60,
        speciality: "General",
    },
    {
        Count: 20,
        speciality: "ENT",
    },
    {
        Count: 25,
        speciality: "Cardio",
    },
    {
        Count: 15,
        speciality: "Derma",
    },
    {
        Count: 35,
        speciality: "Neuro",
    },
    {
        Count: 30,
        speciality: "Gyneco",
    },
    {
        Count: 40,
        speciality: "Ortho",
    },
    {
        Count: 10,
        speciality: "Psychiatrist",
    },
    {
        Count: 37,
        speciality: "Ophthalmo",
    },
    {
        Count: 40,
        speciality: "Dental",
    },
];

const appChartSetting = {
    xAxis: [
        {
            label: "Doctors Count",
        },
    ],
    width: 500,
    height: 400,
};
const appDataset = [
    {
        Count: 40,
        speciality: "General",
    },
    {
        Count: 20,
        speciality: "ENT",
    },
    {
        Count: 45,
        speciality: "Cardio",
    },
    {
        Count: 25,
        speciality: "Derma",
    },
    {
        Count: 35,
        speciality: "Neuro",
    },
    {
        Count: 60,
        speciality: "Gyneco",
    },
    {
        Count: 40,
        speciality: "Ortho",
    },
    {
        Count: 10,
        speciality: "Psychiatrist",
    },
    {
        Count: 37,
        speciality: "Ophthalmo",
    },
    {
        Count: 40,
        speciality: "Dental",
    },
];




const patientChartSetting = {
    xAxis: [
        {
            label: "Doctors Count",
        },
    ],
    width: 500,
    height: 400,
};
const patientDataset = [
    {
        Count: 20,
        speciality: "0-10",
    },
    {
        Count: 30,
        speciality: "11-20",
    },
    {
        Count: 75,
        speciality: "21-30",
    },
    {
        Count: 15,
        speciality: "31-40",
    },
    {
        Count: 35,
        speciality: "41-50",
    },
    {
        Count: 10,
        speciality: "51-60",
    },
    {
        Count: 40,
        speciality: "61-70",
    },
    {
        Count: 10,
        speciality: "71-80",
    },
    {
        Count: 37,
        speciality: "81-90",
    },
    {
        Count: 40,
        speciality: "91-100",
    },
];



const valueFormatter = (value) => `${value}mm`;

export const Analytics = () => {
    return (
        <div className="m-3">




{/* 

<div className="flex gap-3 w-full">

<Card variant="solid" color="primary" invertedColors>
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Gross profit</Typography>
      <Typography level="h2">$ 432.6M</Typography>
    </CardContent>
  </CardContent>
  
</Card>




<Card variant="solid" color="primary" invertedColors>
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Gross profit</Typography>
      <Typography level="h2">$ 432.6M</Typography>
    </CardContent>
  </CardContent>
  
</Card>


<Card variant="solid" color="primary" invertedColors>
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Gross profit</Typography>
      <Typography level="h2">$ 432.6M</Typography>
    </CardContent>
  </CardContent>
  
</Card>
</div>
 */}



 <div className="flex gap-3 w-full">

<Card variant="solid" color="success" invertedColors className="w-full">
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Total Registered Patients</Typography>
      <Typography level="h2">432</Typography>
    </CardContent>
  </CardContent>
</Card>

<Card variant="solid" color="danger" invertedColors className="w-full">
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Total Registered Receptionists</Typography>
      <Typography level="h2">15</Typography>
    </CardContent>
  </CardContent>
</Card>

{/* <Card variant="solid" color="primary" invertedColors className="w-full">
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Gross profit</Typography>
      <Typography level="h2">$ 432.6M</Typography>
    </CardContent>
  </CardContent>
</Card> */}


<Card variant="solid" color="primary" invertedColors className="w-full" style={{ height: '150px' }}>
  <CardContent orientation="horizontal">
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
    <CardContent>
      <Typography level="body-md">Total Registered Doctors</Typography>
      <Typography level="h2">70</Typography>
    </CardContent>
  </CardContent>
</Card>


</div>






{/* 

<div className="flex">





<LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
        },
      ]}
      width={1500}
      height={400}
    />  





<PieChart
                series={[
                    {
                        data: [
                            { id: 0, value: 60, label: "Male" },
                            { id: 1, value: 30, label: "Female" },
                            { id: 2, value: 10, label: "Other" },
                        ],
                        highlightScope: { faded: "global", highlighted: "item" },
                        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
                    },
                ]}
                height={200}
            />

</div>
 */}


<br></br>

 <div className="flex">
  <div style={{ width: '70%' }}>
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
  </div>

  <PieChart
    series={[
      {
        data: [
          { id: 0, value: 60, label: "Male" },
          { id: 1, value: 30, label: "Female" },
          { id: 2, value: 10, label: "Other" },
        ],
        highlightScope: { faded: "global", highlighted: "item" },
        faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
      },
    ]}
    height={310}
    style={{ margin: '7px' }}
  />
</div>







            <div className="flex">
                <BarChart
                    dataset={dataset}
                    yAxis={[{ scaleType: "band", dataKey: "speciality" }]}
                    series={[
                        { dataKey: "Count", label: "Doctors By Speciality", valueFormatter },
                    ]}
                    layout="horizontal"
                    {...chartSetting}
                />

                <BarChart
                    dataset={appDataset}
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

                {/* <BarChart
                    dataset={patientDataset}
                    yAxis={[{ scaleType: "band", dataKey: "speciality" }]}
                    series={[
                        {
                            dataKey: "Count",
                            label: "Patient By Age",
                            valueFormatter,
                        },
                    ]}
                    layout="horizontal"
                    {...patientChartSetting}
                /> */}


                <BarChart
  dataset={patientDataset}
  yAxis={[{ scaleType: "band", dataKey: "speciality" }]}
  series={[
    {
      dataKey: "Count",
      label: "Patient By Age",
      valueFormatter,
    },
  ]}
  layout="horizontal"
  {...patientChartSetting}
  colorScheme={['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0', '#ffeb3b', '#03a9f4', '#00bcd4', '#009688', '#8bc34a']}
/>

            </div>


                    {/* <div className="flex gap-3 ">


                    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
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
        <CardContent>
          <Typography level="body-md">Gross profit</Typography>
          <Typography level="h2">$ 432.6M</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>

    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
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
        <CardContent>
          <Typography level="body-md">Gross profit</Typography>
          <Typography level="h2">$ 432.6M</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>

    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
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
        <CardContent>
          <Typography level="body-md">Gross profit</Typography>
          <Typography level="h2">$ 432.6M</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button variant="soft" size="sm">
          Add to Watchlist
        </Button>
        <Button variant="solid" size="sm">
          See breakdown
        </Button>
      </CardActions>
    </Card>

                    </div> */}





{/* 
                    <div>
  <div className="card text-bg-primary mb-3" style={{ maxWidth: "18rem" }}>
    <div className="card-header">Total Patient Count</div>
    <div className="card-body">
      <h5 className="card-title">Primary card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  </div>
</div> */}



           
            {/* <div class="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-6 MuiGrid-grid-lg-3 css-17cu47x"><div class="MuiBox-root css-rwss59"><div class="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-sa3w6d"><div class="MuiBox-root css-p6siio"><div class="MuiBox-root css-bkvx7i"><span class="material-icons-round notranslate MuiIcon-root MuiIcon-fontSizeMedium css-wlr1hm" aria-hidden="true">store</span></div><div class="MuiBox-root css-8k5edi"><span class="MuiTypography-root MuiTypography-button css-1dcnter">Revenue</span><h4 class="MuiTypography-root MuiTypography-h4 css-rtlgmj">34k</h4></div></div><hr class="MuiDivider-root MuiDivider-fullWidth css-2hb8f"><div class="MuiBox-root css-bln954"><p class="MuiTypography-root MuiTypography-button css-1fhu5z7"><span class="MuiTypography-root MuiTypography-button css-141aiuc">+1%</span>&nbsp;than yesterday</p></div></div></div></div></div> */}
                    

        </div>
    );
};
