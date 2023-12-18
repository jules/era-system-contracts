import { expect } from "chai";
import { ethers } from "hardhat";
import type { Wallet } from "zksync-ethers";
import type { EmptyContract } from "../typechain-types";
import { deployContract, getWallets, provider } from "./shared/utils";

describe("EmptyContract tests", function () {
  let wallet: Wallet;
  let emptyContract: EmptyContract;

  before(async () => {
    wallet = getWallets()[0];
    emptyContract = (await deployContract("EmptyContract")) as EmptyContract;
  });

  it("zero value", async () => {
    const tx = {
      from: wallet.address,
      to: await emptyContract.getAddress(),
      value: 0,
      data: "0x1234567890deadbeef1234567890",
    };
    expect(await provider.call(tx)).to.be.eq("0x");
  });

  it("non-zero value", async () => {
    const tx = {
      from: wallet.address,
      to: await emptyContract.getAddress(),
      value: ethers.parseEther("1.0"),
      data: "0x1234567890deadbeef1234567890",
    };
    expect(await provider.call(tx)).to.be.eq("0x");
  });

  it("empty calldata", async () => {
    const tx = {
      from: wallet.address,
      to: await emptyContract.getAddress(),
      data: "",
    };
    expect(await provider.call(tx)).to.be.eq("0x");
  });
});
