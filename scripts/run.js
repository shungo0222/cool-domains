const main = async () => {
    // The first return is the deployer, the second is a random account
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    let txn = await domainContract.register("doom");
    await txn.wait();

    const domainAddress = await domainContract.getAddress("doom");
    console.log("Owner of domain: ", domainAddress);

    // Trying to set a record that doesn't belong to me! => "Error: Transaction reverted without a reason string"
    // txn = await domainContract.connect(randomPerson).setRecord("doom", "Haha my domain now!");
    // await txn.wait();

    console.log("======================================================================")

    txn = await domainContract.connect(randomPerson).register("pochi");
    await txn.wait();

    console.log("Random person's address: ", randomPerson.address);
    const randomAddress = await domainContract.getAddress("pochi");
    console.log("Owner of pochi domain: ", randomAddress);
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