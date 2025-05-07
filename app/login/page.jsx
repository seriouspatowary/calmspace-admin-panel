"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/ui/login/login.module.css";
import { authenticate } from "../lib/actions";
import useToast from "../hooks/useToast";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToast();


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");         
    setLoading(true);     

    const formData = new FormData(e.target);
    const result = await authenticate(formData);

    if (result.success) {
        showSuccess("LoggedIn successfully!");
        router.push("/dashboard");
    } else {
      setLoading(false);  
      showError(result.message || "Failed to login!");
      setError(result.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        {error && <p className={styles.error}>{error}</p>}
        {loading ? (
          <div className={styles.loader}></div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
