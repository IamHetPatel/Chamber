//SPDX-License-Identifier: MIT

pragma solidity >=0.7.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";


contract DAO is ERC20, ERC20Burnable, Ownable, ERC20Permit{
    uint public immutable TOTAL_SUPPLY ;
    uint public immutable INITIAL_DAO_TOKEN_ALLOCATION ;
    uint public immutable MAINTAINER_TOKEN_ALLOCATION ;
    //uint public ISSUE_TOKEN_ALLOCATION;
    constructor(address initialOwner)
        ERC20("Krishna", "JSK")
        Ownable(initialOwner)
        ERC20Permit("Krishna")
    {
        TOTAL_SUPPLY = 100;
        INITIAL_DAO_TOKEN_ALLOCATION = 50;
        MAINTAINER_TOKEN_ALLOCATION = 5;

        _mint(msg.sender, TOTAL_SUPPLY);
    }

    function mint(address to, uint amount) public onlyOwner {
        _mint(to, amount);
    }
    uint daoCounter;
    uint issueCounter;
    uint voteCounter;
    uint maintainerCounter;
    uint commentCounter;
    uint voteTokenCounter;
    struct daoStruct{
        uint id;
        address Organizer;
        string uri;
        bool closed;
    }
    struct issueStruct{
        uint id;
        uint daoID;
        string uri;
        uint votes;
        uint status;// 0: Open, 1: In Progress, 2: Resolved, 3: Closed
        address contributor;
        // uint token;
        // uint weight;//0 : high , 1: medium , 2 : low
    }
    struct maintainerStruct{
        uint256 daoID;
        address maintainer;
    }
    struct voteStruct{
        uint daoID;
        uint issueID;
        address maintainer;
    }
    struct commentStruct {
        uint id;
        uint issueID;
        address maintainer;
        string comment;
        string details;
    }
    struct Nomination {
        uint256 issueID;
        address nominee;
        string solution;
        uint256 votes;
    }
    mapping(uint256=>daoStruct) public daos;
    mapping(uint256=>issueStruct) public issues;
    mapping(uint256=>maintainerStruct) public maintainers;
    mapping(uint256=>voteStruct) public votes;
    mapping(uint256 => commentStruct) public comments;
    mapping(uint256 => Nomination[]) public nominations;
    mapping(address => uint256) public tokensAssignedToDAO;
    mapping(address => uint256) public tokensAssignedToMaintainer;
    mapping(address => uint256) public voteToken;

    function createDAO(string memory githubUserName) public returns(uint) {
        daoCounter++;
        daos[daoCounter]=daoStruct(daoCounter,msg.sender,githubUserName,false);
        mint(address(this), INITIAL_DAO_TOKEN_ALLOCATION);
        tokensAssignedToDAO[address(this)]+=INITIAL_DAO_TOKEN_ALLOCATION;
        return daoCounter;
    }
    function joinDAO(uint daoID, address maintainer) public {
        require(daos[daoID].Organizer==msg.sender,"Only orgainzer can add the maintainer");
        maintainerCounter++;
        maintainers[maintainerCounter]= maintainerStruct(daoID,maintainer);
        _transfer(address(this),maintainer,MAINTAINER_TOKEN_ALLOCATION);
        tokensAssignedToDAO[address(this)]-=MAINTAINER_TOKEN_ALLOCATION;
        tokensAssignedToMaintainer[address(this)]+=MAINTAINER_TOKEN_ALLOCATION;
    }
    function getDAO() public view returns(daoStruct[] memory){
        daoStruct[] memory allDAO = new daoStruct[](daoCounter);
        for(uint i=1;i<=daoCounter;i++){
            allDAO[i-1]=daos[i];
        }
        return allDAO;
    }
    function createIssue(uint daoID, string memory uri) public returns (uint) {
        require(isMaintainer(daoID, msg.sender), "Only maintainers can create issues");
        issueCounter++;
        issues[issueCounter] = issueStruct(issueCounter, daoID, uri, 0,0,address(0));
        return issueCounter;
    }
    //  function voteOnToken_weight(uint256 issueID,uint weight) public {
    //     uint256 daoID = issues[issueID].daoID;
    //     require(isMaintainer(daoID, msg.sender), "Only maintainers can vote on nominations");
    //     require(!hasVoted(daoID, issueID, msg.sender), "Maintainer has already voted on this issue");

    //     uint256 votingPower = balanceOf(msg.sender);
    //     require(votingPower > 0, "Maintainer must have tokens to vote");
    //     voteTokenCounter++;
    //     voteToken[msg.sender]=weight;
    // }
    //  function assignToken(uint256 issueID) public {
    //     uint256 maxVotes = 0;
    //     uint winningWeight = -1;
    //     for (uint i = 0; i < voteToken.length; i++) {
    //         if () {
    //             winningNominee = nominations[issueID][i].nominee;
    //             maxVotes = nominations[issueID][i].votes;
    //         }
    //     }
    //     require(winningNominee != address(0), "No winner found for issue assignment");
    //     issues[issueID].status = 1;
    //     issues[issueID].contributor = winningNominee;
    //     issues[issueID].votes = maxVotes;
    // }
    function updateIssueStatus(uint issueID, uint newStatus) public {
        require(newStatus >= 0 && newStatus <= 3, "Invalid issue status value");
        issues[issueID].status = newStatus;
    }
    function isMaintainer(uint daoID, address maintainer) public view returns (bool) {
        for (uint i = 1; i <= maintainerCounter; i++) {
            if (maintainers[i].daoID == daoID && maintainers[i].maintainer == maintainer) {
                return true;
            }
        }
        return false;
    }
    function getIssue() public view returns(issueStruct[] memory){
        issueStruct[] memory allIssue = new issueStruct[](issueCounter);
        for(uint i=1;i<=daoCounter;i++){
            allIssue[i-1]=issues[i];
        }
        return allIssue;
    }
    function getIssueByDAO(uint daoID) public view returns(issueStruct[] memory){
        issueStruct[] memory allIssueByDAO = new issueStruct[](issueCounter);
        uint count = 0;
        for(uint i=1;i<=daoCounter;i++){
            if(issues[i].daoID == daoID){
                allIssueByDAO[count++]=issues[i];
            }
        }
        return allIssueByDAO;
    }
    function getMaintainersByDAO(uint daoID) public view returns(maintainerStruct[] memory){
        uint numMaintainers = 0;
        for (uint i = 1; i <= maintainerCounter; i++) {
            if (maintainers[i].daoID == daoID) {
                numMaintainers++;
            }
        }
        maintainerStruct[] memory allMaintainersbyDAO = new maintainerStruct[](numMaintainers);
        uint256 counter=0;
        for (uint i = 1; i <= numMaintainers; i++) {
            if (maintainers[i].daoID == daoID) {
                allMaintainersbyDAO[counter] = maintainers[i];
                counter++;
            }
        }
        return allMaintainersbyDAO;
    }
    function hasVoted(uint256 daoID, uint256 issueID, address maintainer) public view returns(bool){
            for(uint i=0;i<voteCounter;i++){
                if(votes[i].daoID ==daoID && votes[i].issueID==issueID && votes[i].maintainer==maintainer){
                    return true;
                }
            }
            return false;
    }
    function addCommentToIssue(uint issueID, string memory comment, string memory details) public returns (uint) {
        require(isMaintainer(issues[issueID].daoID, msg.sender), "Only maintainers can add comments to issues");
        commentCounter++;
        comments[commentCounter] = commentStruct(commentCounter, issueID, msg.sender, comment, details);
        return commentCounter;
    }
    function getCommentsByIssue(uint issueID) public view returns (commentStruct[] memory) {
        uint numComments = 0;
        for (uint i = 1; i <= commentCounter; i++) {
            if (comments[i].issueID == issueID) {
                numComments++;
            }
        }

        commentStruct[] memory issueComments = new commentStruct[](numComments);
        uint counter = 0;
        for (uint i = 1; i <= commentCounter; i++) {
            if (comments[i].issueID == issueID) {
                issueComments[counter] = comments[i];
                counter++;
            }
        }

        return issueComments;
    }
    function nominateContributor(uint256 issueID, address nominee,string memory solution) public {
        nominations[issueID].push(Nomination({issueID: issueID, nominee: nominee,solution:solution, votes: 0}));
    }
    function voteOnNomination(uint256 issueID, address nominee) public {
        uint256 daoID = issues[issueID].daoID;
        require(isMaintainer(daoID, msg.sender), "Only maintainers can vote on nominations");
        require(!hasVoted(daoID, issueID, msg.sender), "Maintainer has already voted on this issue");

        uint256 votingPower = balanceOf(msg.sender);
        require(votingPower > 0, "Maintainer must have tokens to vote");

        bool nomineeFound = false;
        for (uint i = 0; i < nominations[issueID].length; i++) {
            if (nominations[issueID][i].nominee == nominee) {
                Nomination memory nomineeToUpdate = nominations[issueID][i];
                nomineeToUpdate.votes += votingPower;
                nominations[issueID][i] = nomineeToUpdate; // Update the array with the modified struct
                nomineeFound = true;
                break;
            }
        }
        require(nomineeFound, "Nominee not found");

        voteCounter++;
        votes[voteCounter] = voteStruct(daoID, issueID, msg.sender);
    }
     function assignIssue(uint256 issueID) public {
        require(issues[issueID].status == 0, "Issue is not open");
        uint256 maxVotes = 0;
        address winningNominee = address(0);
        for (uint i = 0; i < nominations[issueID].length; i++) {
            if (nominations[issueID][i].votes > maxVotes) {
                winningNominee = nominations[issueID][i].nominee;
                maxVotes = nominations[issueID][i].votes;
            }
        }
        require(winningNominee != address(0), "No winner found for issue assignment");
        issues[issueID].status = 1;
        issues[issueID].contributor = winningNominee;
        issues[issueID].votes = maxVotes;
    }
} 