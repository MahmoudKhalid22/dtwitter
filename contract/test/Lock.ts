import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Lock", function () {
  it("Should return the name", async function () {
    const DTwitter = await ethers.getContractFactory("DTwitter");
    const [user1, user2] = await ethers.getSigners();
    const dtwitter = await DTwitter.deploy();
    // await dtwitter.deployed();

    await dtwitter.signup(
      "Mahmoud Khalid",
      "MKhalid",
      "A web3 Software Engineer",
      "some url"
    );

    const user = await dtwitter.users("MKhalid");
    expect(user.name).to.equal("Mahmoud Khalid");
    expect(user.avatar).to.equal("some url");
    expect(user.bio).to.equal("A web3 Software Engineer");

    console.log("Signing up with the first account Me (mahmoud)");

    const userFromAddress = await dtwitter.getUser(user1.address);
    expect(userFromAddress.name).to.equal("Mahmoud Khalid");
    expect(userFromAddress.avatar).to.equal("some url");
    expect(userFromAddress.bio).to.equal("A web3 Software Engineer");

    expect(await dtwitter.usernames(user1.address)).to.equal("MKhalid");

    console.log("test user already exists");

    await expect(dtwitter.signup("", "", "", "")).to.be.revertedWith(
      "user already exists"
    );
    await expect(
      dtwitter
        .connect(user2)
        .signup("Mahmoud Khalid", "MKhalid", "SoftWare Engineer", "another url")
    ).to.be.revertedWith("username is taken, try another one.");

    console.log("username is taken error");
  });
});
