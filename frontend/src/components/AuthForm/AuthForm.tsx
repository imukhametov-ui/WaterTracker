import { useState, type FormEvent } from "react";
import eyeSlash from "../../assets/eyeslash.svg";

type AuthMode = "signin" | "signup";

type AuthFormClasses = Record<string, string>;

interface AuthFormProps {
  mode: AuthMode;
  classes: AuthFormClasses;
}

interface FormValues {
  email: string;
  password: string;
  repeatPassword: string;
}

type FieldName = keyof FormValues;
type FormErrors = Partial<Record<FieldName, string>>;

export default function AuthForm({ mode, classes }: AuthFormProps) {
  const isSignup = mode === "signup";

  const [values, setValues] = useState<FormValues>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const updateField = (name: FieldName, value: string) => {
    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: undefined,
      ...(name === "password"
        ? { repeatPassword: undefined }
        : {}),
    }));
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())
    ) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!values.password) {
      nextErrors.password = "Password is required";
    } else if (
      values.password.length < 8 ||
      values.password.length > 64
    ) {
      nextErrors.password = "Password must be 8–64 characters";
    }

    if (isSignup) {
      if (!values.repeatPassword) {
        nextErrors.repeatPassword = "Confirm your password";
      } else if (values.repeatPassword !== values.password) {
        nextErrors.repeatPassword = "Passwords do not match";
      }
    }

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Validation passed.
    // Authentication API will be integrated later.
  };

  const renderPasswordField = (
    name: "password" | "repeatPassword",
    label: string,
    visible: boolean,
    toggleVisibility: () => void,
  ) => {
    const error = errors[name];

    return (
      <div className={classes.field}>
        <label htmlFor={name} className={classes.label}>
          {label}
        </label>

        <div className={classes.passwordWrapper}>
          <input
            id={name}
            name={name}
            type={visible ? "text" : "password"}
            value={values[name]}
            onChange={(event) =>
              updateField(name, event.target.value)
            }
            placeholder={
              name === "password"
                ? "Password"
                : "Repeat password"
            }
            autoComplete={
              isSignup ? "new-password" : "current-password"
            }
            className={classes.passwordInput}
            aria-invalid={Boolean(error)}
            aria-describedby={
              error ? `${name}-error` : undefined
            }
          />

          <button
            type="button"
            className={classes.eyeButton}
            onClick={toggleVisibility}
            aria-label={
              visible ? "Hide password" : "Show password"
            }
            aria-pressed={visible}
          >
            <img src={eyeSlash} alt="" />
          </button>
        </div>

        {error && (
          <span
            id={`${name}-error`}
            role="alert"
            style={{ color: "#d32f2f", fontSize: "14px" }}
          >
            {error}
          </span>
        )}
      </div>
    );
  };

  return (
    <form
      className={classes.form}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={classes.field}>
        <label htmlFor="email" className={classes.label}>
          Enter your email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) =>
            updateField("email", event.target.value)
          }
          placeholder="E-mail"
          autoComplete="email"
          className={classes.input}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={
            errors.email ? "email-error" : undefined
          }
        />

        {errors.email && (
          <span
            id="email-error"
            role="alert"
            style={{ color: "#d32f2f", fontSize: "14px" }}
          >
            {errors.email}
          </span>
        )}
      </div>

      {renderPasswordField(
        "password",
        "Enter your password",
        showPassword,
        () => setShowPassword((previous) => !previous),
      )}

      {isSignup &&
        renderPasswordField(
          "repeatPassword",
          "Repeat password",
          showRepeatPassword,
          () => setShowRepeatPassword((previous) => !previous),
        )}

      <button
        type="submit"
        className={classes.submitButton}
      >
        {isSignup ? "Sign Up" : "Sign In"}
      </button>
    </form>
  );
}