import "../styles/startPage.css";
import { NavLink } from "react-router-dom";
import { readContract } from "@wagmi/core";
import { useAccount } from "wagmi";
import { abi as newOneAbi } from "../../contractData/newone.json";
import { abi as daoAbi } from "../../contractData/DAO.json";
import { contract_address as da } from "../../contractData/DAO-address.json";
import { contract_address as na } from "../../contractData/newone-address.json";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const StartPage = () => {
  const { isConnected, address } = useAccount();
  const navigate = useNavigate();



  return (
    <div>
      <div className="main-container">
        <NavLink className="menu-option-startpage" to="/CompanyPage">Company Login</NavLink>
        <NavLink className="menu-option-startpage" to="/DevUser">Contribute to a project</NavLink>
        <NavLink className="menu-option-startpage" to="/MaintainerPage">Maintain a project</NavLink>
        <NavLink className="menu-option-startpage" to="/InvestorPage">Become an Investor</NavLink>
        <NavLink className="menu-option-startpage" to="#">Trade</NavLink>
      </div>
    </div>
  );
};

export default StartPage;
