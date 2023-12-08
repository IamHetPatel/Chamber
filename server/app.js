const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const axios = require('axios')
const mongoose = require('mongoose')


const functions = require('./functions')

const PORT = 3000
const app = express()



// middlewares
app.use(bodyParser.json());
app.use(cors())

const connect = () => {
  mongoose.set('strictQuery', true)
  mongoose.connect('mongodb+srv://dharmikjethva4:ethindia@cluster0.39au37z.mongodb.net/?retryWrites=true&w=majority')
      .then(() => {
          console.log("Connected to database");
      })
      .catch((err) => {
          console.log("[!ERROR]")
          console.log(err);
          throw new Error
      })
}

app.get('/', (req, res) => {
    console.log(req.headers);
    res.status(200).send("hello")
})

app.post('/createCompany', async(req, res) => {
    // console.log(req.body);
    const {name, token, walletAddress} = req.body;
    const response = await functions.createCompany(name, token, walletAddress)
    // console.log(response);

    res.status(200).send({response : response})


})


app.post('/createRepo', (req, res) => {
    const {name, description, walletAddress} = req.body;
    const response = functions.createRepo(name, description, walletAddress)
    res.status(200).send({response})

})

app.post('/createIssue', async(req, res) => {
    console.log(req.body);
    const {owner, repo, title, body,token} = req.body;
    const response = await functions.createIssue(owner, repo, title, body,token)
    console.log(response);

    res.status(200).send(response)

})



app.post('/getOpenIssue', async(req, res) => {
  const {owner, repo,token} = req.body;
  const response = await functions.getIssues(owner, repo,token)
  

  res.status(200).send(response)

})




app.post('/addCollaborator', async(req, res) => {
    const {owner, repo,assignee, token} = req.body;
    const response = await functions.addCollaborator(owner, repo, assignee, token)
    res.status(200).send(response)

})

app.post('/addAssignee', async(req, res) => {
    const {owner, repo, issue_number,assignee, token} = req.body;
    const response = await functions.assignIssues(owner, repo, issue_number,assignee, token)
    res.status(200).send(response)

})

app.post('/api/check_pr_merged', async (req, res) => {
    const { token, issue_number, owner, repo } = req.body;
  
    if (!token || !issue_number || !owner || !repo) {
      return res.status(400).send({
        message: 'Missing required parameters',
      });
    }
  
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    //   console.log(JSON.parse(response.pull_request));
      const pullRequestUrl = response.pull_request.url;
  
      const pullRequestResponse = await axios.get(pullRequestUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const merged = pullRequestResponse.data.merged;
  
      res.status(200).send({
        merged,
        message: merged
          ? 'Pull request is merged'
          : 'Pull request is not merged',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: 'Error checking pull request status',
      });
    }
  });

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
    connect()
})

