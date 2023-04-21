// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

contract Authentication {
    uint256 public nbOfUsers;

    struct User {
        string signatureHash;
        address userAddress;
    }
struct CourseDetails {
        uint256 id;
        string class;
        string subject;
    }
    
    //create struct type array to store values
    CourseDetails[] public courseDetails;
    uint256 nextId = 1;

    function find(uint256 _id) public view returns (uint256) {
        for (uint256 i; i < courseDetails.length; i++) {
            if (courseDetails[i].id == _id) return i;
        }
        revert("course does not exist.");
    }

    function insertCourse(
        string memory _class,
        string memory _subject
        // string memory _company
    ) public {
        courseDetails.push(CourseDetails(nextId, _class, _subject));
        nextId++;
    }

     function getCourseIds() public view returns (uint[] memory) {
        uint[] memory result = new uint[](courseDetails.length);
        for (uint i = 0; i < courseDetails.length; i++) {
            result[i] = courseDetails[i].id;
        }
        return result;
    }

    function readCourseById(uint256 _id)
        public
        view
        returns (uint256, string memory, string memory)
    {
        uint256 i = find(_id);
        return (
            courseDetails[i].id,
            courseDetails[i].class,
            courseDetails[i].subject
        );
    }

    function updateCourseById(
        uint256 _id,
        string memory _class,
        string memory _subject
    ) public {
        uint256 i = find(_id);
        courseDetails[i].class = _class;
        courseDetails[i].subject = _subject;
      
    }

    function DeleteCourseById(uint256 _id) public returns (uint256) {
        uint256 i = find(_id);
        delete courseDetails[i];
    }
    mapping(address => User) private user;

    constructor() {
        nbOfUsers = 0;
    }

    function register(string memory _signature) public {
        require(
            user[msg.sender].userAddress ==
                address(0x0000000000000000000000000000000000000000),
            "already registered"
        );

        user[msg.sender].signatureHash = _signature;
        user[msg.sender].userAddress = msg.sender;
        nbOfUsers++;
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == user[msg.sender].userAddress, "Not allowed");

        return user[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].userAddress;
    }
}
