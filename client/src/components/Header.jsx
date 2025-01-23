import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center mt-20 px-4 text-center text-gray-800">
      <img
        src={assets.header_img}
        alt=""
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2">
        ¡Hola!{" "}
        <img src={assets.hand_wave} alt="" className="w-8 aspect-square" />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">
        Bienvenido a EDUTGS
      </h2>
      <p className="mb-8 max-w-md">
        Somos una herramienta educativa diseñada para facilitar el aprendizaje de
        Teoría General de Sistemas en la carrera de Ingeniería en Informática de
        la Universidad Nacional Experimental Rómulo Gallegos (UNERG)
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-green-100 transition-all">
        ¡Empieza ya!
      </button>
    </div>
  );
};

export default Header;
