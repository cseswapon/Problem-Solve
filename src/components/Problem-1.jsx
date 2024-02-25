import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [state, setState] = useState({
    formData: {
      name: "",
      status: "",
    },
    data: [],
    all: [],
    complete: [],
    active: [],
  });

  const handleClick = (val) => {
    setShow(val);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    state.data.push(state.formData);
    resetForm();
    console.log("Form Submit", state);
  };

  const resetForm = () => {
    setState((prev) => ({ ...prev, formData: { name: "", status: "" } }));
  };

   const filterData = () => {
     switch (show) {
       case "all":
         return state.data;
       case "active":
         return state.data.filter((item) => item.status === "active");
       case "completed":
         return state.data.filter((item) => item.status === "completed");
       default:
         return state.data;
     }
   };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handelSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                required
                value={state.formData.name}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    formData: { ...prev.formData, name: e.target.value },
                  }))
                }
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="col-auto">
              <input
                required
                value={state.formData.status}
                onChange={(e) =>
                  setState((prev) => ({
                    ...prev,
                    formData: { ...prev.formData, status: e.target.value },
                  }))
                }
                type="text"
                className="form-control"
                placeholder="Status"
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {filterData().map((item, i) => (
                <tr key={i}>
                  <td>{item.name} </td>
                  <td>{item.status} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
