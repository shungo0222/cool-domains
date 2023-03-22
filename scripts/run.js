const main = async () => {
    // The first return is the deployer, the second is a random account
    // const [owner, randomPerson] = await hre.ethers.getSigners();

    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    // We pass in "udon" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy("udon");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);
    // console.log("Contract deployed by:", owner.address);

    // We're passing in a second variable - value. This is the money.
    let txn = await domainContract.register("pochi", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();

    const address = await domainContract.getAddress("pochi");
    console.log("Owner of domain \"pochi\": ", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    // Trying to set a record that doesn't belong to me! => "Error: Transaction reverted without a reason string"
    // txn = await domainContract.connect(randomPerson).setRecord("doom", "Haha my domain now!");
    // await txn.wait();

    // console.log("======================================================================")

    // txn = await domainContract.connect(randomPerson).register("pochi");
    // await txn.wait();

    // console.log("Random person's address: ", randomPerson.address);
    // const randomAddress = await domainContract.getAddress("pochi");
    // console.log("Owner of pochi domain: ", randomAddress);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();