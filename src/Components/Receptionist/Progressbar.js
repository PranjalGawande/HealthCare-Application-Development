import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { AdhaarAbhaIdCreation } from "./AdhaarAbhaIdCreation";
import { AdhaarOtpVerification } from "./AdhaarOtpVerification";

export const Progressbar = (props) => {
    return (
        <div className="container mt-5">
            <ProgressBar
                percent={((props.step - 1) * 100) / 3}
                filledBackground="linear-gradient(to right, #7bfbff, #3bace5"
                className="progress-bar"
                width="100%" 
                height="20px" 
            >
                <Step transition="scale">
                    {({ accomplished, index }) => (
                        <div className={`step ${accomplished ? "completed" : ""}`}>
                            1
                        </div>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) => (
                        <div className={`step ${accomplished ? "completed" : ""}`}>
                            2
                        </div>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) => (
                        <div className={`step ${accomplished ? "completed" : ""}`}>
                            3
                        </div>
                    )}
                </Step>
                <Step transition="scale">
                    {({ accomplished, index }) => (
                        <div className={`step ${accomplished ? "completed" : ""}`}>
                            4
                        </div>
                    )}
                </Step>
            </ProgressBar>
        </div>
    );
}
