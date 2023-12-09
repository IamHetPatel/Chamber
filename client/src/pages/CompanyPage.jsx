import "../styles/companyPage.css";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { readContract, writeContract } from "@wagmi/core";
import { contract_address as na } from "../../contractData/newone-address.json";
import { abi as newOneAbi } from "../../contractData/newone.json";
import { abi as daoAbi } from "../../contractData/DAO.json";
import { contract_address as da } from "../../contractData/DAO-address.json";
const CompanyPage = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { address } = useAccount();
  const [modal, setModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [maintainerWalletAddress, setMaintainerWalletAddress] = useState("");
  const [maintainerGithub, setMaintainerGithub] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projects, setProjects] = useState([]);

  // Fetch projects from DAO API when the component mounts
  const fetchProjects = async () => {
    try {
      const response = await readContract({
        abi: daoAbi, // The ABI for your DAO contract
        address: da, // The address of your DAO contract
        functionName: "getDAO", // The function name to call
      });
      const data = response;
      // console.log(data)

      if (Array.isArray(data)) {
        const projectDetails = data.map((project) => ({
          id: project.id.toString(), // Convert id to string if it's a BigInt
          uri: project.uri , // Use an empty string if uri is undefined
        }));
        setProjects(projectDetails);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onProjectItemClick = (projectId) => {
    // Set the selected project's ID
    setSelectedProjectId(projectId);
    // Open the modal
    setModal(true);
  };
  const onMaintainerSubmit = async () => {
    try {
      const data = await readContract({
        abi: newOneAbi,
        address: na,
        functionName: "_githubUsernameTaken",
        args: [maintainerGithub],
      });

      console.log(data);
      if (!data) {
        await writeContract({
          abi: newOneAbi,
          address: na,
          functionName: "safeMint",
          args: [maintainerWalletAddress, 2, maintainerGithub, 'NO_TOKEN'],
        });
      }

      await writeContract({
        abi: daoAbi,
        address: da,
        functionName: "joinDAO",
        args: [selectedProjectId, maintainerWalletAddress],
      });

      
      // const dataUserName = await readContract({
      //   abi: newOneAbi,
      //   address: na,
      //   functionName: "_githubUsernames",
      //   args: [address],
      // });
      // const dataProjName = await readContract({
      //   abi: daoAbi,
      //   address: da,
      //   functionName: "daos",
      //   args: [selectedProjectId],
      // });
      const dao = await readContract({
        abi: daoAbi,
        address: da,
        functionName: "daos",
        args: [selectedProjectId],
      })
      const dataAccessToken = await readContract({
        abi: newOneAbi,
        address: na,
        functionName: "_githubAccessToken",
        args: [address],
      });

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // console.log("das", dataUserName);
      console.log(dao);
      const repo = dao[2].split('/')
      console.log(dataAccessToken);
      var raw = JSON.stringify({
        owner: repo[0],
        repo: repo[1],
        assignee: maintainerGithub,
        token: dataAccessToken,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("http://10.0.1.160:3000/addCollaborator", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
    setModal(false);
    setMaintainerWalletAddress("");
  };

  const onSubmit = async () => {
    // Create an object with the form data
    const formData = {
      name: githubUsername,
      token: accessToken,
      walletAddress: address,
    };
    // console.log(formData);

    // Create headers for the POST request
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // Convert the form data object to JSON
    const raw = JSON.stringify(formData);

    // Configure the request options
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // Make the POST request
    fetch("https://copper-agouti-ring.cyclic.app/createCompany", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    try {
      await writeContract({
        abi: newOneAbi,
        address: na,
        functionName: "safeMint",
        args: [address, 3, githubUsername, accessToken],
      });
      // console.log("object");
    } catch (error) {
      console.log(error);
    }
  };

  const getAccessToken = async () => {
    try {
      const data = await readContract({
        abi: newOneAbi,
        address: na,
        functionName: "getGitHubAccessToken",
        args: [address],
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getGithubUsername = async () => {
    try {
      const data = await readContract({
        abi: newOneAbi,
        address: na,
        functionName: "_githubUsernames",
        args: [address],
      });
    
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitProject = async () => {
    const formData = {
      name: projectName,
      description: projectDescription,
      token: await getAccessToken(),
    };
    console.log(formData);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    const owner = await getGithubUsername()
    try {
      const response = await fetch(
        "http://10.0.1.160:3000/createRepo",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
      setProjects((prevProjects) => [
        ...prevProjects,
        {
          name: `${owner}/chamber-${projectName}`,
          description: projectDescription /* other fields */,
        },
      ]);
      await writeContract({
        abi: daoAbi,
        address: da,
        functionName: "createDAO",
        args: [`${owner}/chamber-${projectName}`],
      });
      console.log("written");
    } catch (error) {
      console.log(error);
    }
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
                <label htmlFor="project-name">Project Name</label>
                <input
                  type="text"
                  id="input"
                  name="project-name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
              <div className="project-description">
                <label htmlFor="project-description">Project Description</label>
                <input
                  type="text"
                  id="input"
                  name="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                />
              </div>
              <div className="project-amount">
                <label for="project-amount">Project Amount</label>
                <input type="text" id="input" name="project-amount" />
              </div>
            </form>
            <button
              className="submit-button"
              type="button"
              onClick={onSubmitProject}
            >
              Submit
            </button>
          </div>
        </div>

        {modal ? (
          <div className="modal-container">
            <div className="modal">
              <div className="modal-title">Project Name</div>
              <div className="modal-text">
                Your project has been created. You can view it in your projects
                tab.
              </div>
              <div className="add-maintainer">
                <label htmlFor="add-maintainer">Add Maintainer</label>
                <input
                  type="text"
                  id="input"
                  name="maintainer-wallet"
                  placeholder="Maintainer wallet address"
                  value={maintainerWalletAddress}
                  onChange={(e) => setMaintainerWalletAddress(e.target.value)}
                />
                <input
                  type="text"
                  id="input"
                  name="maintainer-github"
                  placeholder="Maintainer GitHub Username"
                  value={maintainerGithub}
                  onChange={(e) => setMaintainerGithub(e.target.value)}
                />
              </div>
              <div className="modal-button-container">
                <button
                  className="modal-button"
                  onClick={() => onMaintainerSubmit(selectedProjectId)}
                >
                  Add Maintainer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="yourprojects-container">
            <div className="your-projects-title">Your Projects</div>
            <div className="your-projects-list">
              {/* {console.log(projects)} */}
              {projects.map(({ id, uri }, index) => (
                <div
                  key={id}
                  className="your-projects-item"
                  onClick={() => onProjectItemClick(id)}
                >
                  <div className="your-projects-num">{index + 1}</div>
                  <div className="your-projects-name">{uri}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyPage;
