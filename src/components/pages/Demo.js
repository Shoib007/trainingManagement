import React, { useState } from "react";

function Card() {
  const [status, setStatus] = useState("pending");

  const handlePending = () => {
    setStatus("pending");
  };

  const handleCompleted = () => {
    setStatus("completed");
  };

  return (
    <div className={`card ${status === "pending" ? "bg-warning" : "bg-success"}`}>
      <div className="card-body">
        <h5 className="card-title">My Card</h5>
        <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <div className="card-footer">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-secondary" onContextMenu={(e) => e.preventDefault()}>
            Right-click me!
          </button>
          <div className="btn-group" role="group">
            <button
              id="btnGroupDrop1"
              type="button"
              className="btn btn-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {status === "pending" ? "Pending" : "Completed"}
            </button>
            <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <li>
                <a className="dropdown-item" href="/#" onClick={handlePending}>
                  Pending
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/#" onClick={handleCompleted}>
                  Completed
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
