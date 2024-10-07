import React from "react";
import { useEffect } from "react";
import { resendVerification, setToken } from "../../services/auth";

function VerifyAccount() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  async function handleResendVerification(event) {
    try {
    event.preventDefault()
      await resendVerification();
      alert("Verification email has been resent.");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while resending the verification email.");
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>¡Verifica tu correo!</h2>
      <p style={styles.message}>
        Hemos enviado un correo electrónico con un enlace de verificación a tu
        dirección. Por favor, revisa tu bandeja de entrada y sigue las
        instrucciones para verificar tu cuenta y poder acceder a nuestros
        servicios.
      </p>
      <form>
        {/* Agrega un token CSRF para la protección contra ataques CSRF */}
        <input type="hidden" name="_token" />
        <button style={styles.button} onClick={handleResendVerification}>
          Reenviar enlace de verificación
        </button>
      </form>
      <p style={styles.note}>
        Si no recibes el correo en unos minutos, revisa tu carpeta de spam o
        intenta reenviarlo.
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f7f7f7",
    maxWidth: "400px",
    margin: "0 auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "24px",
    color: "#333",
  },
  message: {
    fontSize: "16px",
    color: "#555",
  },
  note: {
    fontSize: "14px",
    color: "#888",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default VerifyAccount;
