import React from 'react'

export default function FlatCard({ flat }) {
    const images = flat.images || {};
    return (
        <div className="p-4 border rounded shadow w-60">
      {images.picture_url ? (
        <img src={images.picture_url} alt={flat.name} className="w-full h-48 object-cover rounded" />
      ) : (
        <p>No image available</p>
      )}
      <h2 className="text-xl font-bold mt-2">{flat.name}</h2>
      <p>{flat.summary}</p>
      <p>Price: ${flat.price}</p>
    </div>
      );
    };