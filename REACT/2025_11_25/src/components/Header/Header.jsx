import "./Header.css";
import Flex from "../Flex/Flex";
import Button from "../Button/Button";

const Header = () => {
	return (
		<header>
			<Flex>
				<h1>Titulo</h1>
				<p>Esta es la descripción</p>
			</Flex>
		</header>
	);
};

export default Header;
