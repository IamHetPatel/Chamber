
import { useState, useEffect } from "react";
import Issue from "./Issue";
import "../../styles/projectModal.css"
import { readContract,writeContract } from "@wagmi/core";
import { abi as dao_abi } from "../../../contractData/DAO.json";
import { contract_address as dao_address } from "../../../contractData/DAO-address.json";
const ProjectModal = ({ id, title, openModal, setOpenModal }) => {

  const [Issues, setIssues] = useState([]);
 const fetchProjects = async () => {
      try {
        const getAllIssue = await readContract({
          abi: dao_abi, 
          address: dao_address, 
          functionName: "getIssue", 
        });
        console.log(getAllIssue)
        setIssues(getAllIssue)
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    
    useEffect(() => {
      fetchProjects();
    }, []); 

 
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
          <span className="issues-list-title">Issue Weight</span>
        </div>
        {Issues?.map(({ id, name, weight }) => {
                return(
                   <Issue
                    key={id}
                    id={Number(id)}
                    name={name}
                    reward={Number(weight)}
                  />
                )
                })}
      </div>
    </>
  );
};

export default ProjectModal;