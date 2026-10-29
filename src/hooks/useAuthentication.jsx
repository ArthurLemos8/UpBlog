import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  //dealwith memory leak
  const [cancelled, setCancelld] = useState(false);

  const auth = getAuth();

  function cheackIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const creatUser = async (data) => {
    cheackIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);

      return user;
    } catch (error) {
      console.log("Código:", error.code);
      console.log("Mensagem:", error.message);

      let systemErrorMessage;

      if (error.code === "auth/weak-password") {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.code === "auth/email-already-in-use") {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, tente novamente.";
      }
      setLoading(false);
      setError(systemErrorMessage);
    }
  };

  useEffect(() => {
    return () => setCancelld(true);
  }, []);

  return {
    auth,
    creatUser,
    error,
    loading,
  };
};
