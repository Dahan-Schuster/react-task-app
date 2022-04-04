import { FC, useContext } from "react"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import LoginForm from "../../components/LoginForm"
import AuthContext from "../../contexts/auth"

export const Login: FC = () => {

	return (
		<>
			<Header />
			<LoginForm />
			<Footer />
		</>
	)
}