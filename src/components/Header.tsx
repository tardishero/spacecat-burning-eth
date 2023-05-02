/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { injected } from "../connecthook/connect";
import { switchNetwork } from "../connecthook/switch-network";
import { FaWallet } from "react-icons/fa";

export default function Header() {
  const router = useRouter();
  // const [open, setOpen] = useState(false);

  const { account, chainId, activate, deactivate } = useWeb3React();

  async function connect() {
    if (chainId !== 19 || chainId === undefined) {
      switchNetwork();
    }
    try {
      console.log("clicked");
      await activate(injected);
      localStorage.setItem("isWalletConnected", "true");
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", "true");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="w-full h-[80px] flex justify-between lg:px-[100px] md:px-[40px] fixed z-[49] py-3 items-center px-4">
      <div className="flex items-center justify-between w-full px-3 py-1 my-2 bg-green-600 rounded-lg box-shadow-custom">
        <Head>
          <link rel="icon" href="/img/logo.png" />
        </Head>
        <Link href={`/`} passHref>
          <div className="bg-white cursor-pointer backdrop-blur-sm bg-opacity-10 border-[1px] rounded-lg border-gray-400">
            <img
              src="/img/logo.png"
              className="object-cover object-center w-[55px] h-[55px] p-2"
              alt="logo"
            />
          </div>
        </Link>
        <div
          className="items-center h-full px-4 py-2 text-white border-[1px] border-gray-400 rounded-lg text-whitebg-white backdrop-blur-sm bg-opacity-10 bg-white hidden md:flex
      justify-between gap-10"
        >
          <p className="text-xl font-bold text-white uppercase">
            - Spacecat Staking -
          </p>
        </div>

        <div className="flex items-center">
          {/* <Link href={"https://doodlebunnyflr.live/mint"} passHref>
          <li
            className={`text-[1.5rem] hover:text-white duration-300 transition-all cursor-pointer gradient_link ${
              router.pathname === "/" ? "text-red-500 underline" : ""
            }`}
          >
            Mint
          </li>
        </Link> */}
          {account ? (
            <button
              onClick={() => disconnect()}
              className="px-2 py-3 font-bold text-gray-600 bg-white rounded-lg backdrop-blur-sm"
            >
              <span className="flex gap-2 text">
                <FaWallet style={{ marginTop: "3%" }} />
                {account && account.slice(0, 4) + "..." + account.slice(-4)}
              </span>
            </button>
          ) : (
            <button
              onClick={() => connect()}
              className="px-2 py-3 font-bold text-gray-600 bg-white rounded-lg backdrop-blur-sm"
            >
              <span className="flex gap-2 text-gray-600 uppercase">
                Connect Wallet
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
