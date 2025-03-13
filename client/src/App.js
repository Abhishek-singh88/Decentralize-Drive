import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState } from "react";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import WalletConnect from "./components/WalletConnect";
import ParticlesBackground from "./components/ParticlesBackground";  // <-- Import added
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* Particle Background */}
      <ParticlesBackground />

      <WalletConnect
        setAccount={setAccount}
        setProvider={setProvider}
        setContract={setContract}
        contractAbi={Upload.abi}
      />
      {!modalOpen && (
        <button className="share" onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

      <div className="App">
        <h1 style={{ color: "white" }}>Decentralize Drive</h1>
        <p style={{ color: "white" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload account={account} provider={provider} contract={contract} />
        <Display contract={contract} account={account} />
      </div>
    </>
  );
}

export default App;
