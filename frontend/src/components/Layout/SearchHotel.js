import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import useDebounce from "../../hooks/useDebounce";
import { fetchSearch } from "../../store/thunks/searchThunk";

import { Input } from "antd";
const { Search } = Input;

export default function SearchHotel() {
    const [query, setQuery] = useState("");
    const debounceValue = useDebounce(query, 500);
    const dispatch = useDispatch();
    const searchHotel = useSelector((state) => state.searchHotel.searchHotel);
    console.log(searchHotel);

    useEffect(() => {
        if(debounceValue.trim()) {
            dispatch(fetchSearch(debounceValue));
        }
    }, [debounceValue, dispatch]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    }

    return (
        <>
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
            <ul>
                {searchHotel.length > 0 ? (
                    searchHotel.map((hotel) => (
                        <li key={hotel.id}>{hotel.name} - {hotel.city}</li>
                    ))
                ) : query && <p>Нічого не знайдено</p>}
            </ul>
        </>
    )
}