import type { TestContractAbi } from "@/sway-api";
import { TestContractAbi__factory } from "@/sway-api";
import contractIds from "@/sway-api/contract-ids.json";
import { FuelLogo } from "@/components/FuelLogo";
import { Provider, Wallet, bn } from "fuels";
import { useState } from "react";
import { Link } from "@/components/Link";
import { Button } from "@/components/Button";
import toast from "react-hot-toast";
import { useActiveWallet } from "@/hooks/useActiveWallet";
import useAsync from "react-use/lib/useAsync";
import { CURRENT_ENVIRONMENT } from "@/lib";

const contractId =
  CURRENT_ENVIRONMENT === "local"
    ? contractIds.testContract
    : (process.env.NEXT_PUBLIC_TESTNET_CONTRACT_ID as string); // Testnet Contract ID

const hasContract = process.env.NEXT_PUBLIC_HAS_CONTRACT === "true";
const hasPredicate = process.env.NEXT_PUBLIC_HAS_PREDICATE === "true";
const hasScript = process.env.NEXT_PUBLIC_HAS_SCRIPT === "true";

export default function Home() {

  const getWallet = async () => {
    const provider = await Provider.create("http://127.0.0.1:4000/v1/graphql");
    // return new WalletUnlocked("0xc852a8675f20538e3c578f56d59ea928035fda840b428e873e8abc04bb2a57ab", provider);
    return Wallet.fromPrivateKey(
      "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c",
      provider
    );
  };
  const getBalance = async () => {
    const wallet = await getWallet();
    wallet.getBalance().then((res: { toNumber: () => any; }) => {
      console.log(res.toNumber());
    });
  };
  const tokenContract = async () => {
    const contractId =
      "0x49b3b78cf8f5a529b3cd67cbe29d7cc9abfddbdbd21e48e5302b190a4c2886dd";
    const wallet = await getWallet();
    return TestContractAbi__factory.connect(contractId, wallet);
  };
  
  const admin =
    "0x6b63804cfbf9856e68e5b6e7aef238dc8311ec55bec04df774003a2c96e0418e";


  const mint = async () => {
    const contract = await tokenContract();
    const address = { Address: { bits: admin } };
    const subid = "0x0000000000000000000000000000000000000000000000000000000000000001"
    const mint = await contract.functions
      .mint(address, subid, 1)
      .txParams({ gasLimit: 500000 })
      .call();
    console.log("batch_mint: ", mint);
    console.log("asset: ", mint.transactionResult.mintedAssets[0].assetId);
  };

  const set_metadata = async () => {
    const metadata = {String: "test"};
    const contract = await tokenContract();
    const asset = { bits: "0x2701a55b92500b6333964bb5f8df83a506f370a8860f4cc70a73f2e8342a4f6f" };
    const call = await contract.functions
      .set_metadata(asset, "0", metadata)
      .txParams({ gasLimit: 500000 })
      .call();
    console.log("call: ", call);
  };

  const metadata = async () => {
    const contract = await tokenContract();
    const asset = { bits: "0x2701a55b92500b6333964bb5f8df83a506f370a8860f4cc70a73f2e8342a4f6f" };
    const call = await contract.functions
      .metadata(asset, "0")
      .txParams({
        gasLimit: 100_000,
      })
      .get();
    console.log("call: ", call);
  };

  return (
    <div>
        <button className={`bg-fuel-green text-white px-4 py-2 rounded-md `} onClick={mint}>mint</button>
        <button className={`bg-fuel-green text-white px-4 py-2 rounded-md `} onClick={set_metadata}>set_metadata</button>
        <button className={`bg-fuel-green text-white px-4 py-2 rounded-md `} onClick={metadata}>metadata</button>

      </div>
  );
}
