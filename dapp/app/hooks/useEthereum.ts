import { useEffect, useState } from "react";
import DTwitter from "./DTwitter.json";
import { ethers } from "ethers";
import { Dweet, User } from "../types/User";

const contractABI = DTwitter.abi;
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
const Ethereum =
  typeof window !== "undefined" ? (window as any).ethereum : null;

const getDTwitterContract = async () => {
  const provider = new ethers.JsonRpcProvider("http://localhost:8545");
  const signer = await provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

const useDTwitter = () => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User>({
    avatar: "",
    name: "",
    username: "",
    bio: "",
    wallet: "",
  });
  const [dweets, setDweets] = useState<Dweet[]>([]);

  const connect = async () => {
    try {
      if (!Ethereum) {
        alert("Please install MetaMask");
        return;
      }
      const accounts = await Ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length === 0) {
        alert("No Authorized Accounts");
        return;
      }
      const account = accounts[0];
      setCurrentAccount(account);
    } catch (err) {
      console.log(err);
    }
  };

  const getUser = async (account: string) => {
    const contract = await getDTwitterContract();
    console.log(account);

    const user = await contract.getUser(account);
    console.log(user);
    const { avatar, name, username, bio, wallet } = user;
    setCurrentUser({
      ...currentUser,
      avatar,
      name,
      username,
      bio,
      wallet,
    });
    return user;
  };

  const createUser = async (
    name: string,
    username: string,
    bio: string,
    avatar: string
  ) => {
    const contract = await getDTwitterContract();
    // console.log(name, username, bio, avatar);
    const user = await contract.signup(name, username, bio, avatar);
    console.log("user has been added", user);
    // await getUser(user.wallet);

    return user;
  };

  const addDweet = async (_content: string) => {
    const contract = await getDTwitterContract();
    await contract.postTweet(_content);
    await getDweets();
    // return dweet;
  };
  const getDweets = async () => {
    const contract = await getDTwitterContract();
    const dweets = await contract.getTweet();
    setDweets(dweets);
    // return dweets;
  };

  useEffect(() => {
    // console.log(currentAccount);
    if (currentAccount.length > 0) {
      getUser(currentAccount)
        .then()
        .catch((err) => console.log(err.message));
      getDweets();
    }
  }, [currentAccount]);

  useEffect(() => {
    if (!Ethereum) {
      alert("Please install MetaMask");
      return;
    }
    connect();
  }, [currentAccount]);
  return {
    connect,
    currentAccount,
    currentUser,
    createUser,
    getUser,
    addDweet,
    dweets,
  };
};

export default useDTwitter;
