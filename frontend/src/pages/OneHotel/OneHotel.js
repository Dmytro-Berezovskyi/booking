import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { setReserve } from "../../store/slices/reservedHotelsSlice";
import { fetchOneHotel } from "../../store/thunks/oneHotelThunk";

import {Button, Divider, Rate} from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function OneHotel() {
    const { id } = useParams();
    const themeMode = useSelector((state) => state.theme.themeMode);
    const hotel = useSelector(state => state.oneHotel.hotel);
    const dispatch = useDispatch();

    const reservedHotels = useSelector((state) => state.reservedHotels.reservedHotels);

    useEffect(() => {
        dispatch(fetchOneHotel({ id }))
    }, [dispatch]);

    const handleReserve = () => {
        dispatch(setReserve(hotel))
        localStorage.setItem("reserved_hotels", JSON.stringify(reservedHotels))
    }

    return (
        <>
            {hotel.length !== 0 ? (
                <div style={{display: "flex", flexDirection: "column"}}>
                    <div style={{background: "grey", height: "60vh", width: "90%", marginLeft: "auto", marginRight: "auto"}}>
                        <img
                            src={hotel.photo} alt="hotel photo"
                            style={{width: "100%", height: "100%", objectFit: "cover"}}
                        />
                    </div>
                    <div style={{width: "90%", marginLeft: "auto", marginRight: "auto"}}>
                        <Divider
                            orientation="left"
                            style={{borderColor: (themeMode === "dark" ? "rgba(255,255,255,0.20)" : "rgba(5,5,5,0.06)")}}
                        >
                            <h1 style={{
                                textTransform: "uppercase",
                                fontWeight: "800",
                                fontSize: "25px",
                                margin: 0,
                                color: (themeMode === "dark" ? "#ffffff" : "#111111")}}
                            >
                                {hotel.name}
                                <Rate disabled value={hotel?.hotel_rating || 0} style={{marginLeft: "15px"}} />
                                <Button
                                    type="primary"
                                    fontWeight="bold"
                                    size="large"
                                    style={{marginLeft: "15px"}}
                                    onClick={handleReserve}
                                >
                                    <span style={{fontWeight: "bold"}}>Reserve your hotel room</span>
                                </Button>
                            </h1>
                        </Divider>

                        <div style={{display: "flex", gap: "20px"}}>
                            <span style={{
                                    fontStyle: "italic",
                                    color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")}}
                            >
                                City: {hotel.city} {hotel.country_code}
                            </span>
                            <span style={{
                                fontStyle: "italic",
                                color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")}}
                            >
                                Address: {hotel.address}
                            </span>
                            {hotel.phone_number ? (
                                <span style={{
                                    fontStyle: "italic",
                                    color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")
                                }}>
                                    Phone number: {hotel.phone_number}
                                </span>
                            ) : null}
                            {hotel.website ? (
                                <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                                    <span style={{
                                        fontStyle: "italic",
                                        color: (themeMode === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)")
                                    }}>
                                    Website: {hotel.website}
                                </span>
                                </a>
                            ) : null}
                        </div>

                        <p style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            color: (themeMode === "dark" ? "#ffffff" : "#111111")}}
                        >
                            {hotel.description}
                        </p>
                    </div>

                </div>
            ) : (
                <div style={{display: "flex", justifyContent: "center", gap: "10px", margin: "20px"}}>
                    <LoadingOutlined/>
                    <span style={{fontSize: "20px"}}>Loading...</span>
                </div>
            )}
        </>
    )
}