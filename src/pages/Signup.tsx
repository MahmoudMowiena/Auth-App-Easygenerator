import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/auth.service";
import { SignupFormInputs } from "../types/auth";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../utils/validators";
import ValidatedInput from "../components/common/ValidatedInput";
import { toast } from "react-toastify";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<SignupFormInputs>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  console.log(errors)

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      await signup(data);
      navigate("/login");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="easy-generator"
          src="/icons/easygenerator-seeklogo.svg"
          className="mx-auto h-16 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <ValidatedInput
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              register={register}
              validation={emailValidation}
              errors={errors}
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              errorMessage={errors.email?.message}
            />
          </div>

          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Name <span className="text-red-500">*</span>
            </label>

            <ValidatedInput
              id="name"
              name="name"
              type="name"
              placeholder="Your full name"
              register={register}
              validation={nameValidation}
              errors={errors}
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              errorMessage={errors.name?.message}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <ValidatedInput
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              register={register}
              validation={passwordValidation}
              errors={errors}
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              showToggle
              errorMessage={errors.password?.message}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>

            <ValidatedInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              register={register}
              validation={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              errors={errors}
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              showToggle
              errorMessage={errors.confirmPassword?.message}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
