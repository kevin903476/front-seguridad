import {
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import Inicio from "../pages/Inicio";
import GooeyNav from "../react-bit/GooeyNav/GooeyNav";
import logo from "../assets/utn_logo-removebg-preview.png";
import EstudianteForm from "../components/EstudianteForm";
import Formularios from "../pages/Formularios";

const RouterPrincipal = () => {
  const items = [
    { label: "Inicio", href: "/inicio" },
    { label: "Registro", href: "/registro" },
    { label: "Estadistica", href: "#" },
  ];

  return (
    <BrowserRouter>

      <nav className=" text-white px-6 bg-blue-900 w-full" >
        <div className="flex justify-between items-center h-24 p-16">
          {/* Imagen a la izquierda */}
          <div className="flex items-center gap-3 ">
            <img src={logo} alt="Logo" className="h-32 w-auto" />
          </div>

          {/* Navegación Gooey a la derecha */}
          <div className="relative ">
            <div style={{  position: "relative" }}>
              <GooeyNav
                items={items}
                particleCount={15}
                particleDistances={[90, 10]}
                particleR={100}
                initialActiveIndex={0}
                animationTime={600}
                timeVariance={300}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
              />
            </div>
          </div>
        </div>
      </nav>
      <main >
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/registro" element={<Formularios/>} />
          <Route path="/otro" element={"#"} />

          <Route path="*" element={"#"} />
        </Routes>
      </main>

      {/*    <footer>
            <h1>Pie de página</h1>
          </footer> */}
    </BrowserRouter>
  );
};

export default RouterPrincipal;
