import React from "react";
import "./App.css";
//Añadir, completar, filtrar (todas / hechas / pendientes), localStorage.

function App() {
  // Estado para el valor del input
  const [valor, setValor] = React.useState("");

  // Estado para la lista de tareas que se van a imprimir
  const [lista, setLista] = React.useState([]);

  // Estado para el filtro
  const [filtro, setFiltro] = React.useState("todas");

  // Estado para mostrar u ocultar los botones del filtro
  const [panel, setPanel] = React.useState(false);

  function handleChange(e) {
    setValor(e.target.value);
  }

  // Cuando se pulse el boton se añade la tarea del input
  function handleAnadir() {
    const actualText = valor.trim();

    // Creamos lista de objetos
    const nuevaTarea = {
      id: Date.now(),
      texto: actualText,
      hecha: false,
    };

    if (actualText === "") return;
    setLista([...lista, nuevaTarea]);

    // Limpiamos el valor del imput para que salga limpio
    setValor("");
  }

  //* Creamos lista filtrada
  let listaVisible = lista;

  // Si es hechas imprimo hechas sin tocar la lista origonal por eso he creado otra variable de listas
  if (filtro === "hechas") {
    listaVisible = lista.filter((tarea) => tarea.hecha === true);
  }

  // Lo mismo para las pendientes
  if (filtro === "pendientes") {
    listaVisible = lista.filter((tarea) => tarea.hecha === false);
  }

  function handleReset() {
    // Cuando se pulse el boton se añade la tarea del input
    setLista([]);
  }

  function handleFilter(filtro) {
    setFiltro(filtro);

    setPanel(false);
  }

  function handleDelete(id) {
    setLista(lista.filter((tarea) => tarea.id !== id));
  }

  function handleHecha(id) {
    setLista(
      lista.map((tarea) => {
        if (tarea.id !== id) return tarea;
        {
          return { ...tarea, hecha: !tarea.hecha };
        }
      }),
    );
  }
  //* Renders
  return (
    <div className="App">
      <header>
        <h1>Lista de tareas</h1>
        <input
          type="text"
          value={valor}
          onChange={handleChange}
          placeholder="Escribe una tarea..."
        />
        <button onClick={handleAnadir}>Añadir</button>
        <button onClick={handleReset}>Limpiar</button>
        <button onClick={() => setPanel(true)}>Filtrar</button>
        {panel && (
          <div>
            <button onClick={() => handleFilter("todas")}>Todas</button>
            <button onClick={() => handleFilter("hechas")}>Hechas</button>
            <button onClick={() => handleFilter("pendientes")}>
              Pendientes
            </button>
          </div>
        )}
      </header>

      <div>
        <h3>Tareas</h3>
        <div className="tareas">
          <ul>
            {listaVisible.map((tarea) => (
              <li key={tarea.id}>
                <span
                  style={{
                    textDecoration: tarea.hecha ? "line-through" : "none",
                    marginRight: "10px",
                  }}
                >
                  {tarea.texto}
                </span>
                <button className="hecho" onClick={() => handleHecha(tarea.id)}>
                  Hecha
                </button>
                <button
                  className="hecho"
                  onClick={() => handleDelete(tarea.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
