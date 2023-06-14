// Reason: We need to build HAPI contract functions params
// And we want the string contract function params that ethers exepects
// This is an opportunity for the adapter pattern.

import { ContractFunctionParameters } from "@hashgraph/sdk";

export interface ContractFunctionParameterBuilderParam {
  type: string;
  name: string;
  value: any;
}

export class ContractFunctionParameterBuilder {
  private params: ContractFunctionParameterBuilderParam[] = [];

  public addParam(param: ContractFunctionParameterBuilderParam): ContractFunctionParameterBuilder {
    this.params.push(param);
    return this;
  }

  // Purpose: Build the ABI function parameters
  // Reason: The abi function parameters are required to construct the ethers.Contract object for calling a contract function using ethers
  public buildAbiFunctionParams(): string {
    return this.params.map(param => `${param.type} ${param.name}`).join(', ');
  }

  // Purpose: Build the ethers compatible contract function call params
  // Reason: An array of strings is required to call a contract function using ethers
  public buildEthersParams(): string[] {
    return this.params.map(param => param.value.toString());
  }

  // Purpose: Build the HAPI compatible contract function params
  // Reason: An instance of ContractFunctionParameters is required to call a contract function using Hedera wallets
  public buildHAPIParams(): ContractFunctionParameters {
    const contractFunctionParams = new ContractFunctionParameters();
    for (const param of this.params) {
      // make sure type only contains alphanumeric characters (no spaces, no special characters, no whitespace), make sure it does not start with a number
      const alphanumericIdentifier: RegExp = /^[a-zA-Z][a-zA-Z0-9]*$/;
      if (!param.type.match(alphanumericIdentifier)) {
        throw new Error(`Invalid type: ${param.type}. Type must only contain alphanumeric characters.`);
      }
      // captitalize the first letter of the type
      const type = param.type.charAt(0).toUpperCase() + param.type.slice(1);
      const functionName = `add${type}`;
      if (functionName in contractFunctionParams) {
        (contractFunctionParams as any)[functionName](param.value);
      } else {
        throw new Error(`Invalid type: ${param.type}. Could not find function ${functionName} in ContractFunctionParameters class.`);
      }
    }

    return contractFunctionParams;
  }
}