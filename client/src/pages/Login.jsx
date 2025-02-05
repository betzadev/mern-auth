import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      let data;
      if (state === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });
        data = response.data;
        console.log("Sign Up Response:", data); // Debugging statement

        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        data = response.data;
        console.log("Login Response:", data); // Debugging statement

        if (data.success) {
          setIsLoggedIn(true);
          await getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error:", error); // Debugging statement
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-[#04a7f4] to-[#6abb55] animate-fade-in">
      <img
        onClick={() => navigate("/")}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer animate-slide-down"
        src={assets.logo}
        alt="Logo de EDUTGS"
      />
      <div className="bg-[#022237] p-10 rounded-lg shadow-lg w-full sm:w-96 text-[#dcfbff] animate-slide-up">
        <h2 className="text-3xl font-semibold text-[#dcfbff] text-center mb-3">
          {state === "Sign Up" ? "Crear Cuenta" : "Iniciar Sesión"}
        </h2>
        <p className="text-center text-sm mb-6 text-[#3390bf]">
          {state === "Sign Up"
            ? "Crea tu cuenta"
            : "¡Inicia sesión en tu cuenta!"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#022237] border border-[#04a7f4]">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-transparent outline-none placeholder-[#3390bf] flex-1"
                type="text"
                placeholder="Nombre completo"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#022237] border border-[#04a7f4]">
            <img src={assets.mail_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="bg-transparent outline-none placeholder-[#3390bf] flex-1"
              type="email"
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#022237] border border-[#04a7f4]">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="bg-transparent outline-none placeholder-[#3390bf] flex-1"
              type="password"
              placeholder="Contraseña"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 text-[#04a7f4] cursor-pointer hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </p>

          <button className="w-full py-2.5 rounded-full bg-[#6abb55] text-white font-medium hover:bg-[#5aa345] transition-colors">
            {state === "Sign Up" ? "Registrarse" : "Iniciar Sesión"}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-[#dcfbff] text-center text-xs mt-4">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-[#04a7f4] cursor-pointer underline hover:no-underline"
            >
              Inicia sesión aquí
            </span>
          </p>
        ) : (
          <p className="text-[#dcfbff] text-center text-xs mt-4">
            ¿No tienes una cuenta?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-[#04a7f4] cursor-pointer underline hover:no-underline"
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
