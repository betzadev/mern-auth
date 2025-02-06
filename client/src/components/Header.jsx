import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Dashboard from "../pages/Dashboard";

const Header = () => {
  const { userData } = useContext(AppContext);

  if (userData) {
    return <Dashboard />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white">
      <img
        src={assets.header_img}
        alt="Logo de EDUTGS"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 text-[#022237]">
        ¡Hola Estudiante!
        <img src={assets.hand_wave} className="w-8 aspect-square" alt="" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4 text-[#3390bf]">
        Bienvenido a EDUTGS
      </h2>
      <p className="mb-8 max-w-md text-lg text-[#022237]">
        EDUTGS es tu herramienta educativa para dominar la Teoría General de
        Sistemas. Con un enfoque interactivo y dinámico, te ayudaremos a
        comprender y aplicar los conceptos clave de manera efectiva.
      </p>
      <button className="rounded-full px-8 py-2.5 text-white font-semibold transition-all duration-300 hover:bg-opacity-90 bg-[#6abb55]">
        Comenzar
      </button>
    </div>
  );
};

export default Header;
