import { useState } from "react";
import AddIssue from "./AddIssue"; // Import the new AddIssue component
import "../../styles/maintainerpage.css";

const AddIssueModal = () => {
  const [openAddIssueModal, setOpenAddIssueModal] = useState(false);

  return (
    <>
      <button
        className="add-issue-button"
        onClick={() => setOpenAddIssueModal(true)}
      >
        Add Issue
      </button>
      <div className={openAddIssueModal ? "add-issue-modal" : "hide"}>
        <span
          className="close-button-modal"
          onClick={() => setOpenAddIssueModal(false)}
        >
          &times;
        </span>
        <AddIssue setOpenAddIssueModal={setOpenAddIssueModal} />
      </div>
    </>
  );
};

export default AddIssueModal;