import {NavLink, Outlet, useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggleThemeMode } from "../../store/slices/themeSlice";

import ModalLayout from "./ModalLayout";

import {ConfigProvider, Layout, Menu, theme, Switch, Button, Flex} from "antd";
import { SunOutlined, MoonOutlined, ShoppingCartOutlined } from "@ant-design/icons";

import "./style.css";

const { Header, Content, Footer } = Layout;

const items = [
    {
        key: "/",
        label: <NavLink to="/" style={{ textDecoration: "none" }}>Home</NavLink>,
    },
    {
        key: "/about",
        label: <NavLink to="/about" style={{ textDecoration: "none" }}>About</NavLink>,
    },
    {
        key: "/hotels",
        label: <NavLink to="/hotels" style={{ textDecoration: "none" }}>Hotels</NavLink>,
    },
];

export default function HeaderFooterLayout () {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;

    const switchOnChange = (checked) => {
        dispatch(toggleThemeMode());
    };

    const {
        token: {
            colorBgContainer, borderRadiusLG,
        },
    } = theme.useToken();

    return (
        <ConfigProvider
            theme={{
                components: {
                    Switch: {
                        colorPrimary: "",
                        colorPrimaryHover: "rgba(112,112,112,0.60)",
                        handleBg: (themeMode === "dark" ? "rgb(206,178,149)" : "rgb(255,213,118)")
                    },
                    Layout: {
                        headerBg: (themeMode === "dark" ? "#001529" : "#ffffff"),
                        bodyBg: (themeMode === "dark" ? "#707070" : "#f5f5f5"),
                        footerBg: (themeMode === "dark" ? "#707070" : "#f5f5f5"),
                        triggerColor: (themeMode === "dark" ? "#001529" : "#ffffff"),
                    },
                },
            }}
        >
            <Layout>
                <Header
                    style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "50px"
                    }}
                    theme={themeMode}
                >
                    <NavLink to={"/"} style={{
                        border: "3px solid white",
                        borderColor: (themeMode === "dark" ? "#ffffff" : "#000000"),
                        padding: "5px",
                        marginRight: "10px",
                        height: "85%",
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <h1 style={{
                            textTransform: "uppercase",
                            fontWeight: "800",
                            fontSize: "20px",
                            margin: 0,
                            color: (themeMode === "dark" ? "#FFFFFF" : "#000000")
                        }}>
                            Plan&Stay
                        </h1>
                    </NavLink>

                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={currentPath}
                        items={items}
                        style={{flex: 1, minWidth: 0}}
                        theme={themeMode}
                    />
                    <Flex gap="20px" align="center" style={{marginRight: "20px"}}>
                        <ModalLayout/>

                        <Button
                            className="custom-button"
                            icon={<ShoppingCartOutlined className="custom-icon"/>}
                            onClick={() => {navigate("/cart")}}
                        >
                            <span className="custom-text">Cart</span>
                        </Button>
                    </Flex>

                    <Switch
                        checkedChildren={<MoonOutlined/>}
                        unCheckedChildren={<SunOutlined/>}
                        onChange={switchOnChange}
                    />

                </Header>
                <Content
                    style={{
                        padding: "48px 48px",
                        margin: "0 48px",
                        background: (themeMode === "dark" ? "#001529" : "#ffffff"),
                        minHeight: "82vh",
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </ConfigProvider>
    )
}