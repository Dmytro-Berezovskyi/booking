import { useSelector } from "react-redux";

import HotelsItem from "./HotelsItem";

import { Divider } from "antd";

export default function Hotels() {
    const themeMode = useSelector((state) => state.theme.themeMode);

    return (
        <>
            <Divider orientation="left" style={{borderColor: (themeMode === "dark" ? "rgba(255,255,255,0.20)" : "rgba(5,5,5,0.06)")}}>
                <h1 style={{
                    textTransform: "uppercase",
                    fontWeight: "800",
                    fontSize: "25px",
                    margin: 0,
                    color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}
                >
                    All Hotels
                </h1>
            </Divider>
            <h4 style={{
                marginLeft: "4%",
                color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.50)")}}
            >
                Choose the best hotel for yourself
            </h4>
            <HotelsItem/>
        </>
    )
}