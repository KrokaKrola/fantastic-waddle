import React from "react";
import { Toast } from "react-bootstrap";
import { useAppState } from "./app-state";
import { uniqueId } from "./utils";

const ToastComponent = () => {
  const [{ errors }, dispatch] = useAppState();
  const closeToast = index => {
    const newErrors = errors.filter((value, i) => i !== index);
    dispatch({ type: "CHANGE_ERRORS_STATE", errors: newErrors });
  };

  return (
    <>
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          right: 15,
          bottom: 15,
          minHeight: "75px"
        }}
      >
        {errors &&
          errors.map((error, index) => (
            <Toast
              key={uniqueId()}
              onClose={() => closeToast(index)}
              delay={3000}
              autohide
              animation={true}
            >
              <Toast.Header>
                <strong className="mr-auto">Error</strong>
              </Toast.Header>
              <Toast.Body>{error.message}</Toast.Body>
            </Toast>
          ))}
      </div>
    </>
  );
};

export default ToastComponent;
