import React, { useState, useEffect } from "react";

import FlatCard from "../components/FlatCard";
import CountryAutocomplete from "../components/CountryAutocomplete";

const FlatList = () => {
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortOption, setSortOption] = useState("price_asc");
  const [country, setCountry] = useState("");


  const fetchFlats = async (page, sortOption, country) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/flats?page=${page}&limit=10&sort=${sortOption}&country=${country}`
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFlats((prevFlats) => [...prevFlats, ...data]);
      setHasMore(data.length > 0);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlats(page, sortOption, country);
  }, [page, sortOption, country]);

  const loadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setFlats([]);
    setPage(1);
  };

  const handleCountrySelect = (selectedCountry) => {
    setCountry(selectedCountry);
    setFlats([]);
    setPage(1);
  };

  if (loading && page === 1) return <p>Loading...</p>;
  if (error) return <p>Error fetching flats: {error}</p>;
  if (flats.length === 0) return <p>No flats available.</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex-row">
        <div className="mb-4">
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border rounded"
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating_desc">Rating: High to Low</option>
          </select>
        </div>
        <div className="mb-4">
          <CountryAutocomplete onSelect={handleCountrySelect} />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {flats.map((flat) => (
          <FlatCard
            key={flat._id}
            flat={flat}
          />
        ))}
      </div>
      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default FlatList;
