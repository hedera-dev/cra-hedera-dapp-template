import { ReactNode } from "react"
import { BladeContextProvider } from "../../contexts/BladeContext"
import { HashconnectContextProvider } from "../../contexts/HashconnectContext"
import { MetamaskContextProvider } from "../../contexts/MetamaskContext"
import { BladeClient } from "./blade/bladeClient"
import { HashConnectClient } from "./hashconnect/hashconnectClient"
import { MetaMaskClient } from "./metamask/metamaskClient"

export const AllWalletsProvider = (props: {
  children: ReactNode | undefined
}) => {
  return (
    <BladeContextProvider>
      <MetamaskContextProvider>
        <HashconnectContextProvider>
          <HashConnectClient />
          <BladeClient />
          <MetaMaskClient />
          {props.children}
        </HashconnectContextProvider>
      </MetamaskContextProvider>
    </BladeContextProvider>
  )
}
