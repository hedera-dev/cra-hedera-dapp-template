import { useContext } from "react"
import { BladeContext } from "../../contexts/BladeContext"
import { HashconnectContext } from "../../contexts/HashconnectContext";
import { MetamaskContext } from "../../contexts/MetamaskContext";
import { bladeWallet } from "./blade/bladeClient";
import { hashConnectWallet } from "./hashconnect/hashconnectClient";
import { metamaskWallet } from "./metamask/metamaskClient";

// Purpose: This hook is used to determine which wallet interface to use
// Example: const { accountId, walletInterface } = useWalletInterface();
// Returns: { accountId: string | null, walletInterface: WalletInterface | null }
export const useWalletInterface = () => {
  const hashconnectCtx = useContext(HashconnectContext);
  const bladeCtx = useContext(BladeContext);
  const metamaskCtx = useContext(MetamaskContext);

  if (hashconnectCtx.accountId) {
    return {
      accountId: hashconnectCtx.accountId,
      walletInterface: hashConnectWallet
    };
  } else if (bladeCtx.accountId) {
    return {
      accountId: bladeCtx.accountId,
      walletInterface: bladeWallet

    };
  } else if (metamaskCtx.metamaskAccountAddress) {
    return {
      accountId: metamaskCtx.metamaskAccountAddress,
      walletInterface: metamaskWallet
    };
  } else {
    return {
      accountId: null,
      walletInterface: null
    };
  }
}