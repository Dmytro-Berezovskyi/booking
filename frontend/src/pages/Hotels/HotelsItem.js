import {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchHotels } from "../../store/thunks/hotelsThunk";

import { Col, Divider, Pagination, Row, ConfigProvider } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./style.css";

export default function HotelsItem({sortBy}) {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const hotels = useSelector((state) => state.hotels)
    const dispatch = useDispatch();

    const [sort, setSort] = useState("");

    useEffect(() => {
        if (sortBy) {
            localStorage.setItem("sort", JSON.stringify(sortBy));
        }
    });
    useEffect(() => {
        const sort = JSON.parse(localStorage.getItem("sort"));

        if (sort) {
            setSort(sort)
        }
    })

    useEffect(() => {
        dispatch(fetchHotels({ page: 1, sort }));
    }, [dispatch, sort]);

    const handlePageChange = (page) => {
        dispatch(fetchHotels({page: page, sort}));
    };

    return (
        <>
            {hotels.hotels.length !== 0 ? (
                <Row justify="space-around" style={{width:"100%", gap:"10px"}}>
                    {hotels.hotels.map((hotel) => {
                        return  <Col span={6} key={hotel.id}>

                            <div style={{display: "flex", flexDirection: "column"}}>
                                <NavLink to={`/hotel/${hotel.id}`}>
                                    <div style={{background: "grey", height: "150px"}}>
                                        <img
                                            src={hotel.photo} alt="hotel photo"
                                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                                        />
                                    </div>
                                    <h3>{hotel.name}</h3>
                                </NavLink>
                                <span style={{
                                    fontWeight: "bold",
                                    fontSize: "18px",
                                    color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")
                                }}
                                >
                                    Price per night: {hotel.price}$
                                </span>
                                <span
                                    style={{color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}>City: {hotel.city}</span>
                                <span
                                    style={{color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}>Address: {hotel.address}</span>
                            </div>

                            <Divider style={{borderWidth: "3px"}}/>
                        </Col>
                    })}
                </Row>
            ) : (
                <div style={{display: "flex", justifyContent: "center", gap: "10px", margin: "20px"}}>
                    <LoadingOutlined/>
                    <span style={{fontSize: "20px"}}>Loading...</span>
                </div>
            )}
            <ConfigProvider
                theme={{
                    components: {
                        Pagination: {
                            itemHoverBg: "#ffffff"
                        },
                    },
                }}
            >
            <div className={(themeMode === "dark" ? "dark" : "light")}>
                <Pagination
                    align="center"
                    current={hotels.currentPage}
                    total={hotels.total}
                    pageSize={6}
                    onChange={handlePageChange}
                />
            </div>

            </ConfigProvider>
        </>
    )
}