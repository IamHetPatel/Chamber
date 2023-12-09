
import { useState } from "react";
import "../styles/issue.css"
const Issue = ({ id, name, reward }) => {
    const [openIssueModal, setOpenIssueModal] = useState(false);

  return (
    <>    
    <div className={openIssueModal ? "issue-modal" : "hide"}>
    <span
        className="close-button-modal"
        onClick={() => setOpenIssueModal(false)}
      >
        &times;
      </span>
      <form className="solution-form">
        <label htmlFor="solution">{name}</label>
        <span className="solution-instruction">Please write a solution</span>
        <textarea className="suggested-solution" id="solution" />
        <button className="submit-button">Submit</button>
      </form>
    </div>
    <div className="issue" onClick={() => setOpenIssueModal(true)}>
      <span className="issues-col">{id}</span>
      <span className="issues-col">{name}</span>
      <span className="issues-col">{reward}</span>
    </div>
    </>
  );
};

export default Issue;
