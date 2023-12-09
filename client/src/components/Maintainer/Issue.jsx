import { useState } from "react";
import "../../styles/issue.css";

const Issue = ({ id, name, reward }) => {
  const [openIssueModal, setOpenIssueModal] = useState(false);
  const [input, setInput] = useState("");

  const submitSolution = () => {
    // try {
    //   // Make API call to submit the solution
    //   const response = await fetch("https://your-api-endpoint/submitSolution", {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       issueId: id, // Pass the issue ID along with the solution
    //       solution: input,
    //     }),
    //   });

    //   // Handle the response as needed
    //   if (response.ok) {
    //     console.log("Solution submitted successfully");
    //   } else {
    //     console.error("Failed to submit solution");
    //   }
    // } catch (error) {
    //   console.error("Error submitting solution:", error);
    // }
    console.log(input)
  };

  return (
    <>
      <div className={openIssueModal ? "issue-modal" : "hide"}>
        <span
          className="close-button-modal"
          onClick={() => setOpenIssueModal(false)}
        >
          &times;
        </span>
        <form
          className="solution-form"
          onSubmit={(e) => {
            e.preventDefault();
            submitSolution();
          }}
        >
          <label htmlFor="solution">{name}</label>
          <span className="solution-instruction">Please write a solution</span>
          <textarea
            className="suggested-solution"
            id="solution"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
      <div className="issue" >
        <span className="issues-col">{id}</span>
        <span className="issues-col">{name}</span>
        <span className="issues-col">{reward}</span>
      </div>

    </>
  );
};

export default Issue;
