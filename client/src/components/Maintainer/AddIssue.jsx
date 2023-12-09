import { useState } from "react";
import "../../styles/issue.css";

const AddIssue = ({ setOpenAddIssueModal }) => {
  const [projectId, setProjectId] = useState("");
  const [issueName, setIssueName] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [issueWeight, setIssueWeight] = useState("");

  const handleAddIssue = () => {
    // You can implement logic to add the new issue here
    // For simplicity, let's just print the values for now
    console.log("Project ID:", projectId);
    console.log("Issue Name:", issueName);
    console.log("Issue Description:", issueDescription);
    console.log("Issue Weight:", issueWeight);

    // Close the modal after adding the issue
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
