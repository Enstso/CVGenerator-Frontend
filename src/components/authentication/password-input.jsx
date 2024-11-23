import { forwardRef, useState } from "react";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";

const PasswordInput = forwardRef((props, ref) => {
  const { className = "", ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);
  const disabled =
    props.value === "" || props.value === undefined || props.disabled;

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className={`hide-password-toggle pr-10 ${className}`}
        ref={ref}
        {...rest}
      />
      <button
        type="button"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled}
      >
        {showPassword && !disabled ? (
          <EyeOpenIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeNoneIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </button>

      {/* hides browsers password toggles */}
      <style>{`
        .hide-password-toggle::-ms-reveal,
        .hide-password-toggle::-ms-clear {
          visibility: hidden;
          pointer-events: none;
          display: none;
        }
      `}</style>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
