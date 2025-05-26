import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth.service";
import { LoginFormInputs } from "../types/auth";
import { emailValidation } from "../utils/validators";
import ValidatedInput from "../components/common/ValidatedInput";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<LoginFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await login(data);
      localStorage.setItem("token", res.access_token);
      navigate("/home");
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Login failed. Please try again."
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
          Sign in to your account
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
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password <span className="text-red-500">*</span>
              </label>
            </div>
            <ValidatedInput
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              register={register}
              validation={{ required: "Password is required" }}
              errors={errors}
              touchedFields={touchedFields}
              dirtyFields={dirtyFields}
              showToggle
              errorMessage={errors.password?.message}
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
