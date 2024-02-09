import './App.css';
import * as React from "react";
import Navbar from './Components/Navbar';
import ReceptionDashboard from './Components/ReceptionDashboard';
import HospitalFormLayout from './Components/HospitalFormLayout'

function App() {
  return (
    <div className="App">
         <Navbar></Navbar>
        <ReceptionDashboard></ReceptionDashboard>
        {/* <Form></Form> */}
        {/* <HospitalFormLayout></HospitalFormLayout> */}
    </div>
  );
}

export default App;

