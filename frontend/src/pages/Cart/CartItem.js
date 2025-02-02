import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import { Form, Field, ErrorMessage, Formik } from "formik";

import { removeReserve } from "../../store/slices/reservedHotelsSlice";

import {Button, DatePicker, Flex} from "antd";
import dayjs from "dayjs";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";

export default function CartItem () {
    const themeMode = useSelector((state) => state.theme.themeMode);
    const reservedHotels = useSelector((state) => state.reservedHotels.reservedHotels);
    const details = JSON.parse(localStorage.getItem("details"));
    const dispatch = useDispatch();

    const initialValues = {
        checkIn: dayjs().format(details.checkIn),
        checkOut: dayjs().format(details.checkOut),
        adults: details.adults,
        children: details.children,
    }

    const handleRemove = (id) => {
        dispatch(removeReserve(id));
    }

    const handleChangeDetails = (values) => {
        localStorage.setItem("details", JSON.stringify(values));
    }

    return (
        <div>
            {reservedHotels.length > 0 ? (
                <Flex vertical gap="20px">
                    <span
                        style={{textTransform: "uppercase", color: "rgba(17,17,17,0.2)", fontWeight: "bold"}}
                    >
                            reservation details
                    </span>
                    {reservedHotels.map((hotel) => {
                        return <Flex vertical key={hotel.id} gap="10px">
                            <Flex gap="10px">
                                <img src={hotel.photo} style={{width: "200px", height: "100px"}} alt="hotel photo"/>
                                <Flex vertical gap="5px">
                                    <span style={{color: "rgba(17,17,17,0.3)"}}>
                                        Name: <span style={{color: "#111111", fontWeight: "bold"}}>
                                            {hotel.name}
                                        </span>
                                    </span>
                                    <span style={{color: "rgba(17,17,17,0.3)"}}>
                                        City: <span style={{color: "#111111"}}>
                                            {hotel.city}
                                        </span>
                                    </span>
                                    <span style={{color: "rgba(17,17,17,0.3)"}}>
                                        Address: <span style={{color: "#111111"}}>
                                            {hotel.address}
                                        </span>
                                    </span>
                                    <Button onClick={() => handleRemove(hotel.id)} style={{width: "200px"}}>Remove</Button>
                                </Flex>
                            </Flex>

                            <Formik
                                initialValues={initialValues}
                                onSubmit={() => {}}
                            >
                                {({ setFieldValue, setFieldTouched, values }) => (
                                    <Form style={{display: "flex", gap: "10px"}}>
                                        <Field name="checkIn">
                                            {({field}) => (
                                                <DatePicker
                                                    {...field}
                                                    value={values.checkIn ? dayjs(values.checkIn) : null}
                                                    onChange={(date) => setFieldValue("checkIn", date ? date.format("YYYY-MM-DD") : null)}
                                                    onBlur={() => setFieldTouched("checkIn", true)}
                                                    needConfirm
                                                    placeholder="Check In"
                                                />
                                            )}
                                        </Field>
                                        <Field name="checkOut">
                                            {({field}) => (
                                                <DatePicker
                                                    {...field}
                                                    value={values.checkOut ? dayjs(values.checkOut) : null}
                                                    onChange={(date) => setFieldValue("checkOut", date ? date.format("YYYY-MM-DD") : null)}
                                                    onBlur={() => setFieldTouched("checkIn", true)}
                                                    needConfirm
                                                    placeholder="Check Out"
                                                />
                                            )}
                                        </Field>
                                        <Flex gap="10px" justify="center">
                                            <div
                                                style={{
                                                    border: "1px solid #d9d9d9",
                                                    borderRadius: "6px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    height: "100%"}}
                                                className={(themeMode === "dark" ? "dark" : "light")}
                                            >
                                                <Button
                                                    onClick={() => setFieldValue("adults", values.adults - 1)}
                                                    style={{border: "none", height: "100%", marginRight: "5px"}}
                                                    disabled={values.adults === 1}
                                                >
                                                    <MinusOutlined style={{fontSize: "14px"}}/>
                                                </Button>
                                                <span style={{color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}>Adults {values.adults}</span>
                                                <Button
                                                    onClick={() => setFieldValue("adults", values.adults + 1)}
                                                    style={{border: "none", height: "100%", marginLeft: "5px"}}
                                                    disabled={values.adults === 4}
                                                >
                                                    <PlusOutlined style={{fontSize: "14px"}}/>
                                                </Button>
                                            </div>
                                            <div
                                                style={{
                                                    border: "1px solid #d9d9d9",
                                                    borderRadius: "6px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    height: "100%"}}
                                                className={(themeMode === "dark" ? "dark" : "light")}
                                            >
                                                <Button
                                                    onClick={() => setFieldValue("children", values.children - 1)}
                                                    style={{border: "none", height: "100%", marginRight: "5px"}}
                                                    disabled={values.children === 0}
                                                >
                                                    <MinusOutlined style={{fontSize: "14px"}}/>
                                                </Button>
                                                <span style={{color: (themeMode === "dark" ? "#FFFFFF" : "#000000")}}>Children {values.children}</span>
                                                <Button
                                                    onClick={() => setFieldValue("children", values.children + 1)}
                                                    style={{border: "none", height: "100%", marginLeft: "5px"}}
                                                    disabled={values.children === 5}
                                                >
                                                    <PlusOutlined style={{fontSize: "14px"}}/>
                                                </Button>
                                            </div>
                                        </Flex>
                                    </Form>
                                )}
                            </Formik>
                        </Flex>
                    })}
                </Flex>
            ) : (
                <span style={{
                    color: "rgba(17,17,17,0.2)",
                    fontSize: "20px",
                }}>
                            Shopping cart empty
                </span>
            )
            }
        </div>
    )
}