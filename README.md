# Hedera DApp CRA Template

Hedera DApp Starter Template using Create React App, Material UI and Typescript with HashPack, Blade, Kabila, and MetaMask wallet support.

## Technologies

* Multi-wallet integration out of the box (HashPack, Blade, Kabila, & MetaMask)
* Mirror Node Client
* State management via React Context
* Material UI


## Usage

Execute the following command, replacing `<my-app-name>` with the directory name you wish to create for the new project.

```shell
npx create-react-app <my-app-name> --template git+ssh://git@github.com/hedera-dev/cra-hedera-dapp-template.git
```
1. Execute ```npm i```
2. Execute ```npm run start``` to start the project

## Contributing

- Create a fork of this repo on github
- Clone that forked copy using github
- Make your changes on a new branch
- Submit a PR against the `main` branch of this copy of the git repo

For testing during local development, execute the following command.

```shell
npx create-react-app <my-app-name> --template file:../path/to/your/template/cra-hedera-dapp-template
```

## License
Apache 2.0
