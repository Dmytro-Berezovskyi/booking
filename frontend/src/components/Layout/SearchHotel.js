import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../store/thunks/searchThunk";

import { Input, Flex } from "antd";
const { Search } = Input;

export default function SearchHotel() {
    const [query, setQuery] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const searchHotel = useSelector((state) => state.searchHotel.searchHotel);
    const debounceValue = useDebounce(query, 500);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(debounceValue.trim()) {
            dispatch(fetchSearch(debounceValue));
        }
    }, [debounceValue, dispatch]);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    const handleFocus = () => {
        setIsDropdownVisible(true);
    }

    const handleBlur = () => {
        setTimeout(() => setIsDropdownVisible(false), 200);
    }

    const handleSelectHotel = (hotelId) => {
        setQuery("");
        navigate(`/hotel/${hotelId}`);
    }

    return (
        <>
            <Flex vertical>
                <Search
                    placeholder="search hotel"
                    allowClear
                    value={query}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{
                        width: 300,
                    }}
                />
                {isDropdownVisible && searchHotel !== [] && debounceValue !== "" ? (
                    <ul style={{
                        position: "absolute",
                        top: "35px",
                        width: "270px",
                        background: "white",
                        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)",
                        padding: "15px 30px 0 30px"
                    }}>
                        {searchHotel.length > 0 ? (
                            searchHotel.map((hotel) => (
                                <li
                                    key={hotel.id}
                                    onMouseDown={() => handleSelectHotel(hotel.id)}
                                    className="searchListItem"
                                >
                                    <a>{hotel.name} - {hotel.city}</a>
                                </li>
                            ))
                        ) : query && <p>hotel not found</p>}
                    </ul>
                ) : null}

            </Flex>
        </>
    )
}