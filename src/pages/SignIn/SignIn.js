import React from "react"
import './SignIn.css'
import "bootstrap/dist/css/bootstrap.min.css"
import SignInForm from "../../components/SignIn/SignIn";


export const SignIn = () => {


  return (
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}