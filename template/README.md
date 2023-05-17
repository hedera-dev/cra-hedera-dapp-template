Hedera DApp Starter Template using Create React App, Material UI and Typescript with HashPack, Blade, and MetaMask wallet support.

### How to use
```npx create-react-app <app-name> --template hedera-dapp-template ```

> Blade requires the use of HTTPS in order to pair wallets. An `.env` file exists in your root directory with `HTTPS=true` in order to connect to blade.

## Examples
### Transfer HBAR
```tsx
<Stack
  direction='row'
  gap={2}
  alignItems='center'
>
  <Typography>
    Transfer
  </Typography>
  <TextField
    type='number'
    label='amount'
    value={amount}
    onChange={(e) => setAmount(parseInt(e.target.value))}
    sx={{
      maxWidth: '100px'
    }} />
  <Typography>
    HBAR
    to
  </Typography>
  <TextField
    value={toAccountId}
    onChange={(e) => setToAccountId(e.target.value)}
    label='account id or evm address'
  />
  <Button
    variant='contained'
    onClick={async () => {
      const txId = await walletInterface.transferHBAR(toAccountId, amount);
    }}
  >
    <SendIcon />
  </Button>
</Stack>
```
### Transfer a Fungible/ERC20 Token

```tsx
<Button
  variant='contained'
  onClick={async () => {
    const txId = await walletInterface.transferToken(toAccountId, TokenId.fromString(tokenId), amount);
  }}
>
  Transfer Token
</Button>

<Button
  variant='contained'
  onClick={async () => {
    const txId = await walletInterface.associateToken(TokenId.fromString(tokenId));
  }}
>
  Associate Token
</Button>
```
### Executing Two Contract Calls

```tsx
<Button
  variant='contained'
  onClick={async () => {
    const txId = await walletInterface.executeContractCall(ContractId.fromString(contractId), "createTodo", new ContractFunctionParameterBuilder().addParam({ type: "string", name: "todoName", value: "Testing Totoro" }), 5000000);
  }}
>
  Execute Contract Call
</Button>
<Button
  variant='contained'
  onClick={async () => {
    const txId = await walletInterface.executeContractCall(ContractId.fromString(contractId), "getTodoById", new ContractFunctionParameterBuilder().addParam({ type: "uint256", name: "todoId", value: 1 }), 5000000);
  }}
>
  Execute Contract Call 2
</Button>
```
