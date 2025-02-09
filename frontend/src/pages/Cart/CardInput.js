import { Form, Field, ErrorMessage, Formik } from "formik";
import * as Yup from "yup";

import {Button, Flex, Input} from "antd";

import "./style.css";

export default function CardInput() {
    const initialValues = {
        cardType: "",
        cardNumber: "",
        expiryDate: "",
        expiryYear: "",
        expiryMonth: "",
        cvv: ""
    }

    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string()
            .required("Card Number is required")
            .length(16, "The card number must be 16 digits long"),
        expiryMonth: Yup.string()
            .required("Expiry Month is required"),
        expiryYear: Yup.string()
            .required("Expiry Year is required")
            .matches(/^(0[1-9]|1[0-2])$/, "The expiry year must be 2 digits long"),
        cvv: Yup.string()
            .required("CVV is required")
            .matches(/^\d{3}$/, "The cvv must be 3 digits long"),
    });

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);

        resetForm();
    }

    return (
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
            {({ setFieldValue, setFieldTouched, isSubmitting, values }) => (
                <Form style={{display: "flex", flexDirection: "column", gap: "30px", maxWidth: "50%"}}>
                    <Flex vertical gap="10px">
                        <span style={{fontWeight: "600"}}>Select Card Type</span>

                        <Flex gap="20px">
                            <button
                                className={`cardType-btn ${values.cardType === "masterCard" ? "active" : ""}`}
                                onClick={() => setFieldValue("cardType", "masterCard")}
                                type="button"
                                aria-label="Select Master Card"
                            >
                                <svg
                                    width="45" height="45" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        className="icon-mc-one"
                                        d="M7 19C10.866 19 14 15.866 14 12C14 8.13401 10.866 5 7 5C3.13401 5 0 8.13401 0 12C0 15.866 3.13401 19 7 19Z"
                                        fill={values.cardType === "masterCard" ? "#ffffff" : "currentColor"}
                                        fillOpacity={values.cardType === "masterCard" ? 0.9 : 0.5}
                                    />
                                    <path
                                        className="icon-mc-two"
                                        d="M17 19C20.866 19 24 15.866 24 12C24 8.13401 20.866 5 17 5C13.134 5 10 8.13401 10 12C10 15.866 13.134 19 17 19Z"
                                        fill={values.cardType === "masterCard" ? "#ffffff" : "currentColor"}
                                        fillOpacity={values.cardType === "masterCard" ? 1 : 0.8}
                                    />
                                </svg>
                            </button>

                            <button
                                className={`cardType-btn ${values.cardType === "visa" ? "active" : ""}`}
                                onClick={() => setFieldValue("cardType", "visa")}
                                type="button"
                                aria-label="Select Visa"
                            >
                                <svg
                                    width="45" height="45" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M22.222 15.768L21.997 14.643H19.483L19.083 15.76L17.068 15.764C18.3633 12.6513 19.3247 10.3457 19.952 8.847C20.116 8.455 20.407 8.255 20.836 8.258C21.164 8.26067 21.6993 8.261 22.442 8.259L24 15.765L22.222 15.768ZM20.048 13.102H21.669L21.064 10.282L20.048 13.102ZM7.062 8.257L9.088 8.259L5.956 15.769L3.905 15.767C3.38925 13.7833 2.87991 11.798 2.377 9.811C2.277 9.415 2.079 9.138 1.698 9.007C1.35733 8.89033 0.791333 8.71 0 8.466V8.259H3.237C3.797 8.259 4.124 8.53 4.229 9.086C4.335 9.64333 4.60167 11.0613 5.029 13.34L7.062 8.257ZM11.872 8.259L10.271 15.768L8.342 15.765L9.94 8.257L11.872 8.259ZM15.782 8.12C16.359 8.12 17.086 8.3 17.504 8.466L17.166 10.022C16.788 9.87 16.166 9.665 15.643 9.672C14.883 9.685 14.413 10.004 14.413 10.31C14.413 10.808 15.229 11.059 16.069 11.603C17.027 12.223 17.154 12.78 17.142 13.386C17.129 14.641 16.069 15.88 13.833 15.88C12.813 15.865 12.445 15.78 11.613 15.484L11.965 13.86C12.812 14.214 13.171 14.327 13.895 14.327C14.558 14.327 15.127 14.059 15.132 13.592C15.136 13.26 14.932 13.095 14.188 12.685C13.444 12.275 12.4 11.706 12.414 10.563C12.431 9.101 13.816 8.12 15.782 8.12Z"
                                        fill={values.cardType === "visa" ? "#ffffff" : "currentColor"}
                                        fillOpacity="currentOpacity"
                                    />
                                </svg>
                            </button>

                            <button className={`cardType-btn ${values.cardType === "applePay" ? "active" : ""}`}
                                    onClick={() => setFieldValue("cardType", "applePay")}
                                    type="button"
                                    aria-label="ApplePay"
                            >
                                <svg width="45" height="45" viewBox="0 0 30 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_99_22)">
                                        <path
                                            d="M5.47969 7.42969C5.12813 7.84687 4.56563 8.175 4.00313 8.12812C3.93282 7.56562 4.20938 6.96562 4.53282 6.6C4.88438 6.17344 5.49844 5.86875 6 5.84531C6.05625 6.42656 5.82657 7.00312 5.47969 7.42969ZM5.99063 8.23594C5.175 8.18906 4.47657 8.7 4.09219 8.7C3.69844 8.7 3.10782 8.25937 2.46094 8.27344C1.62188 8.2875 0.843753 8.76094 0.41719 9.51562C-0.46406 11.0297 0.187503 13.2656 1.04063 14.4984C1.45782 15.1078 1.95469 15.7781 2.61094 15.7547C3.23438 15.7313 3.47813 15.3516 4.22813 15.3516C4.98282 15.3516 5.20313 15.7547 5.85938 15.7453C6.53907 15.7312 6.96563 15.1359 7.38282 14.5266C7.85625 13.8328 8.05313 13.1625 8.0625 13.125C8.04844 13.1109 6.75 12.6141 6.73594 11.1141C6.72188 9.85781 7.7625 9.2625 7.80938 9.225C7.22344 8.35312 6.30938 8.25937 5.99063 8.23594ZM10.6969 6.53906V15.675H12.1172V12.5531H14.0813C15.8766 12.5531 17.1328 11.3203 17.1328 9.53906C17.1328 7.75781 15.8953 6.53906 14.1281 6.53906H10.6969ZM12.1172 7.73437H13.7531C14.9859 7.73437 15.6891 8.39063 15.6891 9.54375C15.6891 10.6969 14.9859 11.3625 13.7484 11.3625H12.1172V7.73437ZM19.7203 15.7453C20.6109 15.7453 21.4359 15.2953 21.8109 14.5781H21.8391V15.675H23.1516V11.1281C23.1516 9.81094 22.0969 8.95781 20.475 8.95781C18.9703 8.95781 17.8547 9.82031 17.8125 11.0016H19.0922C19.2 10.4391 19.7203 10.0687 20.4328 10.0687C21.3 10.0687 21.7875 10.4719 21.7875 11.2172V11.7234L20.0156 11.8312C18.3703 11.9297 17.4797 12.6047 17.4797 13.7766C17.4844 14.9578 18.4031 15.7453 19.7203 15.7453ZM20.1047 14.6625C19.35 14.6625 18.8672 14.2969 18.8672 13.7438C18.8672 13.1672 19.3313 12.8344 20.2172 12.7828L21.7922 12.6844V13.2C21.7922 14.0531 21.0656 14.6625 20.1047 14.6625ZM24.9094 18.1594C26.2922 18.1594 26.9438 17.6297 27.5109 16.0312L30 9.04687H28.5563L26.8875 14.4422H26.8594L25.1906 9.04687H23.7094L26.1094 15.6984L25.9781 16.1016C25.7625 16.7859 25.4109 17.0531 24.7828 17.0531C24.6703 17.0531 24.4547 17.0391 24.3656 17.0297V18.1266C24.45 18.1453 24.8016 18.1594 24.9094 18.1594Z"
                                            fill={values.cardType === "applePay" ? "#ffffff" : "currentColor"}
                                            fillOpacity="currentOpacity"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_99_22">
                                            <rect width="30" height="24" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </Flex>
                    </Flex>

                    <Flex vertical gap="5px">
                        <label htmlFor="cardNumber" style={{fontWeight: "600"}}>Card Number</label>

                        <Field name="cardNumber">
                            {({ field }) => (
                                <Input
                                    {...field}
                                    className="cardDetails-input"
                                    variant="borderless"
                                    value={values.cardNumber.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                                    placeholder="1111 1111 1111 1111"
                                    maxLength={19}
                                    onChange={(e) => {
                                        const rawValue = e.target.value.replace(/\D/g, '');
                                        setFieldValue("cardNumber", rawValue.slice(0, 16));
                                    }}
                                />
                            )}
                        </Field>
                        <ErrorMessage name="cardNumber" component="div" className="error-msg" />
                    </Flex>

                    <Flex gap="20px" justify="space-between">
                        <Flex vertical gap="5px" style={{width: "50%"}}>
                            <label htmlFor="expiryDate" style={{fontWeight: "600"}}>Expiry Date</label>

                            <Flex gap="5px" alignItems="baseline">
                                <Field name="expiryMonth">
                                    {({field}) => (
                                        <Input
                                            {...field}
                                            className="cardDetails-input"
                                            variant="borderless"
                                            value={values.expiryMonth}
                                            maxLength={2}
                                            placeholder="05"
                                            onChange={(e) => {
                                                let value = e.target.value.replace(/\D/g, "").slice(0, 2);
                                                if (value === "0") value = "";
                                                else if (value.length === 1) value = `0${value}`;
                                                setFieldValue("expiryMonth", value);
                                            }}
                                        />
                                    )}
                                </Field>
                                <span>/</span>
                                <Field name="expiryYear">
                                    {({field}) => (
                                        <Input
                                            {...field}
                                            className="cardDetails-input"
                                            variant="borderless"
                                            value={values.expiryYear}
                                            maxLength={2}
                                            placeholder="29"
                                            onChange={(e) => setFieldValue("expiryYear", e.target.value.replace(/\D/g, ""))}
                                        />
                                    )}
                                </Field>
                            </Flex>
                            <Flex vertical gap="2px">
                                <ErrorMessage name="expiryMonth" component="div" className="error-msg" />
                                <ErrorMessage name="expiryYear" component="div" className="error-msg"/>
                            </Flex>
                        </Flex>

                        <Flex vertical gap="5px" style={{width: "25%"}}>
                            <label htmlFor="cvv" style={{fontWeight: "600", textTransform: "uppercase"}}>Cvv</label>

                            <Field name="cvv">
                                {({field}) => (
                                    <Input
                                        {...field}
                                        className="cardDetails-input"
                                        variant="borderless"
                                        value={values.cvv.replace(/\D/g, '')}
                                        maxLength={3}
                                        placeholder="123"
                                    />
                                )}
                            </Field>
                            <ErrorMessage name="cvv" component="div" className="error-msg" />
                        </Flex>
                    </Flex>

                    <Button type="primary" htmlType="submit">Pay</Button>
                </Form>

            )}
        </Formik>
    )
}