import styles from "./Textarea.module.scss";

type Proptypes = {
  label?: string;
  name: string;
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  onChange?: (e: any) => void;
  className?: string;
};

const Textarea = (props: Proptypes) => {
  const {
    label,
    name,
    placeholder,
    defaultValue,
    disabled,
    onChange,
    className,
  } = props;

  return (
    <div className={`${styles.container} ${className}`}>
      {label && (
        <label className={styles.container__label} htmlFor={name}>
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        className={styles.container__input}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
