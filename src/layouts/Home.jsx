import LoginForm from "../components/LoginForm"

function Home() {
    return (
        <div className="flxCenter h100per p20 wrap pt50 ">
            <div className=" textLeft p">
                <h1>welcome to social</h1>
                <p>do it your way in social platform production</p>
            </div>
            <LoginForm />
        </div>
    )
}

export default Home
