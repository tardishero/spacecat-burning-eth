import { ethers } from "ethers";
import {
  DragonDoodleNFTStaking,
  SpaceOwlsNFTStaking,
  SpacekittyNFTStaking,
} from "../config";
import DragonDoodleNftStakingContractABI from "../../public/abi/DragonDoodleNftStakingContractABI.json";
import { errorAlert, successAlert } from "./toastGroup";
import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";

interface WindowWithEthereum extends Window {
  ethereum?: any;
}
export default function DragonDoodleClaimpage(props: {
  nftCounts: number;
  lastClaimed: number;
  claimAmount: number;
  getData: Function;
}) {
  const [startLoadingState, setStartLoadingState] = useState(false);

  const provider =
    typeof window !== "undefined" && (window as WindowWithEthereum).ethereum
      ? new ethers.providers.Web3Provider(
          (window as WindowWithEthereum).ethereum
        )
      : null;
  const Signer = provider?.getSigner();

  const DragonDoodleNFTStakingContract = new ethers.Contract(
    DragonDoodleNFTStaking,
    DragonDoodleNftStakingContractABI,
    Signer
  );

  const handleStartOnBoarding = async () => {
    setStartLoadingState(true);
    await DragonDoodleNFTStakingContract.onBoardUser()
      .then((tx: any) => {
        tx.wait()
          .then(() => {
            setStartLoadingState(false);
            successAlert("Onboarding successfully!");
            props.getData();
          })
          .catch(() => {
            errorAlert("Onboarding error!");
            setStartLoadingState(false);
          });
      })
      .catch(() => {
        errorAlert("Onboarding error!");
        setStartLoadingState(false);
      });
  };

  const handleClaimFunc = async () => {
    setStartLoadingState(true);
    await DragonDoodleNFTStakingContract.claimRewards()
      .then((tx: any) => {
        tx.wait()
          .then(() => {
            setStartLoadingState(false);
            successAlert("Claim successfully!");
            props.getData();
          })
          .catch(() => {
            errorAlert("Claim error!");
            setStartLoadingState(false);
            props.getData();
          });
      })
      .catch(() => {
        setStartLoadingState(false);
        errorAlert("Claim error!");
      });
  };

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg min-h-[40vh]">
      <div className="px-4 -mt-6">
        <div className="w-full py-4 text-center text-white rounded-lg box-shadow-custom">
          <h1 className="text-3xl text-white uppercase">DragonDoodle nfts</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-5">
        <h1 className="text-2xl font-bold text-gray-700 uppercase">
          Total Nft Counts : {props.nftCounts}
        </h1>
        <h1 className="text-2xl font-bold text-gray-700 uppercase">
          claim amount : {props.claimAmount}
        </h1>
      </div>
      <div className="flex items-center justify-center w-full gap-4">
        {props.nftCounts !== 0 && props.lastClaimed === 0 && (
          <button
            className="px-2 py-3 text-white uppercase rounded-lg box-shadow-custom"
            onClick={() => handleStartOnBoarding()}
          >
            Start on boarding
          </button>
        )}
        {props.lastClaimed !== 0 && props.claimAmount !== 0 && (
          <button
            className="px-2 py-3 text-white uppercase rounded-lg box-shadow-custom"
            onClick={() => handleClaimFunc()}
          >
            Claim Rewards
          </button>
        )}
      </div>
      {startLoadingState && (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex z-[50] backdrop-blur-lg justify-center items-center flex-col gap-4">
          <ScaleLoader color="black" />
          <p className="text-gray-800">Loading ...</p>
        </div>
      )}
    </div>
  );
}
