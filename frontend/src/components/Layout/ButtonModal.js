import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { openModal } from "../../store/slices/authSlice";

import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";


export default function ButtonModal() {
    const userData = useSelector((state) => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showModal = () => {
        if (localStorage.getItem("user")) {
            navigate("/account");
        } else {
            dispatch(openModal(true));
        }
    };

    return (
        <>
            {(localStorage.getItem("user") ? <span>Hello {userData.name}!</span> : null)}
            <Button onClick={showModal} className="custom-button" icon={<UserOutlined className="custom-icon" />}>
                <span className="custom-text">Account</span>
            </Button>
        </>
    )
}