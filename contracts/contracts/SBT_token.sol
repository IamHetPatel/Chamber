// SPDX-License-Identifier: MIT
pragma solidity >=0.7.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract newone is ERC721, Ownable {
   uint256 private _tokenIdCounter;

   enum Role { Contributor, Trader, Investor, Company }

   mapping(address => string) public _githubUsernames;
   mapping(address => string) public _githubAccessToken;
   mapping(string => bool) public _githubUsernameTaken;
   mapping(address => bool) public _walletHasToken;
   mapping(address => Role) public _tokenRoles;

   constructor(address initialOwner) ERC721("SoulBoundToken", "SBT") Ownable(initialOwner) {}

   function safeMint(address to, Role role, string memory githubUsername , string memory accessToken) public {
       require(bytes(githubUsername).length > 0, "GitHub username cannot be empty");
       require(!_walletHasToken[to], "Wallet address already has a token");
       require(!_githubUsernameTaken[githubUsername], "GitHub username already taken");
       uint256 tokenId = _tokenIdCounter;
       _safeMint(to, tokenId);
       _tokenIdCounter += 1;

       _tokenRoles[to] = role;
       _githubUsernames[to] = githubUsername;
       _githubAccessToken[to] = accessToken;
       _walletHasToken[to] = true;
       _githubUsernameTaken[githubUsername] = true;
   }

   function getRole(address to) public view returns (Role) {
       return _tokenRoles[to];
   }

   function getGitHubUsername(address wallet) public view returns (string memory) {
       return _githubUsernames[wallet];
   }
     
    function getGitHubAccessToken(address wallet) public view returns (string memory) {
       return _githubAccessToken[wallet];
   }

   function burn(uint256 tokenId) external onlyOwner {
       address owner = ownerOf(tokenId);
       require(owner == msg.sender, "Only the owner of the token can burn it.");
       _burn(tokenId);

       // Clean up mappings after burning
       delete _tokenRoles[tokenId];
       delete _githubUsernames[owner];
       _walletHasToken[owner] = false;
   }

   function _transfer(address from, address to, uint256 tokenId) internal virtual override {
       require(from == address(0) || to == address(0), "This is a Soulbound token. It cannot be transferred. It can only be burned by the token owner.");
       super._transfer(from, to, tokenId);
   }
}

