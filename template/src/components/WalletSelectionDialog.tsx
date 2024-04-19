import { Button, Dialog, Stack } from "@mui/material";
import { connectToMetamask } from "../services/wallets/metamask/metamaskClient";
import { openWalletConnectModal } from "../services/wallets/walletconnect/walletConnectClient";
import MetamaskLogo from "../assets/metamask-logo.svg";
import WalletConnectLogo from "../assets/walletconnect-logo.svg";


interface WalletSelectionDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onClose: (value: string) => void;
}

export const WalletSelectionDialog = (props: WalletSelectionDialogProps) => {
  const { onClose, open, setOpen } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <Stack p={2} gap={1}>
        <Button
          variant="contained"
          onClick={() => {
            openWalletConnectModal()
            setOpen(false);
          }}
        >
          <img
            src={WalletConnectLogo}
            alt='walletconnect logo'
            className='walletLogoImage'
            style={{
              marginLeft: '-6px'
            }}
          />
          WalletConnect
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
