//SPDX-License-Identifier: MIT

pragma solidity >=0.7.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract DAO is ERC20, ERC20Burnable, ERC20Permit {
    //uint public ISSUE_TOKEN_ALLOCATION;
    constructor() ERC20("Krishna", "JSK") ERC20Permit("Krishna") {
        // The Ownable constructor does not require arguments and will set the deployer as the initial owner.
    }

    function mint(address to, uint amount) public  {
        _mint(to, amount);
    }


    uint daoCounter;
    uint issueCounter;
    uint voteCounter;
    uint maintainerCounter;
    uint voteTokenCounter;
    struct daoStruct {
        uint id;
        address Organizer;
        string name;
        bool closed;
    }
    struct issueStruct {
        uint id;
        uint daoID;
        string name;
        string description;
        uint votes;
        uint status; // 0: Open, 1: In Progress, 2: Resolved, 3: Closed
        address contributor;
        uint weight; //0 : high , 1: medium , 2 : low
    }
    struct DaoSupplyInfo {
        uint totalSupply;
        uint initialAllocation;
        uint maintainerAllocation;
        uint tokenReward;
        uint remainingSupply; // The remaining tokens that are unallocated within the DAO
    }
    struct maintainerStruct {
        uint256 daoID;
        address maintainer;
    }
    struct voteStruct {
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
    mapping(uint256 => daoStruct) public daos;
    mapping(uint256 => issueStruct) public issues;
    mapping(uint256 => maintainerStruct) public maintainers;
    mapping(uint256 => voteStruct) public votes;
    mapping(uint256 => commentStruct) public comments;
    mapping(uint256 => Nomination[]) public nominations;
    mapping(address => uint256) public tokensAssignedToDAO;
    mapping(address => uint256) public tokensAssignedToMaintainer;
    mapping(uint => DaoSupplyInfo) public daoSupplies; // Each DAO will have its own supply information
    mapping (address => uint[] ) public daoMaintainers;

    // The createDAO function now accepts a totalSupply parameter
    function createDAO(string memory githubUserName, uint totalSupply) public returns (uint) {
        require(totalSupply > 0, "Total supply must be greater than zero");

        daoCounter++;
        daos[daoCounter] = daoStruct(
            daoCounter,
            msg.sender,
            githubUserName,
            false
        );

        // Define the initial allocation based on the total supply
        uint initialAllocation = totalSupply / 2;
        uint maintainerAllocation = totalSupply / 10;
        uint tokenReward = totalSupply / 25;

        daoSupplies[daoCounter] = DaoSupplyInfo({
            totalSupply: totalSupply,
            initialAllocation: initialAllocation,
            maintainerAllocation: maintainerAllocation,
            tokenReward: tokenReward,
            remainingSupply: totalSupply - initialAllocation // Reserve the initial allocation for the DAO
        });

        _mint(msg.sender, initialAllocation); // Mint only the initial allocation to the DAO creator
        return daoCounter;
    }
    function getsupply(uint daoID) public view returns (uint){
        return daoSupplies[daoID].remainingSupply;
    }

    function joinDAO(uint daoID, address maintainer) public {
        require(daos[daoID].Organizer == msg.sender, "Only organizer can add the maintainer");

        DaoSupplyInfo storage supplyInfo = daoSupplies[daoID];
        require(supplyInfo.remainingSupply >= supplyInfo.maintainerAllocation, "Not enough tokens in DAO supply");

        maintainerCounter++;
        maintainers[maintainerCounter] = maintainerStruct(daoID, maintainer);
        _transfer(msg.sender, maintainer, supplyInfo.maintainerAllocation);
        daoMaintainers[maintainer].push(daoID);

        supplyInfo.remainingSupply = supplyInfo.remainingSupply - supplyInfo.maintainerAllocation;
}

    function getDAO() public view returns (daoStruct[] memory) {
        daoStruct[] memory allDAO = new daoStruct[](daoCounter);
        for (uint i = 1; i <= daoCounter; i++) {
            allDAO[i - 1] = daos[i];
        }
        return allDAO;
    }
    function getDAObyMaintainer(address maintainer) public view returns (daoStruct[] memory) {
        // Retrieve a list of all DAO IDs that the maintainer is part of
        uint[] memory maintainerDAOIds = daoMaintainers[maintainer];

        // Prepare an array to hold the resulting daoStructs
        daoStruct[] memory maintainerDAOs = new daoStruct[](maintainerDAOIds.length);

        // Iterate over the DAO IDs and fetch the corresponding daoStructs
        for (uint i = 0; i < maintainerDAOIds.length; i++) {
            uint daoID = maintainerDAOIds[i];
            maintainerDAOs[i] = daos[daoID];
        }

        return maintainerDAOs;
    }

    function createIssue(
        uint daoID,
        string memory name,
        string memory description,
        uint weight
    ) public returns (uint) {
        require(
            isMaintainer(daoID, msg.sender),
            "Only maintainers can create issues"
        );
        issueCounter++;
        issues[issueCounter] = issueStruct(
            issueCounter,
            daoID,
            name,
            description,
            0,
            0,
            address(0),
            weight
        );
        return issueCounter;
    }

    function updateIssueStatus(uint issueID, uint newStatus) public {
        require(newStatus >= 0 && newStatus <= 3, "Invalid issue status value");
        issues[issueID].status = newStatus;
    }

    function isMaintainer(
        uint daoID,
        address maintainer
    ) public view returns (bool) {
        for (uint i = 1; i <= maintainerCounter; i++) {
            if (
                maintainers[i].daoID == daoID &&
                maintainers[i].maintainer == maintainer
            ) {
                return true;
            }
        }
        return false;
    }

    function getIssue() public view returns (issueStruct[] memory) {
        issueStruct[] memory allIssue = new issueStruct[](issueCounter);
        for (uint i = 1; i <= daoCounter; i++) {
            allIssue[i - 1] = issues[i];
        }
        return allIssue;
    }

    function getIssueByDAO(
        uint daoID
    ) public view returns (issueStruct[] memory) {
        issueStruct[] memory allIssueByDAO = new issueStruct[](issueCounter);
        uint count = 0;
        for (uint i = 1; i <= daoCounter; i++) {
            if (issues[i].daoID == daoID) {
                allIssueByDAO[count++] = issues[i];
            }
        }
        return allIssueByDAO;
    }

    function getMaintainersByDAO(
        uint daoID
    ) public view returns (maintainerStruct[] memory) {
        uint numMaintainers = 0;
        for (uint i = 1; i <= maintainerCounter; i++) {
            if (maintainers[i].daoID == daoID) {
                numMaintainers++;
            }
        }
        maintainerStruct[] memory allMaintainersbyDAO = new maintainerStruct[](
            numMaintainers
        );
        uint256 counter = 0;
        for (uint i = 1; i <= numMaintainers; i++) {
            if (maintainers[i].daoID == daoID) {
                allMaintainersbyDAO[counter] = maintainers[i];
                counter++;
            }
        }
        return allMaintainersbyDAO;
    }

    function hasVoted(
        uint256 daoID,
        uint256 issueID,
        address maintainer
    ) public view returns (bool) {
        for (uint i = 0; i < voteCounter; i++) {
            if (
                votes[i].daoID == daoID &&
                votes[i].issueID == issueID &&
                votes[i].maintainer == maintainer
            ) {
                return true;
            }
        }
        return false;
    }


    function nominateContributor(
        uint256 issueID,
        string memory solution
    ) public {
        nominations[issueID].push(
            Nomination({
                issueID: issueID,
                nominee: msg.sender,
                solution: solution,
                votes: 0
            })
        );
    }

    function voteOnNomination(uint256 issueID, address nominee) public {
        uint256 daoID = issues[issueID].daoID;
        require(
            isMaintainer(daoID, msg.sender),
            "Only maintainers can vote on nominations"
        );
        require(
            !hasVoted(daoID, issueID, msg.sender),
            "Maintainer has already voted on this issue"
        );

        uint256 votingPower = balanceOf(msg.sender);
        require(votingPower > 0, "Maintainer must have tokens to vote");

        bool nomineeFound = false;
        for (uint i = 0; i < nominations[issueID].length; i++) {
            if (nominations[issueID][i].nominee == nominee) {
                Nomination memory nomineeToUpdate = nominations[issueID][i];
                nomineeToUpdate.votes = nomineeToUpdate.votes + votingPower;
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
        address winningNominee = nominations[issueID][0].nominee;
        for (uint i = 0; i < nominations[issueID].length; i++) {
            if (nominations[issueID][i].votes > maxVotes) {
                winningNominee = nominations[issueID][i].nominee;
                maxVotes = nominations[issueID][i].votes;
            }
        }
        require(
            winningNominee != address(0),
            "No winner found for issue assignment"
        );
        issues[issueID].status = 1;
        issues[issueID].contributor = winningNominee;
        issues[issueID].votes = maxVotes;
    }

    function rewardContributor(uint256 issueID) public  {
        require(
            issues[issueID].status == 2,
            "Issue must be marked as resolved before rewarding."
        );
        uint daoid = issues[issueID].daoID;
        uint reward = (issues[issueID].weight + 1) * daoSupplies[daoid].tokenReward;
        address contributor = issues[issueID].contributor;
        require(
            contributor != address(0),
            "No contributor assigned to the issue."
        );
        require(
            daoSupplies[daoid].remainingSupply >= reward,
            "Insufficient tokens to reward."
        );

        _transfer(daos[daoid].Organizer, contributor, reward);
    }
}