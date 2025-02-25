import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../store/thunks/searchThunk";

import { Input, Flex } from "antd";
const { Search } = Input;

export default function SearchHotel() {
    const [query, setQuery] = useState("");
    const searchHotel = useSelector((state) => state.searchHotel.searchHotel);
    const debounceValue = useDebounce(query, 500);
    const dispatch = useDispatch();

    useEffect(() => {
        if(debounceValue.trim()) {
            console.log("Запит на сервер:", debounceValue);
            dispatch(fetchSearch(debounceValue));
        }
    }, [debounceValue, dispatch]);
    console.log(searchHotel);

    const handleChange = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <Flex vertical>
                <Search
                    placeholder="search hotel"
                    allowClear
                    value={query}
                    onChange={handleChange}
                    style={{
                        width: 300,
                    }}
                />
                {searchHotel !== [] ? (
                    <ul style={{
                        position: "absolute",
                        top: "35px",
                        width: "270px",
                        background: "white",
                        boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)"
                    }}>
                        {searchHotel.length > 0 ? (
                            searchHotel.map((hotel) => (
                                <NavLink to={`/hotel/${hotel.id}`}>
                                    <li key={hotel.id}>{hotel.name} - {hotel.city}</li>
                                </NavLink>
                            ))
                        ) : query && <p>hotel not found</p>}
                    </ul>
                ) : null}

            </Flex>
        </>
    )
}