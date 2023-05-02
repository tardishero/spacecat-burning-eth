export default function SpaceOwlsClaimpage(props: { nftCounts: number }) {
  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg min-h-[40vh]">
      <div className="px-4 -mt-6">
        <div className="w-full py-4 text-center text-white rounded-lg box-shadow-custom">
          <h1 className="text-3xl text-white uppercase">spaceowls nfts</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-5">
        <h1 className="text-2xl font-bold text-gray-700 uppercase">
          Total Nft Counts : {props.nftCounts}
        </h1>
        <h1 className="text-2xl font-bold text-gray-700 uppercase">
          claim amount : {`0`}
        </h1>
      </div>
      <div className="flex items-center justify-center w-full gap-4">
        <button className="px-2 py-3 text-white uppercase rounded-lg box-shadow-custom">
          Start on boarding
        </button>
        <button className="px-2 py-3 text-white uppercase rounded-lg box-shadow-custom">
          Claim Rewards
        </button>
      </div>
    </div>
  );
}
