import { ContractId, AccountId } from "@hashgraph/sdk";
import { TokenId } from "@hashgraph/sdk/lib/transaction/TransactionRecord";
import { ethers } from "ethers";
import { useContext, useEffect } from "react";
import { MetamaskContext } from "../../../contexts/MetamaskContext";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { WalletInterface } from "../walletInterface";
// NOTE: uses the v6 of ethers.js
export const switchToHederaNetwork = async (ethereum: any) => {
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x128' }] // chainId must be in hexadecimal numbers
    });
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainName: 'Hedera Testnet',
              chainId: '0x128',
              nativeCurrency: {
                name: 'HBAR',
                symbol: 'HBAR',
                decimals: 18
              },
              rpcUrls: ['https://testnet.hashio.io/api']
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
}

const { ethereum } = window as any;
const provider = new ethers.BrowserProvider(ethereum);


// returns a list of accounts
// otherwise empty array
export const connectToMetamask = async () => {
  if (!ethereum) {
    throw new Error("Metamask is not installed! Go install the extension!");
  }

  // keep track of accounts returned
  let accounts: string[] = []

  await switchToHederaNetwork(ethereum);
  accounts = await provider.send("eth_requestAccounts", []);
  return accounts;
}

class MetaMaskWallet implements WalletInterface {

  // Purpose: Transfer HBAR
  // Returns: Promise<string>
  // Note: As of May 2023, on testnet mirror node we cannot query for a transction using the transaction hash 
  // thats why we return a string instead of a TransactionId
  async transferHBAR(toAddress: AccountId | string, amount: number) {
    const signer = await provider.getSigner();
    //const txCount = await provider.getTransactionCount(from);
    // build the transaction
    const tx = await signer.populateTransaction({
      to: toAddress.toString(),
      value: ethers.parseEther(amount.toString()),
    });

    // send the transaction
    const { hash } = await signer.sendTransaction(tx);
    await provider.waitForTransaction(hash);

    return hash;
  }

  async transferToken(toAddress: AccountId | string, tokenId: TokenId, amount: number) {
    const hash = await this.executeContractCall(
      ContractId.fromString(tokenId.toString()),
      'transfer',
      new ContractFunctionParameterBuilder()
        .addParam({
          type: "address",
          name: "recipient",
          value: toAddress.toString()
        })
        .addParam({
          type: "uint256",
          name: "amount",
          value: amount
        }),
      -1 // gas limit is unused for metamask contract calls
    );

    return hash;
  }

  async associateToken(tokenId: TokenId) {
    // send the transaction
    const hash = await this.executeContractCall(
      ContractId.fromString(tokenId.toString()),
      'associate',
      new ContractFunctionParameterBuilder(),
      -1 // gas limit is unused for metamask contract calls
    );

    return hash;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractCall(contractId: ContractId, functionName: string, functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    const signer = await provider.getSigner();
    const abi = [
      `function ${functionName}(${functionParameters.buildAbiFunctionParams()})`
    ];

    // create contract instance for the contract id
    // to call the function, use contract[functionName](functionParameters)
    const contract = new ethers.Contract(`0x${contractId.toSolidityAddress()}`, abi, signer);
    const txResult = await contract[functionName](...functionParameters.buildEthersParams());

    return txResult.hash;
  }
  disconnect() {
    alert("Please disconnect using the Metamask extension.")
  }
};

export const metamaskWallet = new MetaMaskWallet();

export const MetaMaskClient = () => {
  const { setMetamaskAccountAddress } = useContext(MetamaskContext);
  useEffect(() => {
    // set the account address if already connected
    provider.listAccounts().then((signers) => {
      if (signers.length !== 0) {
        setMetamaskAccountAddress(signers[0].address);
      } else {
        setMetamaskAccountAddress("");
      }
    });

    // listen for account changes and update the account address
    ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length !== 0) {
        setMetamaskAccountAddress(accounts[0]);
      } else {
        setMetamaskAccountAddress("");
      }
    });

    // cleanup by removing listeners
    return () => {
      ethereum.removeAllListeners("accountsChanged");
    }
  }, [setMetamaskAccountAddress]);

  return null;
}

