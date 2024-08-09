import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FlatDetails = () => {
  const { id } = useParams();
  const [flat, setFlat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlatDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/flats/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setFlat(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlatDetails();
  }, [id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error fetching flat details: {error}</p>;
  if (!flat) return <p className="text-center text-lg">No flat details available.</p>; // Additional safeguard

  const { host = {} } = flat; // Default empty object if host is not present

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">{flat.name}</h1>
      {flat.images && flat.images.picture_url ? (
        <img src={flat.images.picture_url} alt={flat.name} className="w-full h-auto mb-6 rounded-lg shadow-md" />
      ) : (
        <p className="text-center text-gray-500">No image available</p>
      )}

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{flat.description}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <p className="text-gray-700">{flat.summary}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Space</h2>
        <p className="text-gray-700">{flat.space}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Neighborhood Overview</h2>
        <p className="text-gray-700">{flat.neighborhood_overview}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Address</h2>
        <p className="text-gray-700">{flat.address.street}, {flat.address.suburb}, {flat.address.government_area}, {flat.address.market}, {flat.address.country} ({flat.address.country_code})</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Property Type</h2>
        <p className="text-gray-700">{flat.property_type}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Room Type</h2>
        <p className="text-gray-700">{flat.room_type}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Beds and Bathrooms</h2>
        <p className="text-gray-700">Bedrooms: {flat.bedrooms}</p>
        <p className="text-gray-700">Beds: {flat.beds}</p>
        <p className="text-gray-700">Bathrooms: {flat.bathrooms}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Price</h2>
        <p className="text-gray-700">${flat.price} per night</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Amenities</h2>
        <ul className="list-disc list-inside text-gray-700">
          {flat.amenities && flat.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Host Details</h2>
        <p className="text-gray-700"><strong>Host Name:</strong> {host.host_name || 'N/A'}</p>
        <p className="text-gray-700"><strong>Host Location:</strong> {host.host_location || 'N/A'}</p>
        <p className="text-gray-700"><strong>About:</strong> {host.host_about || 'N/A'}</p>
        <p className="text-gray-700"><strong>Response Time:</strong> {host.host_response_time || 'N/A'}</p>
        <p className="text-gray-700"><strong>Response Rate:</strong> {host.host_response_rate || 'N/A'}%</p>
        <p className="text-gray-700"><strong>Superhost:</strong> {host.host_is_superhost ? 'Yes' : 'No'}</p>
        <p className="text-gray-700"><strong>Profile Pic:</strong> {host.host_has_profile_pic ? 'Yes' : 'No'}</p>
        <p className="text-gray-700"><strong>Identity Verified:</strong> {host.host_identity_verified ? 'Yes' : 'No'}</p>
        <p className="text-gray-700"><strong>Total Listings:</strong> {host.host_total_listings_count || 'N/A'}</p>
        
        {/* Optional: Displaying host URLs */}
        {host.host_url && (
          <p className="text-gray-700"><strong>Host Profile URL:</strong> <a href={host.host_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{host.host_url}</a></p>
        )}
        {host.host_thumbnail_url && (
          <p className="text-gray-700"><strong>Host Thumbnail:</strong> <img src={host.host_thumbnail_url} alt={host.host_name} className="w-20 h-20 object-cover rounded mt-2" /></p>
        )}
        {host.host_picture_url && (
          <p className="text-gray-700"><strong>Host Picture:</strong> <img src={host.host_picture_url} alt={host.host_name} className="w-32 h-32 object-cover rounded mt-2" /></p>
        )}
        
        {/* Optional: Displaying verifications */}
        {host.host_verifications && host.host_verifications.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Verifications</h3>
            <ul className="list-disc list-inside text-gray-700">
              {host.host_verifications.map((verification, index) => (
                <li key={index}>{verification}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Review Scores</h2>
        <p className="text-gray-700">Accuracy: {flat.review_scores?.accuracy || 'N/A'}</p>
        <p className="text-gray-700">Cleanliness: {flat.review_scores?.cleanliness || 'N/A'}</p>
        <p className="text-gray-700">Check-in: {flat.review_scores?.checkin || 'N/A'}</p>
        <p className="text-gray-700">Communication: {flat.review_scores?.communication || 'N/A'}</p>
        <p className="text-gray-700">Location: {flat.review_scores?.location || 'N/A'}</p>
        <p className="text-gray-700">Value: {flat.review_scores?.value || 'N/A'}</p>
        <p className="text-gray-700">Rating: {flat.review_scores?.rating || 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">House Rules</h2>
        <p className="text-gray-700">{flat.house_rules || 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cancellation Policy</h2>
        <p className="text-gray-700">{flat.cancellation_policy || 'N/A'}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
        <ul className="list-disc list-inside text-gray-700">
          {flat.reviews && flat.reviews.length > 0 ? (
            flat.reviews.map((review, index) => (
              <li key={index} className="mb-2">
                <p><strong>{review.reviewer_name || 'Anonymous'}</strong>: {review.comments || 'No comments'}</p>
              </li>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FlatDetails;
