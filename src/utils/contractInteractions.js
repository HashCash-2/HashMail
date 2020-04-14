import { ethers } from "ethers";
import Web3 from "web3";

var HashCashContractAddr = "0xd7c5542ad8C14D4a9052edB95bdF0c7647755dbc";

const TokenABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  }
];
const HashCashContract = [
  {
    constant: true,
    inputs: [],
    name: "nextStreamId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "initialize",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "mantissa",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deposit",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "startTime",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "stopTime",
        type: "uint256"
      }
    ],
    name: "CreateStream",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "WithdrawFromStream",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "senderBalance",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "recipientBalance",
        type: "uint256"
      }
    ],
    name: "CancelStream",
    type: "event"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      }
    ],
    name: "getStream",
    outputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "stopTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "remainingBalance",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "ratePerSecond",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      }
    ],
    name: "deltaOf",
    outputs: [
      {
        internalType: "uint256",
        name: "delta",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "who",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "stopTime",
        type: "uint256"
      }
    ],
    name: "createReverseStream",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "deposit",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "stopTime",
        type: "uint256"
      }
    ],
    name: "createStream",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "withdrawFromStream",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      }
    ],
    name: "cancelStream",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "uint256",
        name: "streamId",
        type: "uint256"
      }
    ],
    name: "Close",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  }
];

async function GetHashCashContract(web3) {
  web3 = new Web3(web3.givenProvider);
  let contract = new web3.eth.Contract(TokenABI, HashCashContractAddr, {
    transactionConfirmationBlocks: 1
  });
  return contract;
}
async function GetTokenContract(web3, tokenAddress) {
  web3 = new Web3(web3.givenProvider);
  let contract = new web3.eth.Contract(TokenABI, tokenAddress, {
    transactionConfirmationBlocks: 1
  });
  return contract;
}

async function ApproveTokens(web3, account, amount, tokenAddress) {
  var userAddr = account;
  var tokenContract = await GetTokenContract(web3, tokenAddress);
  console.log(
    "balance of account",
    await tokenContract.methods.balanceOf(account).call()
  );
  try {
    await tokenContract.methods
      .approve(userAddr, ethers.utils.parseEther(amount))
      .send({ from: userAddr, gasPrice: 0 });
  } catch (e) {
    console.log("error while approving", e);
  }
  return;
}

// StartReverseStream tries to start the reverse stream
// 1. Approve the deposit amount
// 2. Start the reverse stream
// Metamask will open twice to do this
// Will always return streamID and error. Error can be null
async function StartReverseStream(web3, deposit, stopTime, tokenAddress) {
  // get hash cash contract instance
  var HashCashContract = await GethashCashContract(web3);

  try {
    // create reverse stream
    var streamID = await HashCashContract.methods.createReverseStream(
      ethers.utils.parseEther(deposit),
      tokenAddress,
      stopTime
    );
    console.log("Tx was a success", streamID);
    return streamID, null;
  } catch (e) {
    console.log("error while createing reverse stream", e);
    return 0, e;
  }
}

// Closes stream on the hash cash contract
// Will always return an error or null -> so make sure you check that
async function CloseStream(web3, streamID, burn, refund) {
  var HashCashContract = await GethashCashContract(web3);
  try {
    // create reverse stream
    var streamID = await HashCashContract.methods.close(streamID);
    return null;
  } catch (e) {
    console.log("error while closing stream", e);
    return e;
  }
}
export default ApproveTokens;
