import '../styles/startPage.css'
import { NavLink } from "react-router-dom";

const StartPage = () => {
  return (
    <div>
      <div className='main-container'>
        <NavLink className="menu-option-startpage" to="/CompanyPage">Company Login</NavLink>
        <NavLink className="menu-option-startpage" to="/DeveloperPage">Contribute to a project</NavLink>
        <NavLink className="menu-option-startpage" to="/MaintainerPage">Maintain a project</NavLink>
        <NavLink className="menu-option-startpage" to="/InvestorPage">Become an Investor</NavLink>
        <NavLink className="menu-option-startpage" to="#">Trade</NavLink>
      </div>
    </div>
  )
}

export default StartPage
