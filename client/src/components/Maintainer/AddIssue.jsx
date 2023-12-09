import { useState,useEffect } from "react";
import "../../styles/addIssue.css";
import { readContract,writeContract } from "@wagmi/core";
import { abi as dao_abi } from "../../../contractData/DAO.json";
import { contract_address as dao_address } from "../../../contractData/DAO-address.json";

const AddIssue = ({ setOpenAddIssueModal }) => {
  const [projectId, setProjectId] = useState(0);
  const [issueName, setIssueName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueWeight, setIssueWeight] = useState(0);

  const handleAddIssue = async (e) => {
    e.preventDefault();
    try {

      console.log(projectId)
      const projID = await readContract({
        abi : dao_abi,
        address : dao_address,
        functionName : "daos",
        args : [projectId]
      })
      console.log(projID)
      console.log(issueName)
      console.log(issueDescription)
      console.log(issueWeight)
      const repo = projID[2].split('/');

      console.log(repo[0])
      console.log(repo[1])
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        owner: repo[0],
        repo: repo[1],
        title: issueName,
        body: issueDescription
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://10.0.1.160:3000/createIssue", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

      await writeContract({
          abi : dao_abi,
          address : dao_address,
          functionName : "createIssue",
          args :[projectId,issueName,issueDescription,issueWeight]
      })
    console.log("object");
  } catch (error) {
    console.error("Error adding issue:", error);
  }

  setOpenAddIssueModal(false);
  };

  return (
    <>
      <div className="issue-modal">
        <span className="close-button-modal" onClick={() => setOpenAddIssueModal(false)}>
          &times;
        </span>
        <form className="solution-form">
          <label htmlFor="projectId">Project ID:</label>
          <input
            type="text"
            id="projectId"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />

          <label htmlFor="issueName">Issue Name:</label>
          <input
            type="text"
            id="issueName"
            value={issueName}
            onChange={(e) => setIssueName(e.target.value)}
          />

          <label htmlFor="issueDescription">Issue Description:</label>
          <textarea
            id="issueDescription"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
          />

          <label htmlFor="issueWeight">Issue Weight:</label>
          <input
            type="text"
            id="issueWeight"
            value={issueWeight}
            onChange={(e) => setIssueWeight(e.target.value)}
          />

        <button className="submit-button" onClick={handleAddIssue}>
          Add Issue
        </button>
        </form>
      </div>
    </>
  );
};

export default AddIssue;
