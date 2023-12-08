import '../styles/companyPage.css';
import { useState } from "react";
import { useAccount } from 'wagmi';

const CompanyPage = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { address } = useAccount();

  const onSubmit = () => {
    // Create an object with the form data
    const formData = {
      name: githubUsername,
      token: accessToken,
      walletAddress: address,
    };

    // Create headers for the POST request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    // Convert the form data object to JSON
    const raw = JSON.stringify(formData);

    // Configure the request options
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    // Make the POST request
    fetch("https://copper-agouti-ring.cyclic.app/createCompany", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <>
      <div className="company-page-container">
        <div className="company-page-header">
          <div className="company-page-title">Company Page</div>
          <form className="github-details">
            <div className="company-gitID">
              <label htmlFor="company-gitID">GitHub Username</label>
              <input
                type="text"
                id="input"
                name="company-gitID"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
            </div>
            <div className="company-token">
              <label htmlFor="company-token">GitHub Access Token</label>
              <input
                type="text"
                id="input"
                name="company-token"
                placeholder="468e065...."
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
              />
            </div>
          </form>
          <div>
          <button className="submit-button" type="button" onClick={onSubmit}>
            Submit
          </button>
          </div>
        </div>
        <div className="startproject-contianer">
          <div className="start-project-title">Start a Project</div>
          <div className="project-details">
            <form>
              <div className="project-name">
                <label for="project-name">Project Name</label>
                <input type="text" id="input" name="project-name" />
              </div>
              <div className="project-description">
                <label for="project-description">Project Description</label>
                <input type="text" id="input" name="project-description" />
              </div>
              <div className="project-amount">
                <label for="project-amount">Project Amount</label>
                <input type="text" id="input" name="project-amount" />
              </div>
              <div className="project-tokens">
                <label for="project-tokens">Project Tokens</label>
                <input type="text" id="input" name="project-tokens" />
              </div>
            </form>
            <button className="submit-button" type="submit" onClick={onsubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="yourprojects-container">
          <div className="your-projects-title">Your Projects</div>
          <div className="your-projects-list">
            <div className="your-projects-item">
              <div className="your-projects-num">1</div>
              <div className="your-projects-name">Chamber</div>
              <div className="your-projects-Funding">99k</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompanyPage
