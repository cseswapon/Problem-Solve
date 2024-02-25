import React, { useState } from "react";
import AllContactModal from "./AllContactModal";
import UsContactModal from "./UsContactModal";

const Problem2 = () => {
  const [showAllContactsModal, setShowAllContactsModal] = useState(false);
  const [showUSContactsModal, setShowUSContactsModal] = useState(false);

    
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            onClick={() => setShowAllContactsModal(true)}
            className="btn btn-lg btn-outline-primary"
            type="button"
          >
            All Contacts
          </button>
          <button
            onClick={() => setShowUSContactsModal(true)}
            className="btn btn-lg btn-outline-warning"
            type="button"
          >
            US Contacts
          </button>
        </div>
      </div>

      <AllContactModal
        show={showAllContactsModal}
        onHide={() => setShowAllContactsModal(false)}
        title="All Contacts"
      />
      <UsContactModal
        show={showUSContactsModal}
        onHide={() => setShowUSContactsModal(false)}
        title="US Contacts"
      />
    </div>
  );
};

export default Problem2;
