import { UseFormRegisterReturn } from "react-hook-form";
import styles from "./FormInput.module.css";

interface Props {
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
}

const FormInput: React.FC<Props> = ({ placeholder, type, register }) => {
  return (
    <div className={styles.formInputArea}>
      <input
        className={styles.formInput}
        placeholder={placeholder}
        type={type}
        {...register}
      />
    </div>
  );
};

export default FormInput;
