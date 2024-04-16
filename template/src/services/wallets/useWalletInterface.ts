import { useContext } from "react"
import { MetamaskContext } from "../../contexts/MetamaskContext";
import { WalletConnectContext } from "../../contexts/WalletConnectContext";
import { metamaskWallet } from "./metamask/metamaskClient";
import { walletConnectWallet } from "./walletconnect/walletConnectClient";

// Purpose: This hook is used to determine which wallet interface to use
// Example: const { accountId, walletInterface } = useWalletInterface();
// Returns: { accountId: string | null, walletInterface: WalletInterface | null }
export const useWalletInterface = () => {
  const metamaskCtx = useContext(MetamaskContext);
  const walletConnectCtx = useContext(WalletConnectContext);

  if (metamaskCtx.metamaskAccountAddress) {
    return {
      accountId: metamaskCtx.metamaskAccountAddress,
      walletInterface: metamaskWallet
    };
  } else if (walletConnectCtx.accountId) {
    return {
      accountId: walletConnectCtx.accountId,
      walletInterface: walletConnectWallet
    }
  } else {
    return {
      accountId: null,
      walletInterface: null
    };
  }
}