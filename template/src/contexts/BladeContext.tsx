import { createContext, ReactNode, useState } from "react";

const defaultValue = {
  accountId: '',
  setAccountId: (newValue: string) => { },
  isConnected: false,
  setIsConnected: (newValue: boolean) => { },
}

export const BladeContext = createContext(defaultValue)

export const BladeContextProvider = (props: { children: ReactNode | undefined }) => {
  const [accountId, setAccountId] = useState(defaultValue.accountId);
  const [isConnected, setIsConnected] = useState(defaultValue.isConnected);
  return (
    <BladeContext.Provider
      value={{
        accountId,
        setAccountId,
        isConnected,
        setIsConnected
      }}
    >
      {props.children}
    </BladeContext.Provider>
  )
}
