import { useSelector } from "react-redux";

import ModalLogIn from "./Layout/ModalLogIn";

export default function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user.user);

    return user ? children : <ModalLogIn/>;
}