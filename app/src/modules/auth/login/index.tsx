import AuthRepository from "../../../api/repositories/AuthRepository";
import { useState } from "react";
import { pbClient } from "../../../api/client";

export default function LoginModule() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("email: ", email);
    console.log("password: ", password);

    try {
      const result = await AuthRepository.login(email, password);
      console.log("dapat result: ", result);

      console.log("authStore isvalid: " + pbClient.authStore.isValid);
      console.log("authStore record id: " + pbClient.authStore.record?.id);
      console.log("authStore token: " + pbClient.authStore.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#e5e7eb_1px,_transparent_1px)]
                   [background-size:20px_20px] opacity-100"
      ></div>

      {/* Login card */}
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-md sm:p-10">
        <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Login
        </h1>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700
                         focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-700
                         focus:border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-800"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gray-800 py-2 text-white transition hover:bg-gray-700"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-gray-800 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
