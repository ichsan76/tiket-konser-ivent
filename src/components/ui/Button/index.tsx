import styles from "./Button.module.scss";

type Propstypes = {
  type: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: string;
  className?: string;
  disabled?: boolean;
};

const Button = (props: Propstypes) => {
  const {
    type,
    onClick,
    children,
    variant = "primary",
    className,
    disabled,
  } = props;
  return (
    <div className={styles.login__form__other}>
      <button
        type={type}
        onClick={onClick}
        className={`${styles.button} ${styles[variant]} ${className}`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
