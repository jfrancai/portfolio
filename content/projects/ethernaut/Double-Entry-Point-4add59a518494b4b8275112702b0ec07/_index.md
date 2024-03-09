---
title: "Double-Entry-Point"
date: "2024-03-09"
lastmod: "2024-03-09T20:18:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Motorbike-398e954682a44e3fb7240d3a1a9368bf"
weight: 27
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/26"
next: "Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "4add59a5-1849-4b4b-8275-112702b0ec07"
  created_time: "2024-02-25T10:52:00.000Z"
  last_edited_time: "2024-03-09T20:18:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel26.svg"
  parent:
    type: "database_id"
    database_id: "cb6853ff-d731-4d6a-9080-6c8efeec5b1c"
  archived: false
  properties:
    difficulty:
      id: "IAjo"
      type: "select"
      select:
        id: "2fa50c76-9c63-4f19-b03a-b8fb1889da7c"
        name: "⭐⭐"
        color: "blue"
    prev:
      id: "LLP%5C"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Motorbike-398e954682a44e3fb7240d3a1a9368bf"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Motorbike-398e954682a44e3fb7240d3a1a9368bf"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date:
        start: "2024-03-09"
        end: null
        time_zone: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 27
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
      url: "https://ethernaut.openzeppelin.com/level/26"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Good-Samaritan-6e915bab63034c2eb529ae24083e3523"
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
            content: "Double-Entry-Point"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Double-Entry-Point"
          href: null
  url: "https://www.notion.so/Double-Entry-Point-4add59a518494b4b8275112702b0ec07"
  public_url: null
UPDATE_TIME: "2024-03-09T20:19:29.706Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


This level features a `CryptoVault` with special functionality, the `sweepToken` function. This is a common function used to retrieve tokens stuck in a contract. The `CryptoVault` operates with an `underlying` token that can't be swept, as it is an important core logic component of the `CryptoVault`. Any other tokens can be swept.


The underlying token is an instance of the DET token implemented in the `DoubleEntryPoint` contract definition and the `CryptoVault` holds 100 units of it. Additionally the `CryptoVault` also holds 100 of `LegacyToken LGT`.


In this level you should figure out where the bug is in `CryptoVault` and protect it from being drained out of tokens.


The contract features a `Forta` contract where any user can register its own `detection bot`
 contract. Forta is a decentralized, community-based monitoring network 
to detect threats and anomalies on DeFi, NFT, governance, bridges and 
other Web3 systems as quickly as possible. Your job is to implement a `detection bot` and register it in the `Forta` contract. The bot's implementation will need to raise correct alerts to prevent potential attacks or bug exploits.


Things that might help:

- How does a double entry point work for a token contract?

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts-08/access/Ownable.sol";
import "openzeppelin-contracts-08/token/ERC20/ERC20.sol";

interface DelegateERC20 {
  function delegateTransfer(address to, uint256 value, address origSender) external returns (bool);
}

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface IForta {
    function setDetectionBot(address detectionBotAddress) external;
    function notify(address user, bytes calldata msgData) external;
    function raiseAlert(address user) external;
}

contract Forta is IForta {
  mapping(address => IDetectionBot) public usersDetectionBots;
  mapping(address => uint256) public botRaisedAlerts;

  function setDetectionBot(address detectionBotAddress) external override {
      usersDetectionBots[msg.sender] = IDetectionBot(detectionBotAddress);
  }

  function notify(address user, bytes calldata msgData) external override {
    if(address(usersDetectionBots[user]) == address(0)) return;
    try usersDetectionBots[user].handleTransaction(user, msgData) {
        return;
    } catch {}
  }

  function raiseAlert(address user) external override {
      if(address(usersDetectionBots[user]) != msg.sender) return;
      botRaisedAlerts[msg.sender] += 1;
  }
}

contract CryptoVault {
    address public sweptTokensRecipient;
    IERC20 public underlying;

    constructor(address recipient) {
        sweptTokensRecipient = recipient;
    }

    function setUnderlying(address latestToken) public {
        require(address(underlying) == address(0), "Already set");
        underlying = IERC20(latestToken);
    }

    /*
    ...
    */

    function sweepToken(IERC20 token) public {
        require(token != underlying, "Can't transfer underlying token");
        token.transfer(sweptTokensRecipient, token.balanceOf(address(this)));
    }
}

contract LegacyToken is ERC20("LegacyToken", "LGT"), Ownable {
    DelegateERC20 public delegate;

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function delegateToNewContract(DelegateERC20 newContract) public onlyOwner {
        delegate = newContract;
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        if (address(delegate) == address(0)) {
            return super.transfer(to, value);
        } else {
            return delegate.delegateTransfer(to, value, msg.sender);
        }
    }
}

contract DoubleEntryPoint is ERC20("DoubleEntryPointToken", "DET"), DelegateERC20, Ownable {
    address public cryptoVault;
    address public player;
    address public delegatedFrom;
    Forta public forta;

    constructor(address legacyToken, address vaultAddress, address fortaAddress, address playerAddress) {
        delegatedFrom = legacyToken;
        forta = Forta(fortaAddress);
        player = playerAddress;
        cryptoVault = vaultAddress;
        _mint(cryptoVault, 100 ether);
    }

    modifier onlyDelegateFrom() {
        require(msg.sender == delegatedFrom, "Not legacy contract");
        _;
    }

    modifier fortaNotify() {
        address detectionBot = address(forta.usersDetectionBots(player));

        // Cache old number of bot alerts
        uint256 previousValue = forta.botRaisedAlerts(detectionBot);

        // Notify Forta
        forta.notify(player, msg.data);

        // Continue execution
        _;

        // Check if alarms have been raised
        if(forta.botRaisedAlerts(detectionBot) > previousValue) revert("Alert has been triggered, reverting");
    }

    function delegateTransfer(
        address to,
        uint256 value,
        address origSender
    ) public override onlyDelegateFrom fortaNotify returns (bool) {
        _transfer(origSender, to, value);
        return true;
    }
}

```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {DetectionBot,DelegateERC20,Forta,DoubleEntryPoint,CryptoVault,IERC20,LegacyToken} from '../src/26.sol';

contract POC is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_26");

        vm.startBroadcast(deployerPrivateKey);

        DoubleEntryPoint doubleEntryPoint = DoubleEntryPoint(addr);
        CryptoVault vault = CryptoVault(doubleEntryPoint.cryptoVault());
        IERC20 underlying = vault.underlying();
        Forta forta = doubleEntryPoint.forta();

        DetectionBot bot = new DetectionBot(underlying, forta);

        forta.setDetectionBot(address(bot));

        vm.stopBroadcast();

    }
}
```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "../lib/forge-std/src/console.sol";

interface IDetectionBot {
    function handleTransaction(address user, bytes calldata msgData) external;
}

interface DoubleEntryPoint {
    function cryptoVault() external returns(address);
    function player() external returns(address);
    function delegatedFrom() external returns(address);
    function forta() external returns(Forta);
}

interface IERC20 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 value) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
}

interface CryptoVault {
    function sweptTokensRecipient() external returns(address);
    function underlying() external returns(IERC20);
    function setUnderlying(address latestToken) external;
    function sweepToken(IERC20 token) external;
}

interface Forta {
    function setDetectionBot(address detectionBotAddress) external;
    function notify(address user, bytes calldata msgData) external;
    function raiseAlert(address user) external;
    function usersDetectionBots(address) external returns(IDetectionBot);
    function botRaisedAlerts(address) external returns(uint256);
}

interface DelegateERC20 {
  function delegateTransfer(address to, uint256 value, address origSender) external returns (bool);
}

interface LegacyToken is IERC20 {
    function delegate() external returns(DelegateERC20);
    function mint(address to, uint256 amount) external;
    function delegateToNewContract(DelegateERC20 newContract) external; 
    function transfer(address to, uint256 value) external returns (bool);
    function owner() external returns(address);
}

contract DetectionBot {
  IERC20 underlying;
  Forta forta;

  constructor(IERC20 _underlying, Forta _forta) {
      underlying = _underlying;
      forta = _forta;
  }

  function handleTransaction(address user, bytes calldata msgData) public {
    // The first 4 bytes on the msgData are the function signature, in order to decode the payload it is required to skip those bytes of the function signature!
    // reference: "abi.decode cannot decode msg.data" <===> https://github.com/ethereum/solidity/issues/6012
    (address to,,) = abi.decode(msgData[4:],(address,uint,address));
    if (to != address(underlying)) {
      forta.raiseAlert(user);
    }
  }
}

```


Congratulations!


This is the first experience you have with a [Forta bot](https://docs.forta.network/en/latest/).


Forta comprises a decentralized network of independent node operators
 who scan all transactions and block-by-block state changes for outlier 
transactions and threats. When an issue is detected, node operators send
 alerts to subscribers of potential risks, which enables them to take 
action.


The presented example is just for educational purpose since Forta bot
 is not modeled into smart contracts. In Forta, a bot is a code script 
to detect specific conditions or events, but when an alert is emitted it
 does not trigger automatic actions - at least not yet. In this level, 
the bot's alert effectively trigger a revert in the transaction, 
deviating from the intended Forta's bot design.


Detection bots heavily depends on contract's final implementations 
and some might be upgradeable and break bot's integrations, but to 
mitigate that you can even create a specific bot to look for contract 
upgrades and react to it. Learn how to do it [here](https://docs.forta.network/en/latest/quickstart/).


You have also passed through a recent security issue that has been uncovered during OpenZeppelin's latest [collaboration with Compound protocol](https://compound.finance/governance/proposals/76).


Having tokens that present a double entry point is a non-trivial 
pattern that might affect many protocols. This is because it is commonly
 assumed to have one contract per token. But it was not the case this 
time :) You can read the entire details of what happened [here](https://blog.openzeppelin.com/compound-tusd-integration-issue-retrospective/).

