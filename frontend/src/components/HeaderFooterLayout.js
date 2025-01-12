import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggleThemeMode } from "../store/slices/themeSlice";

import ModalLayout from "./ModalLayout";

import { ConfigProvider, Layout, Menu, theme, Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

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
    const currentPath = location.pathname;
    console.log(themeMode);

    const switchOnChange = (checked) => {
        dispatch(toggleThemeMode());
    };

    const {
        token: {
            colorBgContainer, borderRadiusLG,
        },
    } = theme.useToken();

    return (
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
                        color: "white"
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
                <ModalLayout />
                <Switch
                    checkedChildren={<SunOutlined />}
                    unCheckedChildren={<MoonOutlined />}
                    onChange={switchOnChange}
                />
            </Header>
            <Content
                style={{
                    padding: "48px 48px",
                    margin: "0 48px",
                    background: colorBgContainer,
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
    )
}