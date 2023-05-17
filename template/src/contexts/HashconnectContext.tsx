import { createContext, useState, ReactNode } from "react";

const defaultValue = {
  accountId: '',
  setAccountId: (newValue: string) => { },
  isConnected: false,
  setIsConnected: (newValue: boolean) => { },
}

export const HashconnectContext = createContext(defaultValue);

export const HashconnectContextProvider = (props: { children: ReactNode | undefined }) => {
  const [accountId, setAccountId] = useState(defaultValue.accountId);
  const [isConnected, setIsConnected] = useState(defaultValue.isConnected);

  return (
    <HashconnectContext.Provider
      value={{
        accountId,
        setAccountId,
        isConnected,
        setIsConnected
      }}
    >
      {props.children}
    </HashconnectContext.Provider>
  )
}
