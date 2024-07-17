// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";




contract DTwitter {
    struct User {
        address wallet;
        string name;
        string username;
        string bio;
        string avatar;
    }

    struct Dweet {
        address author;
        string content;
        uint timestamp;
        uint likes;
    }

    mapping(address => string) public usernames;
    mapping(string => User) public users;
        address[] private allAccounts;
    Dweet[] public dweets;

    function signup(string memory _name, string memory _username, string memory _bio, string memory _avatar) public
    {
        require(bytes(usernames[msg.sender]).length == 0, "user already exists");
        require(users[_username].wallet == address(0), "username is taken, try another one.");
    
        users[_username] = User({
            wallet: msg.sender,
            name: _name,
            username: _username,
            bio: _bio,
            avatar: _avatar
        });
        usernames[msg.sender] = _username;
        allAccounts.push(msg.sender); // Add the user's address to allAccounts array

    }
    function getUser(address _wallet) public view returns(User memory){
        return users[usernames[_wallet]];
    }
    function deleteAllAccounts() external {
        for (uint256 i = 0; i < allAccounts.length; i++) {
            delete users[usernames[allAccounts[i]]];
            delete usernames[allAccounts[i]];
        }
        delete allAccounts;
    }

    function postTweet(string memory _content ) public {
        require(bytes(usernames[msg.sender]).length > 0, "You must signup to post a tweet");
        require(bytes(_content).length > 0, "You must write something to post a dweet.");
        require(bytes(_content).length <= 140, "Your dweet is too long");
        
        Dweet memory dweet = Dweet({
            author: msg.sender,
            content: _content,
            timestamp: block.timestamp,
            likes: 0
        });

        dweets.push(dweet);
    }

    function getTweet() public view returns(Dweet[] memory){
        return dweets;
    }
}