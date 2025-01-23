import { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [state, setState] = useState("Sign Up");

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-green-300">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-green-200 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Crea una cuenta" : "Iniciar sesión"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Crea una cuenta"
            : "Inicia sesión en tu cuenta"}
        </p>
        <form>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#022237]">
              <img src={assets.person_icon} alt="" />
              <input
                className="bg-transparent outline-none"
                type="text"
                placeholder="Nombre Completo"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#022237]">
            <img src={assets.mail_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="email"
              placeholder="Correo"
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#022237]">
            <img src={assets.lock_icon} alt="" />
            <input
              className="bg-transparent outline-none"
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>
          <p className="mb-4 text-green-500 cursor-pointer">
            ¿Olvidaste tu contraseña?
          </p>
          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-900 text-white font-medium">
            {state === "Sign Up" ? "Regístrate" : "Iniciar sesión"}
          </button>
        </form>
        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Haz click aquí
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Regístrate
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
