import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import { useState } from "react";

const App = () => {
	const [activo, setActivo] = useState(false);

	return (
		<>
			<button onClick={() => setActivo(!activo)}>Cambiar</button>
			{activo ? <p>Activo</p> : <p>Inactivo</p>}
		</>
	);
};

export default App;
