"use client";

import useToast from "@/app/hooks/useToast";
import { verifyCounselor } from "@/app/lib/actions"
import styles from "../users/users.module.css"

const VerifyButton = ({ userId }) => {
  const { showConfirm, showSuccess, showError } = useToast();

  const handleVerify = () => {
    showConfirm({
            message: "Are you sure you want to verify this counselor?",
            onConfirm: async () => {
              try {
                await verifyCounselor({ userId });
                showSuccess("Counselor verified successfully!");
              } catch (error) {
                showError("Verification failed.");
              }
            },
          });
  };

  return (
    <button onClick={handleVerify} className={styles.verifyBtn}>
      Verify
    </button>
  );
};

export default VerifyButton;
