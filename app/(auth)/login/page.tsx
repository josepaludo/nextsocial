import LoginForm from "@/components/client/forms/LoginForm";
import NavBar from "@/components/client/NavBar";
import LargeHeader from "@/components/general/LargeHeader";


export default function Login() {

    return (
        <>
            <LargeHeader content="Login" />
            <LoginForm />
        </>
    )
}