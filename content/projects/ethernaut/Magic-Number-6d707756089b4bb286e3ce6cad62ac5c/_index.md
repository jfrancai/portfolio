---
title: "Magic Number"
date: "2024-02-24"
lastmod: "2024-02-24T21:52:00.000Z"
draft: false
difficulty: "⭐⭐⭐"
prev: "Recovery-1efddca3f4ed4053a79cb06c27873d49"
weight: 19
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/18"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "6d707756-089b-4bb2-86e3-ce6cad62ac5c"
  created_time: "2024-02-24T15:04:00.000Z"
  last_edited_time: "2024-02-24T21:52:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel18.svg"
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
            content: "Recovery-1efddca3f4ed4053a79cb06c27873d49"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Recovery-1efddca3f4ed4053a79cb06c27873d49"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-02-24"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 19
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
      url: "https://ethernaut.openzeppelin.com/level/18"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text: []
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
            content: "Magic Number"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Magic Number"
          href: null
  url: "https://www.notion.so/Magic-Number-6d707756089b4bb286e3ce6cad62ac5c"
  public_url: null
UPDATE_TIME: "2024-02-24T21:53:36.596Z"
EXPIRY_TIME: "2024-02-24T22:53:31.830Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


To solve this level, you only need to provide the Ethernaut with a `Solver`, a contract that responds to `whatIsTheMeaningOfLife()` with the right number.


Easy right?
Well... there's a catch.


The solver's code needs to be really tiny. Really reaaaaaallly tiny. 
Like freakin' really really itty-bitty tiny: 10 opcodes at most.


Hint: Perhaps its time to leave the comfort of the Solidity compiler momentarily, and build this one by hand O_o.
That's right: Raw EVM bytecode.


Good luck!


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicNum {

  address public solver;

  constructor() {}

  function setSolver(address _solver) public {
    solver = _solver;
  }

  /*
    ____________/\\\_______/\\\\\\\\\_____        
     __________/\\\\\_____/\\\///////\\\___       
      ________/\\\/\\\____\///______\//\\\__      
       ______/\\\/\/\\\______________/\\\/___     
        ____/\\\/__\/\\\___________/\\\//_____    
         __/\\\\\\\\\\\\\\\\_____/\\\//________   
          _\///////////\\\//____/\\\/___________  
           ___________\/\\\_____/\\\\\\\\\\\\\\\_ 
            ___________\///_____\///////////////__
  */
}
```


Solution:


I recommand using this playground [https://www.evm.codes/playground](https://www.evm.codes/playground?fork=shanghai) to debug what your are doing.


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

interface Solver {
  function whatIsTheMeaningOfLife() external returns(uint);
}

interface MagicNum {
  function solver() external returns(address);
  function setSolver(address _solver) external;
}

contract POC is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_18");

        vm.startBroadcast(deployerPrivateKey);

        MagicNum magicNum = MagicNum(addr);

        address deployedAddress;

        assembly {
          let ptr := mload(0x40)
          let paddedBytes := shl(mul(8, 13), 0x69602a60005260206000f3600052600a6016f3)
          mstore(ptr, paddedBytes)
          deployedAddress := create(0, ptr, 19)
        }
        magicNum.setSolver(address(deployedAddress));

        Solver(address(magicNum.solver())).whatIsTheMeaningOfLife();

        vm.stopBroadcast();

    }
}

```


There are two parts in this byte code : `0x69{602a60005260206000f3}600052600a6016f3` . The part inside the curly braces {} correspond to the part that will be deployed by the contract constructor (which is the part outside the curly braces). 


Each two digit byte corresponnd to an op code + its following parameters if expected.


So:


![](/images/9eb5d183-8dde-48d1-9909-1b262dedc2c8.png)


Then if we call the return value: 


![](/images/3a1636af-b8ee-412a-b4a6-671fd7904c8b.png)

