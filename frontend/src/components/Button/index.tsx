import { CSSProperties } from "react";
import { ButtonContainer } from "./styles";

interface IButtonProps {
	title: string;
	onClick?(): void,
	variant?: "accent" | "pink",
	type?: "button" | "submit" | "reset" | undefined;
	styles?: CSSProperties,
}

const Button = ({ onClick, title, variant = "accent", type = "button", styles = {}, ...rest }: IButtonProps) => {
	return (
		<ButtonContainer
			type={type}
			onClick={onClick}
			className={variant}
			style={styles}
			{...rest}
		>
			{title}
		</ButtonContainer>
	)
}

export default Button;