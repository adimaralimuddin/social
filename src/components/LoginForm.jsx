import useAuth from "../firebase/auth"

function LoginForm() {

    const { loginWithGoogle, loginWithEmailAndPassword } = useAuth();

    function onSubmit(e) {
        e.preventDefault()
        const { email, password } = e.target
        loginWithEmailAndPassword(email.value, password.value)
    }


    return (
        <div action="" className=" flxCCenter white shadow1 b p20 br m mnh400 mnw300">
            <form onSubmit={onSubmit} className="flxCCenter">
                <h2>login</h2>
                <FormInput name='email' label='email' />
                <FormInput name='password' label='password' />
                <button>login</button>
            </form>
            <button onClick={loginWithGoogle}>login with google</button>
        </div>
    )
}

export default LoginForm

function FormInput({ label, name }) {
    return (
        <span className="flxC">
            <label htmlFor={label} className="ml5">{label}</label>
            <input name={name || label} type="text" className="gains" />
        </span>
    )
}
