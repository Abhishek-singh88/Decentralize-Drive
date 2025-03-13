import { useState } from "react";
import { ethers } from "ethers";

function WalletConnect({ setAccount, setProvider, setContract, contractAbi }) {
  const [account, setLocalAccount] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        setLocalAccount(address);

        const contractAddress = "0x91D68c2Eb9ED2606E5618920C14BA6a39f73004B";
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        setContract(contract);
        setProvider(provider);

        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("MetaMask is not installed!");
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setLocalAccount("");
    setContract(null);
    setProvider(null);
    setShowDropdown(false);
  };

  return (
    <div style={{ position: "absolute", top: "10px", right: "10px" }}>
      {account ? (
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Connected: {account.substring(0, 6)}...
          </button>
          {showDropdown && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: "0",
                backgroundColor: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginTop: "5px",
                cursor: "pointer",
              }}
              onClick={disconnectWallet}
            >
              Disconnect
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Connect
        </button>
      )}
    </div>
  );
}

export default WalletConnect;
