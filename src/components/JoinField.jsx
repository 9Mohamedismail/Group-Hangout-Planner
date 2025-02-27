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

function JoinField({ sessionData, handleJoin }) {
  const iconMap = {
    "Casual Hangout": faUsers,
    "Gaming Night": faGamepad,
    "Outdoor Activity": faTree,
    "Study/Work Group": faLaptopCode,
    "Movie Night": faFilm,
    "Sports Meetup": faBasketballBall,
    "Food Gathering": faUtensils,
    "Arts & Creativity": faPalette,
    "Karaoke / Music Night": faMicrophone,
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-4xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          {/* Gradient Background */}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 
            [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 
            lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>

          {/* Invite UI */}
          <div className="mx-auto max-w-md text-center lg:mx-auto lg:py-24">
            {/* Server Icon */}
            <div className="flex justify-center lg:justify-center">
              <FontAwesomeIcon
                icon={iconMap[sessionData.session_icon]}
                className="w-20 h-20 rounded-full text-blue-700"
              />
            </div>

            {/* Server Info */}
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl truncate">
              {sessionData.title}
            </h2>
            <p className="mt-2 text-lg text-gray-300 break-words">
              {sessionData.description}
            </p>

            {/* Member Count */}
            <div className="mt-4 flex justify-center lg:justify-center text-sm text-gray-300">
              <span className="mr-4">
                🟢 {sessionData.totalMembers} Members
              </span>
            </div>

            {/* Join Button */}
            <button
              className="mt-6 w-full rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-md 
              hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
              onClick={handleJoin}
            >
              Join Server
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinField;
