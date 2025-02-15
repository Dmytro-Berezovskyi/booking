import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../../store/slices/authSlice";

import { Button, Avatar, Card, Flex } from "antd";
import { EditOutlined, SettingOutlined, EllipsisOutlined } from "@ant-design/icons";

const actions = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <EllipsisOutlined key="ellipsis" />,
];

export default function Account() {
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.userData);
    const navigate = useNavigate();

    const handleLogout = async () => {
        dispatch(logoutUser());
        navigate("/")
    };

    return (
        <>
            <Flex gap="middle" align="center" vertical>
                <Card
                    actions={actions}
                    style={{
                        width: "50%",
                    }}
                >
                    <Card.Meta
                        avatar={
                            (userData.gender === "Female"
                                ? <Avatar src="https://api.dicebear.com/9.x/personas/svg?seed=Destiny" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}/>
                                : <Avatar src="https://api.dicebear.com/9.x/personas/svg?seed=Andrea" size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}/>)}
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