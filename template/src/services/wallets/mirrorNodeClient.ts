import { AccountId } from "@hashgraph/sdk";
import { NetworkConfig } from "../../config";

export class MirrorNodeClient {
  url: string;
  constructor(networkConfig: NetworkConfig) {
    this.url = networkConfig.mirrorNodeUrl;
  }

  async getAccountInfo(accountId: AccountId) {
    const accountInfo = await fetch(`${this.url}/api/v1/accounts/${accountId}`, { method: "GET" });
    const accountInfoJson = await accountInfo.json();
    return accountInfoJson;
  }
}