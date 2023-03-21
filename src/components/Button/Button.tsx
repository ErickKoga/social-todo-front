import React from "react";
import styles from "./Button.module.css";
interface Props {
  children: React.ReactNode;
  onClick: any;
  style?: string;
  size?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  style = "primary-dark",
  size = "medium",
  disabled = false,
}) => {
  return (
    <button
      className={
        `${styles.button} ${styles[style]} ${styles[size]}` +
        (disabled ? " disabled" : "")
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
