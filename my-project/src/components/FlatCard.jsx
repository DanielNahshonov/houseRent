import React from "react";
import { useNavigate } from "react-router-dom";

export default function FlatCard({ flat}) {
  const images = flat.images || {};
  const navigate = useNavigate()

  const handleFlatClick = () => {
    console.log(flat._id)
    navigate(`/flats/${flat._id}`);
  };
  return (
    <div className="rounded w-60 m-4 cursor-pointer"
    onClick={handleFlatClick}>
      {images.picture_url ? (
        <img
          src={images.picture_url}
          alt={flat.name}
          className="w-full object-cover rounded m-0 p-0"
        />
      ) : (
        <p>No image available</p>
      )}
      {/* <h2 className="text-xl font-bold mt-2">{flat.name}</h2> */}
      <p className="text-xl font-bold mt-2">{flat.address.street}</p>
      <p>Price: ${flat.price}</p>
      <p>ID: {flat._id}</p>
    </div>
  );
}
