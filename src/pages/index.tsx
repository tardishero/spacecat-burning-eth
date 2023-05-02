/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import {
  errorAlert,
  infoAlert,
  successAlert,
  warningAlert,
} from "../components/toastGroup";
import { ScaleLoader } from "react-spinners";

import SpaceKittyClaimpage from "../components/SpaceKittyClaimpage";
import SpaceOwlsClaimpage from "../components/SpaceOwlsClaimpage";
import DragonDoodleClaimpage from "../components/DragonDoodleClaimpage";
import {
  DragonDoodleNFT,
  DragonDoodleNFTStaking,
  SpaceOwlsNFT,
  SpaceOwlsNFTStaking,
  SpacekittyNFT,
  SpacekittyNFTStaking,
  sDOODtoken,
} from "../config";
import DragonDoodleNftContractABI from "../../public/abi/DragonDoodleNftContractABI.json";
import DragonDoodleNftStakingContractABI from "../../public/abi/DragonDoodleNftStakingContractABI.json";
import SdoodTokenContractABI from "../../public/abi/SdoodTokenContractABI.json";
import SpaceKittyNftContractABI from "../../public/abi/SpaceKittyNftContractABI.json";
import SpaceKittyNftStakingContractABI from "../../public/abi/SpaceKittyNftStakingContractABI.json";
import SpaceOwlsNftContractABI from "../../public/abi/SpaceOwlsNftContractABI.json";
import SpaceOwlsNftStakingContractABI from "../../public/abi/SpaceOwlsNftStakingContractABI.json";

interface NFTType {
  name: string;
  tokenId: number;
  imgUrl: string;
}

interface PARENTNFTType {
  maleTokenId: number;
  feMaleTokenId: number;
  maleImgUrl: string;
  feMaleImgUrl: string;
  startedTime: number;
  breedAllow: boolean;
  owner: string;
}

interface WindowWithEthereum extends Window {
  ethereum?: any;
}

const Home: NextPage = () => {
  const { account } = useWeb3React();
  const [maleList, setMaleList] = useState<NFTType[]>([]);
  const [femaleList, setFemmaleList] = useState<NFTType[]>([]);
  const [parentList, setParentList] = useState<PARENTNFTType[]>([]);

  const [selectedMale, setSelectedMale] = useState<NFTType[] | undefined>();
  const [selectedFemale, setSelectedFemale] = useState<NFTType[] | undefined>();

  const [nftApproveAllState, setNftApproveAllState] = useState<boolean>(false);
  const [startLoadingState, setStartLoadingState] = useState<boolean>(false);

  const [spaceKittyNftCounts, setSpaceKittyNftCounts] = useState<number>(0);
  const [spaceOwlsNftCounts, setSpaceOwlsNftCounts] = useState<number>(0);
  const [dragonDoodleCounts, setDragonDoodleCounts] = useState<number>(0);

  const [spaceKittyNftClaimAmount, setSpaceKittyNftClaimAmount] =
    useState<number>(0);
  const [spaceKittyNftLastClaimed, setSpaceKittyNftLastClaimed] =
    useState<number>(0);
  const [spaceOwlsNftClaimAmount, setSpaceOwlsNftClaimAmount] =
    useState<number>(0);
  const [spaceOwlsNftLastClaimed, setSpaceOwlsNftlastClaimed] =
    useState<number>(0);
  const [dragonDoodleClaimAmount, setDragonDoodleClaimAmount] =
    useState<number>(0);
  const [dragonDoodleLastClaimed, setDragonDoodlelastClaimed] =
    useState<number>(0);

  const provider =
    typeof window !== "undefined" && (window as WindowWithEthereum).ethereum
      ? new ethers.providers.Web3Provider(
          (window as WindowWithEthereum).ethereum
        )
      : null;
  const Signer = provider?.getSigner();

  const SpaceKittyNFTContract = new ethers.Contract(
    SpacekittyNFT,
    SpaceKittyNftContractABI,
    Signer
  );

  const SpaceKittyNFTStakingContract = new ethers.Contract(
    SpacekittyNFTStaking,
    SpaceKittyNftStakingContractABI,
    Signer
  );
  const SpaceOwlsNFTContract = new ethers.Contract(
    SpaceOwlsNFT,
    SpaceOwlsNftContractABI,
    Signer
  );

  const SpaceOwlsNFTStakingContract = new ethers.Contract(
    SpaceOwlsNFTStaking,
    SpaceOwlsNftStakingContractABI,
    Signer
  );
  const DragonDoodleNFTContract = new ethers.Contract(
    DragonDoodleNFT,
    DragonDoodleNftContractABI,
    Signer
  );

  const DragonDoodleNFTStakingContract = new ethers.Contract(
    DragonDoodleNFTStaking,
    DragonDoodleNftStakingContractABI,
    Signer
  );

  const SdoodTokenContract = new ethers.Contract(
    sDOODtoken,
    SdoodTokenContractABI,
    Signer
  );

  const getData = async () => {
    setStartLoadingState(true);
    await SpaceKittyNFTContract.walletOfOwner(account).then((data: any) => {
      setSpaceKittyNftCounts(data.length);
    });
    await SpaceOwlsNFTContract.walletOfOwner(account).then((data: any) => {
      setSpaceOwlsNftCounts(data.length);
    });
    await DragonDoodleNFTContract.walletOfOwner(account).then((data: any) => {
      setDragonDoodleCounts(data.length);
    });

    const totalReward = await SpaceKittyNFTStakingContract.getPendingRewards(
      account
    );
    setSpaceKittyNftClaimAmount(
      Number(parseFloat(ethers.utils.formatEther(totalReward)).toFixed(4))
    );

    const lastClaimedStated = await SpaceKittyNFTStakingContract.lastClaimed(
      account
    );
    console.log("lastClaimedStated->", Number(lastClaimedStated));
    setSpaceKittyNftLastClaimed(Number(lastClaimedStated));

    const totalReward2 = await SpaceOwlsNFTStakingContract.getPendingRewards(
      account
    );
    setSpaceOwlsNftClaimAmount(
      Number(parseFloat(ethers.utils.formatEther(totalReward2)).toFixed(4))
    );

    const lastClaimedStated2 = await SpaceOwlsNFTStakingContract.lastClaimed(
      account
    );
    setSpaceOwlsNftlastClaimed(Number(lastClaimedStated2));
    console.log("lastClaimedStated2->", Number(lastClaimedStated2));

    const totalReward3 = await DragonDoodleNFTStakingContract.getPendingRewards(
      account
    );
    setDragonDoodleClaimAmount(
      Number(parseFloat(ethers.utils.formatEther(totalReward3)).toFixed(4))
    );

    const lastClaimedStated3 = await DragonDoodleNFTStakingContract.lastClaimed(
      account
    );
    setDragonDoodlelastClaimed(Number(lastClaimedStated3));

    setStartLoadingState(false);
  };

  useEffect(() => {
    if (account) {
      getData();
    }
    // eslint-disable-next-line
  }, [account]);

  return (
    <main className="container flex flex-col items-center justify-center w-full min-h-screen lg:px-[100px] md:px-[30px] px-5">
      <div
        className="relative z-[48] min-h-[40vh] mt-[100px] w-full rounded-lg my-10
    border-none grid grid-cols-3 gap-10"
      >
        <SpaceKittyClaimpage
          nftCounts={spaceKittyNftCounts}
          lastClaimed={spaceKittyNftLastClaimed}
          claimAmount={spaceKittyNftClaimAmount}
          getData={getData}
        />
        <SpaceOwlsClaimpage
          nftCounts={spaceOwlsNftCounts}
          lastClaimed={spaceOwlsNftLastClaimed}
          claimAmount={spaceOwlsNftClaimAmount}
          getData={getData}
        />
        <DragonDoodleClaimpage
          nftCounts={dragonDoodleCounts}
          lastClaimed={dragonDoodleLastClaimed}
          claimAmount={dragonDoodleClaimAmount}
          getData={getData}
        />
      </div>
      {startLoadingState && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex z-[50] backdrop-blur-lg justify-center items-center flex-col gap-4">
          <ScaleLoader color="black" />
          <p className="text-gray-800">Loading ...</p>
        </div>
      )}
    </main>
  );
};

export default Home;
