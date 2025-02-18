import React, { useRef } from "react";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const PlacesAutocomplete = ({ onSelect }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyD8ks9DoDbucZ27LExMPZT3Ngm4OhabR7s",
    libraries,
  });

  const autocompleteRef = useRef(null);

  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        onSelect(place);
      }
    }
  };

  return isLoaded ? (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={onPlaceChanged}
      options={{
        fields: ["name", "formatted_address"],
      }}
    >
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="suggested_place"
          id="sugessted_place"
          className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor="suggested_place"
          className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Suggested Place
        </label>
      </div>
    </Autocomplete>
  ) : (
    <p>Loading...</p>
  );
};

export default PlacesAutocomplete;
