import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { revokeToast } from "../../redux/actions/toastAction";
import "./Toast.css";

export const CodeAnalogy = Object.freeze({
  SUCCESS: "#22c55e",
  ERROR: "#ef4444",
  WARN: "#facc15",
  INFO: "#3b82f6",
});

const Toast = () => {
  const dispatch = useDispatch();
  const { visible, code, title, message } = useSelector((state) => state.toast);

  useEffect(() => {
    setTimeout(() => {
      revokeToast();
    }, 2500);
  }, [visible]);

  return (
    <div className="toast-wrapper">
      {visible && (
        <div
          className={`toast-box ${visible ? "show" : "hide"}`}
          style={{ borderLeftColor: code }}
        >
          <div className="toast-content">
            <p className="toast-title" style={{ color: code }}>
              {title}
            </p>
            <p className="toast-message">{message}</p>
          </div>

          <button className="toast-close" onClick={() => dispatch(revokeToast())}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Toast;
