# Health Sync: Hospital Management System Integrated with ABDM Sandbox

A comprehensive Hospital Management System designed to enhance interoperability and efficiency in healthcare operations by integrating with the Ayushman Bharat Digital Mission (ABDM) Sandbox.

## Table of Contents

- [Project Overview](#project-overview)
- [Core Features](#core-features)
- [Methodology and Technical Aspects](#methodology-and-technical-aspects)
- [Outcomes and Challenges](#outcomes-and-challenges)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Contributors](#contributors)

## Project Overview

**Health Sync** is a robust Hospital Management System developed to integrate seamlessly with the Ayushman Bharat Digital Mission (ABDM) Sandbox. The primary objective of the project is to enhance the efficiency of healthcare operations by facilitating secure and interoperable health data exchange.

### Core Features

- **Patient Registration and ABHA ID Creation**: Implemented a feature to register patients and generate/verify their ABHA ID.
- **Consent Management**: Developed functionality to generate and manage consent requests between healthcare providers and patients.
- **Data Exchange**: Enabled secure transmission of patient records by demonstrating data sharing capabilities with ABDM’s Personal Health Record (PHR) app.

## Methodology and Technical Aspects

- **Frontend Development**: Utilized ReactJS for a dynamic and interactive user interface, handling user interactions and connecting to the backend.
- **Backend Development**: Implemented using Java Spring Boot, featuring JWT token-based authentication and Role-Based Access Control (RBAC) for security.
- **Integration Layer**: Developed to connect HIS with ABDM, enabling the exchange of health records, consent management, and interworking with the ABDM PHR app.
- **Security Measures**: Included JWT-based authentication, RBAC for access control, and comprehensive auditing and logging mechanisms to monitor system usage.

## Outcomes and Challenges

- **Achievements**: Successfully implemented core features such as patient registration, consent management, and data exchange with ABDM, adhering to privacy and data protection standards.
- **Challenges**: Encountered issues with ABDM APIs, which were partially addressed during the project.

## Technologies Used

- **Frontend**: ReactJS
- **Backend**: Java Spring Boot
- **Database**: MySQL
- **Security**: JWT-based authentication, Role-Based Access Control (RBAC)

## Installation and Setup

### Prerequisites

- Java 11 or higher
- Node.js 14 or higher
- MySQL 8.0 or higher
- Maven

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/health-sync-abdm.git
   cd health-sync-abdm

   # Project Setup and Usage Guide

## Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    mvn clean install
    ```

3. **Configure MySQL database** in `application.properties`.

## Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Running the Application

1. **Start the Backend:**

    ```bash
    cd backend
    mvn spring-boot:run
    ```

2. **Start the Frontend:**

    ```bash
    cd frontend
    npm start
    ```

3. **Access the Application:**

    Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Contributors

- **Pranjal Gawande** - [@PranjalGawande](https://github.com/PranjalGawande)
- **Hari Prasad** - [@HariPrasad0023](https://github.com/HariPrasad0023)
- **Aryan Patel** - [@ARYAN-PATEL-11](https://github.com/ARYAN-PATEL-11)
- **Aryan Yadav** - [@Aryan6043](https://github.com/Aryan6043)
