import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faGamepad,
  faTree,
  faLaptopCode,
  faFilm,
  faBasketballBall,
  faUtensils,
  faPalette,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";

function ImagePickerField({ onClose, onSelect }) {
  const icons = [
    { icon: faUsers, label: "Casual Hangout" },
    { icon: faGamepad, label: "Gaming Night" },
    { icon: faTree, label: "Outdoor Activity" },
    { icon: faLaptopCode, label: "Study/Work Group" },
    { icon: faFilm, label: "Movie Night" },
    { icon: faBasketballBall, label: "Sports Meetup" },
    { icon: faUtensils, label: "Food Gathering" },
    { icon: faPalette, label: "Arts & Creativity" },
    { icon: faMicrophone, label: "Karaoke / Music Night" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-lg font-bold mb-4 text-center">Choose an Image</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {icons.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              onClick={() => onSelect(item.label)}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="text-4xl text-gray-700 mb-2"
              />
              <p className="text-gray-700 font-medium text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImagePickerField;
