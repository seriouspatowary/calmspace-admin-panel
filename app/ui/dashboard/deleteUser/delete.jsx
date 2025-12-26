"use client";

import { deleteUser } from "../../../lib/actions";
import { Trash2 } from "lucide-react";
import useToast from "../../../hooks/useToast";
import styles from "../../../ui/dashboard/users/users.module.css"


const DeleteButton = ({ userId }) => {
  const { showConfirm, showSuccess, showError } = useToast();

  const handleDelete = async () => {
    showConfirm({
      message: "Are you sure you want to delete this User?",
      onConfirm: async () => {
        const res = await deleteUser(userId);
        if (res.success) {
          showSuccess("User has been deleted successfully");
        } else {
          showError("Failed to delete User");
        }
      },
    });
  };

  return (
    <button
      onClick={handleDelete}
      className={styles.deleteBtn}
      title="Delete User"
    >
      <Trash2 size={18} />
    </button>
  );
};

export default DeleteButton;
