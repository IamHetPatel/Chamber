const { Octokit } = require("octokit");
const Company = require('./schema');
const Issues = require('./issueSchema')

const getIssues = async (owner, repo, token) => {
  const octokit = new Octokit({
    auth: token,
  });
  const response = await octokit.request("POST /repos/{owner}/{repo}/issues", {
    owner: owner,
    repo: repo,
  });

  const filteredIssues = response.filter(issue => issue.state === 'open');
  return filteredIssues
};

const createCompany = async(username, token, walletAddress)=>{
  const company = new Company({
    name:username,
    token:token,
    walletAddress:walletAddress
  })
  await company.save()

  return true;
}



const addCollaborator = async (owner, repo ,assignee) => {
  const userCompany = await Company.findOne({username:owner})
  const token = userCompany.token;

  try {
  const octokit = new Octokit({
    auth: token
  })
  
  await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
    owner: owner,
    repo: repo,
    username: assignee,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  return true;
} catch (error) {
  return error;
}
};

const assignIssues = async (owner, repo, issue_number,assignee, walletAddress) => {
  const userCompany = await Company.findOne({username:owner})
  const token = userCompany.token;

  const octokit = new Octokit({
    auth: token,
  });

  await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
    owner: owner,
    repo: repo,
    username: assignee,
    permission: 'pull',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  const addIssue = new Issues({
    project:repo,
    issuesId:issue_number,
    walletAddress:walletAddress
  })

  await addIssue.save()

  return await octokit.request(
    "POST /repos/{owner}/{repo}/issues/{issue_number}/assignees",
    {
      owner: owner,
      repo: repo,
      issue_number: issue_number,
      assignees: [assignee],
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );
};

const getMyIssues = async(walletAddress)=>{
  const issues = await Issues.find({walletAddress:walletAddress})
  return issues
}

const createIssue = async (owner, repo, title, body) => {
  try {
    const userCompany = await Company.findOne({username:owner})
    const token = userCompany.token;
    const octokit = new Octokit({
      auth: token,
    });

    return await octokit.request("POST /repos/{owner}/{repo}/issues", {
      owner: owner,
      repo: repo,
      title: title,
      body: body,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });
  } catch (error) {
    return error;
  }
};

const createRepo = async (name, description, token) => {
  try {
    const octokit = new Octokit({
      auth: token,
    });

    await octokit.request("POST /user/repos", {
      name: `chamber-${name}`,
      description: description,
      homepage: "https://github.com",
      private: true,
      is_template: true,
    });
    return true
  } catch (error) {
    return error;
  }
};


const checkStatus = async(token, issue_number, owner, repo)=>{
  const octokit = new Octokit({
    auth: token,
  });

  const response = await octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    owner: owner,
    repo: repo,
    issue_number: issue_number,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (response.state == 'open') {
    return false
  } else {
    return true
  }
}

module.exports = { getIssues, createIssue, createRepo, assignIssues, addCollaborator, getIssues, createCompany, getMyIssues, checkStatus };
