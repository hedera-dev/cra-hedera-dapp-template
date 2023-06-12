import { Button, Dialog, Stack } from "@mui/material";
import { connectToBladeWallet } from "../services/wallets/blade/bladeClient";
import { hashConnect } from "../services/wallets/hashconnect/hashconnectClient";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";


interface WalletSelectionDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

export const WalletSelectionDialog = (props: WalletSelectionDialogProps) => {
  const { onClose, open } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <Stack p={2} gap={1}>
        <Button
          variant="contained"
          onClick={() => {
            hashConnect.connectToLocalWallet();
          }}
        >
          HashPack
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            connectToBladeWallet();
          }}
        >
          Blade
        </Button>
        <Button
          variant="contained"
          onClick={() => { 
            connectToMetamask(); 
          }}
        >
          Metamask
        </Button>
      </Stack>
    </Dialog>
  );
}
