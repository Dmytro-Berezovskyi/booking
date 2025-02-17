import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { openModal } from "../../store/slices/oneHotelSlice";

import { Modal, Button, Flex } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

export default function ModalGoToCart() {
    const open = useSelector((state) => state.oneHotel.openModal);
    const hotel = useSelector(state => state.oneHotel.hotel);
    const reservedHotels = useSelector((state) => state.reservedHotels.reservedHotels);
    const reservedHotel = reservedHotels.find((selected) => selected.id === hotel.id);
    console.log(reservedHotel);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCancel = () => {
        dispatch(openModal(false))
    }

    const handleGoToCart = () => {
        navigate("/cart");
        dispatch(openModal(false));
    }

    return (
        <Modal
            title={<h2>Hotel room in "{hotel.name}" added to cart</h2>}
            open={open} onCancel={handleCancel} footer={null} centered
            width={"50%"}
        >
            <Flex justify="space-between" align="flex-end">
                <Flex gap="20px">
                    <img src={hotel.photo} style={{width: "200px", height: "100px"}} alt="hotel photo"/>
                    <Flex vertical gap="5px">
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
                        {hotel.phone_number ? (
                            <span style={{color: "rgba(17,17,17,0.3)"}}>
                                Phone number: <span style={{color: "#111111"}}>
                                    {hotel.phone_number}
                                </span>
                            </span>) : null}
                        {reservedHotel ? (
                            <span style={{color: "rgba(17,17,17,0.3)"}}>
                                Rooms: <span style={{color: "#111111"}}>
                                    {reservedHotel.quantity}
                                </span>
                            </span>) : null}
                    </Flex>
                </Flex>

                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined className="custom-icon modal-btn-icon"/>}
                    onClick={handleGoToCart}
                >
                    Go to cart
                </Button>
            </Flex>
        </Modal>
    )
}