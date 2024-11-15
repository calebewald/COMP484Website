import React from "react";
import './LoginPage.css';
import { useState } from "react";


const LoginPage = () => {

    const [action,setAction] = useState("K's Compost Login");

    return (
        <div className='container'>
            <div className="header">
              <div className="text">{action}</div> 
              <div className="underline"></div> 
            </div>
            <div className="inputs">
                {action==="K's Compost Login"?<div></div>: <div className="input">
                   <input type="text" placeholder="First & Last Name" /> 
                </div>}
                
                <div className="input">
                   <input type="email" placeholder="K Email" /> 
                </div>
                <div className="input">
                   <input type="password" placeholder="Password" /> 
                </div>
            </div>
            {action==="Create Account"?<div></div>:<div className="forgot-password">Forgot Password? <span>Click Here</span></div>}        
            
            <div className="submit-container">
                <div className={action==="K's Compost Login"?"submit gray":"submit"} onClick={()=>{setAction("Create Account")}}>Create Account</div>
                <div className={action==="Create Account"?"submit gray":"submit"} onClick={()=>{setAction("K's Compost Login")}}>Login</div>
            </div>
        </div>
    )



   
}

export default LoginPage;