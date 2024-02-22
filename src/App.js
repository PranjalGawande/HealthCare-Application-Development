// import './App.css';
// import * as React from "react";
// import { Router,Route } from 'react-router-dom';
// import { LoginPage } from './Components/LoginPage';
// import { AdminDashboard } from './Components/AdminDashboard';
// import { DoctorDashboard } from './Components/DoctorDashboard';
// import { ReceptionistDashboard } from './Components/ReceptionistDashboard';

// function App() {
//   // Assume you have some state to manage the current user and their role
//   const currentUser = {
//     role: 'admin' // This could be 'doctor', 'staff', or 'admin'
//   };

//   return (
//     <Router>
//       <Switch>
//         <Route path="/login" component={LoginPage} />
//         <PrivateRoute path="/admin" component={AdminDashboard} role="admin" currentUser={currentUser} />
//         <PrivateRoute path="/doctor" component={DoctorDashboard} role="doctor" currentUser={currentUser} />
//         <PrivateRoute path="/Receptionist" component={ReceptionistDashboard} role="Receptionist" currentUser={currentUser} />
//         <Redirect from="/" to="/login" />
//       </Switch>
//     </Router>
//   );
// };

// const PrivateRoute = ({ component: Component, role, currentUser, ...rest }) => (
//   <Route
//     {...rest}
//     render={props =>
//       currentUser && currentUser.role === role ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );

// export default App;



// import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import LoginPage from './Components/LoginPage';
// import AdminDashboard from './Components/AdminDashboard';
// import DoctorDashboard from './Components/DoctorDashboard';
// import ReceptionistDashboard from './Components/ReceptionistDashboard';

// function App() {
//   // Assume you have some state to manage the current user and their role
//   const currentUser = {
//     role: 'admin' // This could be 'doctor', 'staff', or 'admin'
//   };

//   // Function to render the appropriate dashboard based on the user role
//   const renderDashboard = () => {
//     switch (currentUser.role) {
//       case 'admin':
//         return <AdminDashboard />;
//       case 'doctor':
//         return <DoctorDashboard />;
//       case 'Receptionist':
//         return <ReceptionistDashboard />;
//       default:
//         return <LoginPage />;
//     }
//   };

//   return (
//     <Router>
//       <Route path="/" render={renderDashboard} />
//     </Router>
//   );
// }

// export default App;
