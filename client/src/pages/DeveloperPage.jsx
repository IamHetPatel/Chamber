import { useState, useEffect } from "react";
import "../styles/developerPage.css";
import ProjectModal from "../components/developer/ProjectModal";
import ExploreItem from "../components/developer/ExploreItem";
import { readContract, writeContract } from "@wagmi/core";
import { contract_address as sbt_address } from "../../contractData/newone-address.json";
import { abi as sbt_abi } from "../../contractData/newone.json";
import { abi as dao_abi } from "../../contractData/DAO.json";
import { contract_address as dao_address } from "../../contractData/DAO-address.json";

const DeveloperPage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedId, setSelectedId] = useState("");

// Fetch projects from DAO API when the component mounts
const fetchProjects = async () => {
  try {
    console.log(123)
    const response = await readContract({
      abi: dao_abi, // The ABI for your DAO contract
      address: dao_address, // The address of your DAO contract
      functionName: "getDAO", // The function name to call
    });
    const data = response;
    // console.log(data)
    // console.log(123)

    if (Array.isArray(data)) {
      const projectDetails = data.map((project) => ({
        id: project.id.toString(), // Convert id to string if it's a BigInt
        name: project.name,
        pool: 1000,
        tokens: 60 // Use an empty string if uri is undefined
      }));
      setProjects(projectDetails);
    } else {
      console.error("Data is not an array:", data);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

const createIssue = 

useEffect(() => {
  fetchProjects();
}, []);

  return (
    <>
      <div className="developer-page-container">
        <div className="explore-projects-container">
          <ProjectModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={selectedTitle}
            id={selectedId}
          />
          <div className={!openModal ? "explore-wrapper" : "hide"}>
            <div className="explore-title">Explore Projects</div>
            <div className="titles">
              <div className="explore-column-title">Project ID</div>
              <div className="explore-column-title">Project Name</div>
              <div className="explore-column-title">Pool</div>
              <div className="explore-column-title">Tokens</div>
            </div>
            <div className="explore-list">
            {projects?.map(({ id, name, pool, tokens }) => {
                return(
                   <ExploreItem
                    key={id}
                    id={id}
                    name={name}
                    pool={pool}
                    tokens={tokens}
                    setOpenModal={setOpenModal}
                    setSelectedTitle={setSelectedTitle}
                    setSelectedId={setSelectedId}
                  />
                )
                })} 
              
            </div>
          </div>
        </div>
        <div className="contributors-container">
          <div className="contributors-pride-container">
            <div className="mini-container-title">Contributor&apos;s Pride</div>
            <div className="overall-stats-container">
              <div className="stat-card">
                <div className="stat-title">Issues Solved</div>
                <div className="stat-data">99</div>
              </div>
              <div className="stat-card">
                <div className="stat-title">Tokens</div>
                <div className="stat-data">69T</div>
              </div>
            </div>
          </div>
          <div className="previous-contributions-container">
            <div className="mini-container-title">Previous Contributions</div>
            <div className="previous-contributions-list">
              <div className="previous-contribution">
                <div className="pre-cont-name">Chamber1</div>
                <div className="pre-cont-num">#1</div>
                <div className="pre-cont-token">11</div>
              </div>
              <div className="previous-contribution">
                <div className="pre-cont-name">Chamber1</div>
                <div className="pre-cont-num">#1</div>
                <div className="pre-cont-token">11</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperPage;
