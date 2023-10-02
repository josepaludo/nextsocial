import RegisterForm from "@/components/client/forms/RegisterForm";
import NavBar from "@/components/client/NavBar";
import LargeHeader from "@/components/general/LargeHeader";


export default function Register() {

    return (
        <>
            <LargeHeader content="Register" />
            <RegisterForm />
        </>
    )
}