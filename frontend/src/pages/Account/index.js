import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { logoutUser } from "../../store/slices/authSlice";

import { Button, Avatar, Card, Flex } from "antd";
import { EditOutlined, SettingOutlined, EllipsisOutlined } from "@ant-design/icons";


const actions = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

export default function Account() {
    const currentUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, "users", currentUser.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log("Документ не знайдено!");
                }
            } catch (error) {
                console.error("Помилка отримання даних:", error);
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleLogout = async () => {
        await signOut(auth);
        dispatch(logoutUser());
        navigate("/")
    };

    return (
        <>


            <Flex gap="middle" align="start" vertical>
                <Card
                    actions={actions}
                    style={{
                        minWidth: 300,
                    }}
                >
                    <Card.Meta
                        avatar={
                            (userData.gender === "Female"
                                ? <Avatar src="https://api.dicebear.com/9.x/personas/svg?seed=Destiny" />
                                : <Avatar src="https://api.dicebear.com/9.x/personas/svg?seed=Andrea"/> )}
                        title={
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span>{userData.name}</span>
                                <Button onClick={handleLogout}>Sign Out</Button>
                            </div>
                        }
                        description={
                            <>
                                <p>Email: {userData.email}</p>
                                <p>Gender: {userData.gender}</p>
                            </>
                        }
                    />
                </Card>
            </Flex>
        </>
    )
}