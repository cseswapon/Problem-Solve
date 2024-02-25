import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

export default function AllContactModal({ show, onHide, title }) {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isEvenIdSelected, setIsEvenIdSelected] = useState(false);
  const [titles, setTitles] = useState("All Contacts");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://contact.mediusware.com/api/contacts/?page=1&page_size=600",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "X-CSRFToken":
                "qqQh5101LS24Yx4MfSM1u4HZKHwqOltuABGeYBYASX26HwtDHfDOPb7SghlBcIqp",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setContacts(data.results);
        setFilteredContacts(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, isEvenIdSelected, titles]);

  const filterContacts = () => {
    let filtered = contacts.filter((contact) => {
      if (titles === "US Contacts") {
        return contact.country.name === "United States";
      }
      if (searchTerm) {
        return (
          contact.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          contact.country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      return true;
    });
    if (isEvenIdSelected) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
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
              onClick={() => setTitles("All Contacts")}
            >
              All Contacts
            </button>
            <button
              style={{ background: "#ff7f50" }}
              className="btn text-light"
              onClick={() => setTitles("US Contacts")}
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
              {filteredContacts.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.phone}</td>
                  <td>{item.country.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div>
            <label htmlFor="check">
              <input
                type="checkbox"
                checked={isEvenIdSelected}
                onChange={() => setIsEvenIdSelected(!isEvenIdSelected)}
              />{" "}
              Even Id Select
            </label>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
