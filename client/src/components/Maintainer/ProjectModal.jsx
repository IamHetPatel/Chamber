import { useState } from "react";
import Issue from "./Issue";
import "../../styles/projectModal.css"
const ProjectModal = ({ id, title, openModal, setOpenModal }) => {
  //you can use id directly here to fetch
  //we have passed it as a prop
 
  return (
    <>
      <div className={openModal ? "single-project-modal" : "hide"}>
        <span
          className="close-button-modal"
          onClick={() => setOpenModal(false)}
        >
          &times;
        </span>

        <span className="project-title">{title}</span>
        <span className="project-description">Description</span>
        <div className="issues-list-heading">
          <span className="issues-list-title">IssueID</span>
          <span className="issues-list-title">Issue Name</span>
          <span className="issues-list-title">Reward</span>
        </div>
        <Issue
          id={1}
          name={"Change UI"}
          reward={100}
        />
      </div>
    </>
  );
};

export default ProjectModal;
