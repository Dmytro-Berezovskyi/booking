import { useSelector } from "react-redux";

import HotelsItem from "./HotelsItem";

import { Divider, Flex, Select } from "antd";
import {useState} from "react";

export default function Hotels() {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const [sortBy, setSortBy] = useState("");

    const handleChange = (value) => {
        setSortBy(value);
    }

    console.log(sortBy);

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

            <Flex align="center" justify="space-between" style={{marginLeft: "4%", marginRight: "4%"}}>
                <h4 style={{
                    color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.50)")
                }}
                >
                    Choose the best hotel for yourself
                </h4>
                <Select
                    placeholder="Sort by:"
                    style={{width: 200}}
                    onChange={handleChange}
                    options={[
                        {value: "priceLowest", label: "Price (lowest first)"},
                        {value: "priceHighest", label: "Price (highest first)"},
                        {value: "ratingHigh", label: "Rating (high to low)"},
                        {value: "ratingLow", label: "Rating (low to high)"},
                    ]}
                />
            </Flex>

            <HotelsItem/>
        </>
    )
}