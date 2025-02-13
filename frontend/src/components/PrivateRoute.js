import { useSelector } from "react-redux";

import ModalLayout from "./Layout/ModalLayout";

export default function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user);
    console.log(user);

    return user !== null ? children : <ModalLayout/>;
}