import React from 'react';
import { useState } from "react";
import "../../styles/devuser.css"
import { readContract, writeContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import "../../styles/companyPage.css"
import { contract_address as na } from "../../../contractData/newone-address.json";
import { abi as newOneAbi } from "../../../contractData/newone.json"
import { abi as daoAbi } from "../../../contractData/DAO.json";
import { contract_address as da } from "../../../contractData/DAO-address.json";
import { useNavigate } from "react-router-dom";  
import { Link ,Navigate} from "react-router-dom";
export default function DevUser() {
const [githubUsername, setGithubUsername] = useState("");
const { isConnected, address } = useAccount();
const navigate = useNavigate();


const onSubmit = async () => {
     console.log(githubUsername)
    try {
      await writeContract({
        abi: newOneAbi,
        address: na,
        functionName: "safeMint",
        args: [address, 1, githubUsername, "NO_TOKEN"],
      });
      console.log(address);
      setTimeout(3000);
      // window.location.href = "/DeveloperPage";
    } catch (error) {
      const errorMessage = error.message || ""; // Ensure error.message is a string

      // Check if the error message contains the specific phrase
      if (errorMessage.includes("Wallet address already has a token")) {
        navigate("/DeveloperPage");
      } else {
        // Handle other errors as needed
        console.error("Error:", error);
      }
    }
    
    }


  return (
    <div className="overlay">
        <div className="header">
          <div className="dev-title">Developer GitHub Username</div>
          <form className="github-details">
            <div className="company-gitID">
              <label htmlFor="company-gitID">GitHub Username</label>
              <input
                type="text"
                id="input"
                name="company-gitID"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
            </div>
          </form>
          <div>
            <button className="submit-button-git" type="submit" onClick ={onSubmit} >
              Submit
            </button>
          </div>
        </div>
        </div>
  )
}
