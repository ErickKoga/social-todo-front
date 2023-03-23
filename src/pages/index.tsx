import Button from "@/components/Button/Button";
import styles from "@/styles/Home.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import * as yupLocale from "../config/locale";
import { LoginFormValues, RegisterFormValues } from "@/types/auth.types";
import { authenticate, register } from "@/services/authService";
import Router from "next/router";
import Head from "next/head";
import FormInput from "@/components/FormInput/FormInput";

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

  const handleLoginSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const token: { accessToken: string } = await authenticate(data);

    localStorage.setItem("accessToken", token.accessToken);
    Router.push("/feed");
  };

  const handleRegisterSubmit: SubmitHandler<RegisterFormValues> = async (
    data
  ) => {
    const token: { accessToken: string } = await register(data);
    localStorage.setItem("accessToken", token.accessToken);
    Router.push("/feed");
    handleCloseRegisterModal();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Social ToDo</title>
        <meta
          name="Social ToDo"
          content="Página inicial do teste de proficiência."
        />
      </Head>
      <form
        noValidate
        className={styles.authForm}
        onSubmit={loginHandleSubmit(handleLoginSubmit)}
      >
        <div className={styles.inputArea}>
          <FormInput
            placeholder="E-mail"
            type="email"
            register={loginFormRegister("email")}
          />
          {loginErrors.email && (
            <span className={styles.authFormError}>
              {loginErrors.email.message}
            </span>
          )}
        </div>
        <div className={styles.inputArea}>
          <FormInput
            placeholder="Senha"
            type="password"
            register={loginFormRegister("password")}
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
                <FormInput
                  placeholder="Nome"
                  type="text"
                  register={registerFormRegister("name")}
                />
                {registerErrors.name && (
                  <span className={styles.registerFormError}>
                    {registerErrors.name.message}
                  </span>
                )}
              </div>
              <div className={styles.inputArea}>
                <FormInput
                  placeholder="E-mail"
                  type="email"
                  register={registerFormRegister("email")}
                />
                {registerErrors.email && (
                  <span className={styles.registerFormError}>
                    {registerErrors.email.message}
                  </span>
                )}
              </div>
              <div className={styles.inputArea}>
                <FormInput
                  placeholder="Senha"
                  type="password"
                  register={registerFormRegister("password")}
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
