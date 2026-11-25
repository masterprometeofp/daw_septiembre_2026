import "./Button.css";

const Button = ({ children }) => {
	return (
		<button
			onClick={() => {
				console.log("Hola");
			}}
		>
			{children}
		</button>
	);
};

export default Button;
