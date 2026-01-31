import { useState } from "react";
import { Transition } from "@headlessui/react";
import { UserCircleIcon, KeyIcon } from "@heroicons/react/24/solid";
import { JSX } from "react";
// import { useAuthStore } from "./stores/authStore"; // optional

export default function LoginPage(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // const login = useAuthStore((s) => s.login);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      //call
      await new Promise((r) => setTimeout(r, 800));
    } catch (err: any) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="
          bg-slate-200 shadow-md rounded-lg
          p-6 w-80 max-w-md
          flex flex-col items-center
        "
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <div
            className="w-36 h-36 bg-center bg-contain bg-no-repeat"
            style={{
              backgroundImage: "url('/android-chrome-512x512.png')",
            }}
          />
        </div>

        {/* Username */}
        <div className="mb-3 w-full">
          <div className="relative">
            <UserCircleIcon className="size-6 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoComplete="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full border border-gray-400 rounded-md
                p-2 pl-12
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              "
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4 w-full">
          <div className="relative">
            <KeyIcon className="size-6 text-sky-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="password"
              autoComplete="current-password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full border border-gray-400 rounded-md
                p-2 pl-12
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              "
              required
            />
          </div>
        </div>

        {/* Error message */}
        <Transition
          show={!!error}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="mb-3 text-sm text-red-600 text-center">{error}</div>
        </Transition>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-2 rounded-md font-semibold text-white
            bg-gradient-to-r from-green-500 to-cyan-500
            hover:from-green-600 hover:to-cyan-600
            transition-all shadow-md hover:shadow-lg
            active:scale-[0.98]
            ${loading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
