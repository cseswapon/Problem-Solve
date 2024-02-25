import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function UsContactModal({ show, onHide, title }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("United States");
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    if (show) {
      fetchContacts();
    }
  }, [show,searchTerm]);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(
        `https://contact.mediusware.com/api/country-contacts/${searchTerm}/`,
        {
          headers: {
            accept: "application/json",
            "X-CSRFToken":
              "qqQh5101LS24Yx4MfSM1u4HZKHwqOltuABGeYBYASX26HwtDHfDOPb7SghlBcIqp",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setContacts(data.results);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (searchTerm !== "All") {
      filtered = filtered.filter(
        (contact) =>
          contact.country.name.toLowerCase() === searchTerm.toLowerCase()
      );
    }

    setFilteredContacts(filtered);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center my-4">
            <p className="my-0">{title}</p>
            <input
              className="p-2 border-1 rounded"
              type="text"
              placeholder="Search Box"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="d-flex align-items-center gap-2">
            <button
              style={{ background: "#46139f" }}
              className="btn text-light"
              onClick={() => setSearchTerm("All")}
            >
              All Contacts
            </button>
            <button
              style={{ background: "#ff7f50" }}
              className="btn text-light"
              onClick={() => setSearchTerm("United States")}
            >
              US Contacts
            </button>
            <button
              style={{ background: "#46139f", border: "1px solid #46139f" }}
              className="btn text-light"
              onClick={onHide}
            >
              Close
            </button>
          </div>
          <Table
            className="mt-3 text-center"
            striped
            bordered
            hover
            variant="light"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Phone Number</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.id}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.country.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}
