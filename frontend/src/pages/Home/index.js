import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Field, ErrorMessage, Formik } from "formik";
import dayjs from "dayjs";

import { fetchSelectedHotels } from "../../store/thunks/selectedHotelsThunk";

import DestinationHotels from "./DestinationHotels"

import { Select, DatePicker, Button, Divider, Flex } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

import "./style.css";

export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const themeMode = useSelector(state => state.theme.themeMode);
    const destination = useSelector((state) => state.destination);
    const selectedHotels = useSelector((state) => state.selectedHotels);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (submitted && !selectedHotels.loading && selectedHotels.selectedHotels.length === 0 && selectedHotels.error === "") {
            navigate("/hotels");
        }
    }, [submitted, selectedHotels, navigate]);

    const initialValues = {
        destination: null,
        checkIn: null,
        checkOut: null,
        adults: 1,
        children: 0,
    }

    const validate = (values) => {
        const errors = {};

        if (!values.destination) {
            errors.destination =
                <div>
                    <span>Enter your destination or </span>
                    <NavLink to={"/hotels"} style={{fontWeight: "bold"}}>view all available hotels</NavLink>
                </div>;
        }

        if (values.checkOut < values.checkIn ) {
            errors.checkIn = "Please enter valid dates"
        }

        return errors;
    };

    const handleSubmit = (values, { resetForm }) => {
        const selectedCity = destination.destination.find((destination) => values.destination === destination.value)

        if (selectedCity) {
            dispatch(fetchSelectedHotels(selectedCity.label));
            setSubmitted(true);
        }
        localStorage.setItem("details", JSON.stringify(values));

        resetForm();
    };


    return (
        <>
            <Formik
                initialValues={initialValues}
                validate={validate}
                onSubmit={handleSubmit}
            >
                {({ setFieldValue, setFieldTouched, values }) => (
                    <Form style={{display: "flex", gap: "10px", justifyContent: "center"}}>
                        <Flex vertical>
                            <Flex gap="10px">
                                <Flex gap="10px" justify="center">
                                    <Field name="destination">
                                        {({field}) => (
                                            <Select
                                                {...field}
                                                showSearch
                                                style={{width: 200}}
                                                placeholder="Destination"
                                                optionFilterProp="label"
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                                                }
                                                onChange={(values) => setFieldValue("destination", values)}
                                                options={destination.destination}
                                            />
                                        )}
                                    </Field>
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
                                </Flex>


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

                                        <Button type="primary" htmlType="submit">Submit</Button>
                                    </Flex>
                            </Flex>

                            <ErrorMessage name="destination" component="div" style={{color: "red", marginTop: "10px"}}/>
                            <ErrorMessage name="checkIn" component="span" style={{color: "red", marginTop: "10px"}}/>
                        </Flex>
                    </Form>
                )}
            </Formik>

            <div style={{width: "100%", marginLeft: "auto", marginRight: "auto"}}>
                <Divider orientation="left" style={{borderColor: (themeMode === "dark" ? "rgba(255,255,255,0.20)" : "rgba(5,5,5,0.06)")}}>
                    <h1
                        style={{
                                textTransform: "uppercase",
                                fontWeight: "800",
                                fontSize: "25px",
                                margin: 0,
                                color: (themeMode === "dark" ? "#FFFFFF" : "#000000")
                    }}>
                        Plan&Stay - your ideal place is just a few clicks away!
                    </h1>
                </Divider>

                <DestinationHotels selectedHotels={selectedHotels.selectedHotels}/>
            </div>
        </>
    )
}