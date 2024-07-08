import React, { useState } from 'react';
import './register.css';
import owner from './owner.png';
import employee from './employee.png';

const SignUp = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep(step + 1);

  return (
      <div className="signup-container">
        {step === 1 && (
            <>
              <h1>Role</h1>
              <div className="role-selection">
                <button onClick={nextStep} className="role-button">
                  <img src={owner} alt="Owner"/>
                  <span>Owner</span>
                </button>
                <button onClick={nextStep} className="role-button">
                  <img src={employee} alt="Employee"/>
                  <span>Employee</span>
                </button>
              </div>
            </>
        )}
        {step === 2 && (
            <div className="signin-form">
              <h1>Sign Up</h1>
              <input type="text" placeholder="First Name"/>
              <input type="text" placeholder="Last Name"/>
              <button onClick={nextStep} className="continue-button-h">Continue</button>
            </div>
        )}
        {step === 3 && (
            <div className="signin-form">
              <h1>Sign Up</h1>
              <input type="text" placeholder="Phone number"/>
              <input type="text" placeholder="Mail"/>
              <input type="password" placeholder="Password"/>
              <button onClick={nextStep} className="continue-button-h">Send code</button>
            </div>
        )}
        {step === 4 && (
            <div className="signin-form">
              <h1>Sign Up</h1>
              <input type="text" placeholder="Enter code"/>
              <button onClick={nextStep} className="continue-button-h">Continue</button>
            </div>
        )}

      </div>
  );
};

export default SignUp;
