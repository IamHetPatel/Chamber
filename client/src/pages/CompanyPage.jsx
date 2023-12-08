// import '../styles/companyPage.css';
// import { useState } from "react";
// import { useAccount } from 'wagmi';
// import { readContract,writeContract } from '@wagmi/core'
// // import { readContract,writeContract } from 'wagmi/actions';
// import {contract_address} from "../../contractData/newone-address.json"
// import {abi} from "../../contractData/newone.json"
// const CompanyPage = () => {
//   const [githubUsername, setGithubUsername] = useState("");
//    const [accessToken, setAccessToken] = useState("");
//   const { address } = useAccount();


//   const onSubmit = async () => {
//     // Create an object with the form data
//     const formData = {
//       name: githubUsername,
//       token: accessToken,
//       walletAddress: address,
//     };
//     console.log(formData)

  
//     // Create headers for the POST request
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     // Convert the form data object to JSON
//     const raw = JSON.stringify(formData);

//     // Configure the request options
//     const requestOptions = {
//       method: 'POST',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow',
//     };

//     // Make the POST request
//     fetch("https://copper-agouti-ring.cyclic.app/createCompany", requestOptions)
//       .then(response => response.text())
//       .then(result => console.log(result))
//       .catch(error => console.log('error', error));
//       try{
//         await writeContract({
//           abi: abi,
//           address: contract_address,
//           functionName: 'safeMint',
//           args: [address,3,"Company",accessToken]
//       })
//       console.log("object")
//       }
//       catch(error){
//         console.log(error)
//       }
//   };

//   const getAccessToken =  async() =>{
//     try{
//       const data = await readContract({
//         abi: abi,
//         address: contract_address,
//         functionName: 'getGitHubAccessToken',
//         args: [address],
//       })
//       console.log(data)
//     }
//     catch(error){
//       console.log(address)
//       console.log(error)
//     }
//   }
//   return (
//     <>
//       <div className="company-page-container">
//         <div className="company-page-header">
//           <div className="company-page-title">Company Page</div>
//           <form className="github-details">
//             <div className="company-gitID">
//               <label htmlFor="company-gitID">GitHub Username</label>
//               <input
//                 type="text"
//                 id="input"
//                 name="company-gitID"
//                 value={githubUsername}
//                 onChange={(e) => setGithubUsername(e.target.value)}
//               />
//             </div>
//             <div className="company-token">
//               <label htmlFor="company-token">GitHub Access Token</label>
//               <input
//                 type="text"
//                 id="input"
//                 name="company-token"
//                 placeholder="468e065...."
//                 value={accessToken}
//                 onChange={(e) => setAccessToken(e.target.value)}
//               />
//             </div>
//           </form>
//           <div>
//           <button className="submit-button" type="button" onClick={onSubmit}>
//             Submit
//           </button>
//           <button className="submit-button" type="button" onClick={getAccessToken}>
//             Submitsad
//           </button>
//           </div>
//         </div>
//         <div className="startproject-contianer">
//           <div className="start-project-title">Start a Project</div>
//           <div className="project-details">
//             <form>
//               <div className="project-name">
//                 <label for="project-name">Project Name</label>
//                 <input type="text" id="input" name="project-name" />
//               </div>
//               <div className="project-description">
//                 <label for="project-description">Project Description</label>
//                 <input type="text" id="input" name="project-description" />
//               </div>
//               <div className="project-amount">
//                 <label for="project-amount">Project Amount</label>
//                 <input type="text" id="input" name="project-amount" />
//               </div>
//               <div className="project-tokens">
//                 <label for="project-tokens">Project Tokens</label>
//                 <input type="text" id="input" name="project-tokens" />
//               </div>
//             </form>
//             <button className="submit-button" type="submit" onClick={onsubmit}>
//               Submit
//             </button>
//           </div>
//         </div>
//         <div className="yourprojects-container">
//           <div className="your-projects-title">Your Projects</div>
//           <div className="your-projects-list">
//             <div className="your-projects-item">
//               <div className="your-projects-num">1</div>
//               <div className="your-projects-name">Chamber</div>
//               <div className="your-projects-Funding">99k</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default CompanyPage

import '../styles/companyPage.css';
import { useState } from "react";
import { useAccount } from 'wagmi';
import { readContract,writeContract } from '@wagmi/core';
import {contract_address} from "../../contractData/newone-address.json"
import {abi} from "../../contractData/newone.json"
const CompanyPage = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const { address } = useAccount();
  const onSubmit = async () => {
    // Create an object with the form data
    const formData = {
      name: githubUsername,
      token: accessToken,
      walletAddress: address,
    };
    console.log(formData)
  
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
      try{
        await writeContract({
                    abi: abi,
                    address: contract_address,
                    functionName: 'safeMint',
                    args: [address,3,"Company",accessToken]
      })
      console.log("object")
      }
      catch(error){
        console.log(error)
      }
  };

  const getAccessToken =  async() =>{
        try{
          const data = await readContract({
            abi: abi,
            address: contract_address,
            functionName: 'getGitHubAccessToken',
            args: [address],
          })
          console.log(data)
          return data;
        }
        catch(error){
          console.log(address)
          console.log(error)
        }
    }

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const onSubmitProject = async () => {
    const formData = {
      name: projectName,
      description: projectDescription,
      token: await getAccessToken(),
    };
    console.log(formData)

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(formData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    try {
      const response = await fetch("http://10.0.1.160:3000/createRepo", requestOptions);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log('error', error);
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
            <div className="project-tokens">
                <label for="project-tokens">Project Tokens</label>
                <input type="text" id="input" name="project-tokens" />
            </div>
            </form>
            <button className="submit-button" type="button" onClick={onSubmitProject}>
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