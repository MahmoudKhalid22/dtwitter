"use client";
import Head from "next/head";
import Button from "./components/Button";
import Link from "next/link";
import useDTwitter from "./hooks/useEthereum";
import Form from "./components/Form";
import { useEffect, useState } from "react";
import { User } from "./types/User";

export default function Home() {
  const {
    connect,
    currentAccount,
    currentUser: user,
    createUser,
    getUser,
    addDweet,
    dweets,
  } = useDTwitter();
  const [userData, setUserData] = useState<User>({
    name: "",
    username: "",
    bio: "",
    avatar: "",
    wallet: user.wallet,
  });
  const [ss, setSS] = useState("");
  // console.log(currentAccount);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="mb-8 text-5xl font-bold">
          Welcome to <span className="text-blue-400">DTwitter</span>
        </h1>

        {!currentAccount ? (
          <Button label="Connect with Ethereum" onClick={connect} />
        ) : currentAccount.toUpperCase() !== user.wallet.toUpperCase() ? (
          <div className="flex flex-col gap-6">
            <Form userData={userData} setUserData={setUserData} />
            <Button
              label="Signup"
              onClick={() => {
                createUser(
                  userData.name,
                  userData.username,
                  userData.bio,
                  userData.avatar
                );
              }}
            />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6">
              <p className="text-2xl">{user.name}</p>
              <p className="text-2xl text-gray-400">@{user.username}</p>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <img src={user.avatar} className="rounded-full h-16 w-16" />
                <textarea
                  className="rounded-xl ml-4 w-64 h-24 py-2 px-4"
                  placeholder="What's happening"
                  value={ss}
                  onChange={(e) => setSS(e.target.value)}
                />
              </div>
              <div className="mt-4 ml-auto">
                <Button
                  label="Tweet"
                  onClick={() => {
                    addDweet(ss);
                    setSS("");
                  }}
                />
                {/* <button onClick={async () => await addDweet(dweet)}>
                  Tweet
                </button> */}
              </div>
            </div>
            <div>
              {dweets.map((dweet) => (
                <div key={Date.now()}>{dweet.content}</div>
              ))}
            </div>
          </>
        )}
      </main>
      <footer className="flex h-24 w-full items-center justify-center border-t mt-4">
        Powered by Ethereum
      </footer>
    </div>
  );
}
