import { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import * as Tooltip from "@radix-ui/react-tooltip";

enum ValidationState {
  NONE = "none",
  VALID = "valid",
  INVALID = "invalid",
}

type Props<T extends FieldValues> = {
  id: string;
  name: Path<T>;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  validation?: RegisterOptions<T>;
  errors: Partial<Record<keyof T, any>>;
  touchedFields: Partial<Record<keyof T, boolean>>;
  dirtyFields: Partial<Record<keyof T, boolean>>;
  errorMessage?: string;
  showToggle?: boolean;
};

function ValidatedInput<T extends FieldValues>({
  id,
  name,
  type,
  placeholder,
  register,
  validation,
  errors,
  touchedFields,
  dirtyFields,
  errorMessage,
  showToggle = false,
}: Props<T>) {
  const [show, setShow] = useState(false);

  const isTouched = touchedFields[name];
  const isDirty = dirtyFields[name];
  const hasError = errors[name];

  const borderClass =
    !hasError && isDirty
      ? "border-green-500 focus:outline-green-600"
      : isTouched
      ? "border-red-500 focus:outline-red-600"
      : "border-gray-300 focus:outline-indigo-600";

  const validationState =
    !hasError && isDirty
      ? ValidationState.VALID
      : isTouched
      ? ValidationState.INVALID
      : ValidationState.NONE;

  return (
    <div>
      <div
        className={`flex items-center border rounded-md px-3 py-1.5 bg-white text-base text-gray-900 placeholder:text-gray-400 focus-within:outline focus-within:outline-2 focus-within:outline-indigo-600 sm:text-sm/6 ${borderClass}`}
      >
        <input
          id={id}
          type={showToggle ? (show ? "text" : "password") : type}
          placeholder={placeholder}
          autoComplete={id}
          {...register(name, validation)}
          className="flex-1 bg-transparent border-none outline-none placeholder:text-gray-400"
        />

        {/* Right-side icons */}
        <div className="flex items-center gap-2 ml-2">
          {validationState === ValidationState.INVALID && (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <InformationCircleIcon className="h-5 w-5 text-white bg-red-500 rounded-full p-0.5" />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded bg-gray-900 text-white px-2 py-1 text-sm shadow-lg"
                    side="top"
                    align="center"
                  >
                    {errorMessage || "Field is required"}
                    <Tooltip.Arrow className="fill-gray-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )}

          {showToggle && (
            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="text-gray-500"
              tabIndex={-1}
            >
              {show ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ValidatedInput;
