import "../styles/investorPage.css";
import "../styles/developerPage.css";
import "../styles/projectModal.css";
import "../styles/issue.css";
import ProjectModal from "../components/developer/ProjectModal";
import ExploreItem from "../components/developer/ExploreItem";
import { useState } from "react";

const InvestorPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedId, setSelectedId] = useState("");
  return (
    <>
      <div className="investor-page-container">
        <div className="explore-projects-contianer">
          <ProjectModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            title={selectedTitle}
            id={selectedId}
          />
          <div className={!openModal ? "explore-wrapper" : "hide"}>
            <div className="explore-title">Explore Projects</div>
            <div className="titles">
              <div className="explore-column-title">ID</div>
              <div className="explore-column-title">Name</div>
              <div className="explore-column-title">Pool</div>
              <div className="explore-column-title">Tokens</div>
            </div>
            <div className="explore-list">
              <ExploreItem
                id={101}
                name={"Project 1"}
                pool={100000}
                tokens={5}
                setOpenModal={setOpenModal}
                setSelectedTitle={setSelectedTitle}
                setSelectedId={setSelectedId}
              />
            </div>
          </div>
        </div>
        <div className="your-investments-container">
          <div className="your-investments-title">Your Investments</div>
          <div className="titles">
            <div className="investments-column-title">Project</div>
            <div className="investments-column-title">Invested</div>
            <div className="investments-column-title">Tokens</div>
          </div>
          <div className="investments-list">
            <div className="investments-item">
              <div className="investments-list-project">Chamber1</div>
              <div className="investments-list-invested">105K</div>
              <div className="investments-list-tokens">10K</div>
            </div>
            <div className="investments-item">
              <div className="investments-list-project">Chamber1</div>
              <div className="investments-list-invested">105K</div>
              <div className="investments-list-tokens">10K</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestorPage;
