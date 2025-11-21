import React from "react";
import "./table.css";

const VendorsTable = ({ vendors }) => {
  return (
    <div className="table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>Vendor Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Supplier Of</th>
            <th>Task Due</th>
          </tr>
        </thead>

        <tbody>
          {vendors.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No Vendor found
              </td>
            </tr>
          ) : (
            vendors.map((vendor) => (
              <tr key={vendor.id}>
                <td>{vendor.name}</td>
                <td>{vendor.phone}</td>
                <td>{vendor.email}</td>
                <td>{vendor.supplier}</td>
                <td>{vendor.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VendorsTable;
