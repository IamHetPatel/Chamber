import { useEffect, useState } from "react";
import "../styles/developerPage.css";
// import Issue from '../components/Issue'
import ProjectModal from "../components/Maintainer/ProjectModal";
import ExploreItem from "../components/Maintainer/ExploreItem";
// import AddIssueModal from "../components/Maintainer/AddIssueModal";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { contract_address as sbt_address } from "../../contractData/newone-address.json";
import { abi as sbt_abi } from "../../contractData/newone.json";
import { abi as dao_abi } from "../../contractData/DAO.json";
import { contract_address as dao_address } from "../../contractData/DAO-address.json";
const MaintainerPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const { address } = useAccount();
  const [daoData, setDaoData] = useState([]);

  const loadDAO = async () => {
    try {
      const dataDAO = await readContract({
        abi: dao_abi,
        address: dao_address,
        functionName: "getDAObyMaintainer",
        args: [address]
      });

      const firstItem = dataDAO[0];
      console.log(firstItem);

      setDaoData({
        id: firstItem.id,
        name: firstItem.name// You may want to rename this key to match your component
      });
      
      console.log(dataDAO);
    } catch (error) {
      console.error('Error loading DAO:', error);
    }
  };

  useEffect(() => {
    // Call the loadDAO function when the component mounts
    loadDAO();
  }, []);

  // const loadDAO = async () => {
  //   const dataDAO = await readContract({
  //     abi: dao_abi,
  //     address: dao_address,
  //     functionName: "getDAObyMaintainer",
  //     args : [address]
  //   });
  //   console.log(dataDAO);
  // };


  // useEffect(()=>{
  //   loadDAO();
  // })
  const getDAO_data = async () => {
    const dataDAO_byID = await readContract({
      abi: dao_abi,
      address: dao_address,
      functionName: "getIssueByDAO",
      args : [dao_id]
    });
  };

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
          {/* <AddIssueModal/> */}
          <div className={!openModal ? "explore-wrapper" : "hide"}>
            <div className="explore-title">Projects Assigned </div>
            <div className="titles">
              <div className="explore-column-title">Project ID</div>
              <div className="explore-column-title">Project Name</div>
              <div className="explore-column-title">Pool</div>
              <div className="explore-column-title">Tokens</div>
            </div>
            <div className="explore-list">
              <ExploreItem
                id={daoData.id?.toString()}
                name={daoData.name}
                pool={100000} // Example value, replace with actual data
                tokens={5} // Example value, replace with actual data
                setOpenModal={setOpenModal}
                setSelectedTitle={setSelectedTitle}
                setSelectedId={setSelectedId}
              />
            </div>
          </div>
        </div>
        <div className="contributors-container">
          <div className="contributors-pride-container">
            <div className="mini-container-title">Maintainer&apos;s Pride</div>
            <div className="overall-stats-container">
              <div className="stat-card">
                <div className="stat-title">Issues Created</div>
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

export default MaintainerPage;