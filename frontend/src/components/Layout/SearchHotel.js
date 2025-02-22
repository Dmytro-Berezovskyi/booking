import { useState, useEffect } from "react";

import useDebounce from "../../hooks/useDebounce";

import { Input } from "antd";
const { Search } = Input;

export default function SearchHotel() {
    const [query, setQuery] = useState("");
    const debounceValue = useDebounce(query, 500);

    useEffect(() => {
        if(debounceValue) {
            console.log("Sending data to the server...", debounceValue);
        }
    }, [debounceValue]);

    const handleSearch = (value) => {
        if (value) {
            setQuery(value.target.value);
        }
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
        </>
    )
}