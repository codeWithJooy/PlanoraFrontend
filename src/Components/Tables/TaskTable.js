import React from "react";
import "./table.css";

const TaskTable = ({ tasks }) => {
  return (
    <div className="table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Event</th>
            <th>SubEvent</th>
            <th>Due Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No events found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskName}</td>
                <td>{task.eventName}</td>
                <td>{task.subEventName}</td>
                <td>{task.dueDate}</td>
                <td>
                  <span className={`status ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
