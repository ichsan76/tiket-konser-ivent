import styles from "./Input.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  type: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Input = (props: Proptypes) => {
  const {
    label,
    name,
    type,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;

  return (
    <div className={`${styles.container} ${className}`}>
      {label && <label className={styles.container__label} htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        className={styles.container__input}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
