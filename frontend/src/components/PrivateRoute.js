import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "../pages/Home/index";

import { openModal } from "../store/slices/authSlice";

export default function PrivateRoute({ children }) {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(openModal(true))
        }
    }, [user]);

    return user ? children : <Home />;
}