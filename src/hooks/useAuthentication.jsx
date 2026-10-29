import { db } from "../firebase/config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { auth } from "../firebase/config";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  //cleanup
  //dealwith memory leak
  const [cancelled, setCancelld] = useState(false);

  function cheackIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const login = async (data) => {
    cheackIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let systemErrorMessage;

      if (error.code === "auth/user-not-found") {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.code === "auth/wrong-password") {
        systemErrorMessage = "Senha incorreta.";
      } else if (error.code === "auth/invalid-credential") {
        systemErrorMessage = "E-mail ou senha incorretos.";
      } else {
        systemErrorMessage = "Ocorreu um erro ao tentar fazer login.";
      }

      setError(systemErrorMessage);

      setLoading(false);
    }
  };

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
    login,
  };
};
