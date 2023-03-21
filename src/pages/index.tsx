import Button from "@/components/Button/Button";
import { authenticate, register } from "@/services/authService";
import styles from "@/styles/Home.module.css";
import { LoginFormValues, RegisterFormValues } from "@/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import Router from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import * as yupLocale from "../config/locale";

yup.setLocale(yupLocale);

const loginSchema = yup.object().shape({
  email: yup.string().required().email().lowercase().trim(),
  password: yup.string().required().min(8),
});

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email().lowercase().trim(),
  password: yup.string().required().min(8),
});

export default function LoginPage() {
  const {
    register: loginFormRegister,
    handleSubmit: loginHandleSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerFormRegister,
    handleSubmit: registerHandleSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
  });

  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const handleLoginSubmit: SubmitHandler<LoginFormValues> = (data) => {
    authenticate(data).then((response) =>
      localStorage.setItem("accessToken", response.accessToken)
    );
    Router.push("/home");
  };

  const handleRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    register(data).then((response) =>
      localStorage.setItem("accessToken", response.accessToken)
    );
    Router.push("/home");
    handleCloseRegisterModal();
  };

  return (
    <div className={styles.container}>
      <form
        noValidate
        className={styles.authForm}
        onSubmit={loginHandleSubmit(handleLoginSubmit)}
      >
        <div className={styles.inputArea}>
          <input
            className={styles.inputField}
            placeholder="E-mail"
            type="email"
            {...loginFormRegister("email")}
          />
          {loginErrors.email && (
            <span className={styles.authFormError}>
              {loginErrors.email.message}
            </span>
          )}
        </div>
        <div className={styles.inputArea}>
          <input
            className={styles.inputField}
            placeholder="Senha"
            type="password"
            {...loginFormRegister("password")}
          />
          {loginErrors.password && (
            <span className={styles.authFormError}>
              {loginErrors.password.message}
            </span>
          )}
        </div>
        <Button style={"primary-light"} onClick={handleLoginSubmit}>
          Entrar
        </Button>
        <Button style={"secondary-light"} onClick={handleOpenRegisterModal}>
          Registrar
        </Button>
      </form>
      {isRegisterModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <form
              noValidate
              className={styles.authForm}
              onSubmit={registerHandleSubmit(handleRegisterSubmit)}
            >
              <div className={styles.authFormTitle}>
                <h5>Criar uma conta</h5>
                <button
                  className={styles.closeButton}
                  onClick={handleCloseRegisterModal}
                >
                  X
                </button>
              </div>
              <div className={styles.inputArea}>
                <input
                  className={styles.inputField}
                  placeholder="Nome"
                  type="text"
                  {...registerFormRegister("name")}
                />
                {registerErrors.name && (
                  <span className={styles.registerFormError}>
                    {registerErrors.name.message}
                  </span>
                )}
              </div>
              <div className={styles.inputArea}>
                <input
                  className={styles.inputField}
                  placeholder="E-mail"
                  type="email"
                  {...registerFormRegister("email")}
                />
                {registerErrors.email && (
                  <span className={styles.registerFormError}>
                    {registerErrors.email.message}
                  </span>
                )}
              </div>
              <div className={styles.inputArea}>
                <input
                  className={styles.inputField}
                  placeholder="Senha"
                  type="password"
                  {...registerFormRegister("password")}
                />
                {registerErrors.password && (
                  <span className={styles.registerFormError}>
                    {registerErrors.password.message}
                  </span>
                )}
              </div>
              <Button style={"primary-light"} onClick={handleOpenRegisterModal}>
                Enviar
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
