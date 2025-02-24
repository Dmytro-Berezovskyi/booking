import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../store/thunks/searchThunk";

import { Input, Flex } from "antd";
const { Search } = Input;

export default function SearchHotel() {
    const [query, setQuery] = useState("");
    const debounceValue = useDebounce(query, 500);
    const dispatch = useDispatch();
    const searchHotel = useSelector((state) => state.searchHotel.searchHotel);

    useEffect(() => {
        if(debounceValue.trim()) {
            console.log("Запит на сервер:", debounceValue);
            dispatch(fetchSearch(debounceValue));
        }
    }, [debounceValue, dispatch]);
    console.log(searchHotel);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
            <Flex vertical>
                <Search
                    placeholder="search hotel"
                    allowClear
                    value={query}
                    onChange={handleSearch}
                    onSearch={handleSearch}
                    style={{
                        width: 300,
                    }}
                />
                <ul style={{position: "absolute", top: "35px", width: "270px", background: "white", boxShadow: "4px 4px 8px 0px rgba(34, 60, 80, 0.2)"}} >
                    {searchHotel.length > 0 ? (
                        searchHotel.map((hotel) => (
                            <li key={hotel.id}>{hotel.name} - {hotel.city}</li>
                        ))
                    ) : query && <p>hotel not found</p>}
                </ul>
            </Flex>
        </>
    )
}