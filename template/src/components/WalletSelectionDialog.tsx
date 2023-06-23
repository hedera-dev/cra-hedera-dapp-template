import { Button, Dialog, Stack } from "@mui/material";
import { connectToBladeWallet } from "../services/wallets/blade/bladeClient";
import { hashConnect } from "../services/wallets/hashconnect/hashconnectClient";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";
import HashPackLogo from "../assets/hashpack-logo.svg";
import MetamaskLogo from "../assets/metamask-logo.svg";


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
          <img
            src={HashPackLogo}
            alt='hashpack logo'
            className='walletLogoImage'
            style={{
              marginLeft: '-6px'
            }}
          />
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
          <img
            src={MetamaskLogo}
            alt='metamask logo'
            className='walletLogoImage'
            style={{
              padding: '4px 4px 4px 0px'
            }}
          />
          Metamask
        </Button>
      </Stack>
    </Dialog>
  );
}
