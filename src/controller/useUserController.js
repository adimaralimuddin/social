import { userState } from "../state/userState"


export default function () {

    const user = userState(state => state.user)


    const listen = async () => {
        console.log({ user });
    }


    return {
        listen,
    }

}