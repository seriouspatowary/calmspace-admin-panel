import { toast } from 'react-hot-toast';
import { createElement } from 'react';


const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message);
  };

  const showError = (message) => {
    toast.error(message);
  };

  const showMessage = (message) => {
    toast(message);
  };
 
  const showConfirm = ({ message, onConfirm, onCancel }) => {
  toast.custom((t) =>
    createElement(
      "div",
      {
        style: {
          background: "#1e293b", // dark background
          color: "#f1f5f9",       // light text
          padding: "1.25rem",
          borderRadius: "10px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          width: "100%",
          maxWidth: "320px",
          fontFamily: "'Inter', sans-serif",
        },
      },
      createElement("p", {
        style: {
          marginBottom: "1rem",
          fontSize: "0.95rem",
          lineHeight: "1.4",
        },
      }, message),
      createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.75rem",
          },
        },
        createElement(
          "button",
          {
            onClick: () => {
              toast.dismiss(t.id);
              onCancel?.();
            },
            style: {
              padding: "6px 14px",
              backgroundColor: "#475569",
              color: "#e2e8f0",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background 0.2s ease",
            },
            onMouseOver: (e) => {
              e.target.style.backgroundColor = "#64748b";
            },
            onMouseOut: (e) => {
              e.target.style.backgroundColor = "#475569";
            },
          },
          "Cancel"
        ),
        createElement(
          "button",
          {
            onClick: () => {
              toast.dismiss(t.id);
              onConfirm?.();
            },
            style: {
              padding: "6px 14px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "background 0.2s ease",
            },
            onMouseOver: (e) => {
              e.target.style.backgroundColor = "#2563eb";
            },
            onMouseOut: (e) => {
              e.target.style.backgroundColor = "#3b82f6";
            },
          },
          "Confirm"
        )
      )
    )
  );
};


  return {
    showSuccess,
    showError,
      showMessage,
    showConfirm
  };
};

export default useToast;
