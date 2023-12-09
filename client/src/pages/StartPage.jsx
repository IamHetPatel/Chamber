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

  const checkRole = async () => {
    try {
      console.log(address)
      const response = await readContract({
        abi: newOneAbi,
        address: na,
        functionName: "_tokenRoles",
        args: [address],
      });

      const data = response;
      console.log(data)
      switch (data) {
        case 0:
        <NavLink to ="DevUser" />
          break;

        case 1:
          <NavLink to="DeveloperPage" />;
          break;

        case 2:
          <NavLink to="MaintainerPage" />;
          break;

        case 3:
          <NavLink to="CompanyPage" />;
          break;

        default:
          window.location.href = "/";
          break;
      }
    } catch (error) {
      console.error("Error checking role:", error);
      // Handle the error as needed
    }
  };

  return (
    <div>
      <div className="main-container">
        <NavLink className="menu-option-startpage" to="/CompanyPage">
          Company Login
        </NavLink>
        <div
          className="menu-option-startpage developer"
          onClick={() => checkRole()}
        >
          Contribute to a project
        </div>
        <div className="menu-option-startpage" onClick={() => checkRole()}>
          Maintain a project
        </div>
        <div className="menu-option-startpage" onClick={() => checkRole()}>
          Become an Investor
        </div>
        <div className="menu-option-startpage" onClick={() => checkRole()}>
          Trade
        </div>
      </div>
    </div>
  );
};

export default StartPage;
