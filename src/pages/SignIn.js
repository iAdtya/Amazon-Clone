import { useAuthValue } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuthValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    signIn(email.value, password.value);
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="mb-4 text-xl font-bold text-brown-500">SignIn</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            required
            className="w-full p-2 border border-brown-500 rounded"
            autoComplete="username"
          />
          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            required
            className="w-full p-2 border border-brown-500 rounded"
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="w-full p-2 bg-brown-500 text-white rounded bg-red-400"
          >
            Submit
          </button>
        </form>
        <div className="mt-4">
          <span className="mr-2 text-brown-500">or</span>
          <NavLink to="/signup" className="text-brown-500 hover:underline">
            Create New Account
          </NavLink>
        </div>
      </div>
    </div>
  );
}
