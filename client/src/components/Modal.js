import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  const revoking = async () => {
    const select = document.querySelector("#selectNumber");
    const address = select.value;
    if (address !== "People With Access") {
      await contract.disallow(address);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      select.innerHTML = ""; // Clear previous options
      
      let defaultOption = document.createElement("option");
      defaultOption.textContent = "People With Access";
      defaultOption.value = "";
      select.appendChild(defaultOption);
      
      addressList.forEach(({ user, access }) => {
        let e1 = document.createElement("option");
        e1.textContent = `${user} - ${access ? "true" : "false"}`;
        e1.value = user;
        select.appendChild(e1);
      });
    };
    contract && accessList();
  }, [contract]);

  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button onClick={() => setModalOpen(false)} id="cancelBtn">
              Cancel
            </button>
            <button onClick={sharing}>Share</button>
            <button onClick={revoking}>Revoke</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
