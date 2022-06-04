const { ethers } = require("ethers");
require("dotenv").config();
const famRewardsAbi = require("./artificts/FamRewards").abi;

async function main() {
    let myWallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    console.log("address: " + myWallet.address);

    const provider = ethers.getDefaultProvider("kovan");
    myWallet = myWallet.connect(provider);
    let bal = await myWallet.getBalance();
    console.log("balance: " + bal);

    console.log("current block: " + await myWallet.provider.getBlockNumber());

    const famRewardsAddress = "0x06adb872C27922d25C8e7b879EB55101901Bf246";

    const famRewardContract = new ethers.Contract(famRewardsAddress, famRewardsAbi, provider);

    // read only method
    let isNonceUsed = await famRewardContract.usedNonces(0);
    console.log("is 0 nonce used: " + isNonceUsed);

    // write method
    // const trans = await famRewardContract.connect(myWallet).claimTokens(...);
    // await trans.wait();
    // console.log("tx: " + trans.hash);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});