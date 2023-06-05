import { BladeSigner, HederaNetwork } from "@bladelabs/blade-web3.js";
import { AccountId, ContractExecuteTransaction, ContractId, TokenAssociateTransaction, TokenId, TransferTransaction } from "@hashgraph/sdk";
import { useCallback, useContext, useEffect, useState } from "react";
import { BladeContext } from "../../../contexts/BladeContext";
import { ContractFunctionParameterBuilder } from "../contractFunctionParameterBuilder";
import { WalletInterface } from "../walletInterface";

const env = HederaNetwork.Testnet;
const bladeLocalStorage = "usedBladeForWalletPairing";

const appMetadata = {
  network: env,
  dAppCode: "hederaCraTemplate",
};
export const bladeSigner = new BladeSigner();

class BladeWallet implements WalletInterface {
  async transferHBAR(toAddress: AccountId, amount: number) {
    const transferHBARTransaction = await new TransferTransaction()
      .addHbarTransfer(bladeSigner.getAccountId().toString(), -amount)
      .addHbarTransfer(toAddress, amount)
      .freezeWithSigner(bladeSigner);

    const txResult = await transferHBARTransaction.executeWithSigner(bladeSigner);
    return txResult.transactionId;
  }

  async transferToken(toAddress: AccountId, tokenId: TokenId, amount: number) {
    const transferTokenTransaction = await new TransferTransaction()
      .addTokenTransfer(tokenId, bladeSigner.getAccountId().toString(), -amount)
      .addTokenTransfer(tokenId, toAddress, amount)
      .freezeWithSigner(bladeSigner);

    const txResult = await transferTokenTransaction.executeWithSigner(bladeSigner);
    return txResult.transactionId;
  }

  async associateToken(tokenId: TokenId) {
    const associateTokenTransaction = await new TokenAssociateTransaction()
      .setAccountId(bladeSigner.getAccountId().toString())
      .setTokenIds([tokenId])
      .freezeWithSigner(bladeSigner);
    
    const txResult = await associateTokenTransaction.executeWithSigner(bladeSigner);
    return txResult.transactionId;
  }

  // Purpose: build contract execute transaction and send to hashconnect for signing and execution
  // Returns: Promise<TransactionId | null>
  async executeContractFunction(contractId: ContractId, functionName: string, functionParameters: ContractFunctionParameterBuilder, gasLimit: number) {
    // Grab the topic and account to sign from the last pairing event
    const tx = new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(gasLimit)
      .setFunction(functionName, functionParameters.buildHAPIParams());

    const txFrozen = await tx.freezeWithSigner(bladeSigner);
    await txFrozen.executeWithSigner(bladeSigner);

    // in order to read the contract call results, you will need to query the contract call's results form a mirror node using the transaction id
    // after getting the contract call results, use ethers and abi.decode to decode the call_result
    return txFrozen.transactionId;
  }
  disconnect() {
    bladeSigner.killSession().then(() => {
      localStorage.removeItem(bladeLocalStorage);
    });
  };
};
export const bladeWallet = new BladeWallet();

export const connectToBladeWallet = async () => {
  try {
    // await bladeSigner.killSession(); // kill any existing session to allow pairing a new account
    await bladeSigner.createSession(appMetadata);
    localStorage.setItem(bladeLocalStorage, "true");
  } catch (error) {
    console.log(error);
  }
};

export const BladeClient = () => {
  const [usedBlade, setUsedBlade] = useState(false);

  // use the BladeContext to keep track of the hashpack account and connection
  const { setAccountId, setIsConnected } = useContext(BladeContext);

  // sync with blade state with the context so the context is aware of connected account id
  const syncWithBlade = useCallback(() => {
    try {
      const accountId = bladeSigner.getAccountId();
      if (accountId) {
        setAccountId(accountId.toString());
        setIsConnected(true);
      } else {
        setAccountId("");
        setIsConnected(false);
      }
    } catch (error) {
      console.log(error);
      setAccountId("");
      setIsConnected(false);
    };
  }, [setIsConnected, setAccountId]);

  // sync the blade state with the context
  useEffect(() => {
    if (usedBlade) {
      connectToBladeWallet().then(() => {
        syncWithBlade();
      });
    }

    bladeSigner.onAccountChanged(() => {
      syncWithBlade();
    });
  }, [syncWithBlade, usedBlade]);

  useEffect(() => {
    setUsedBlade(localStorage.getItem(bladeLocalStorage) === "true");
  }, []);

  return null;
};


