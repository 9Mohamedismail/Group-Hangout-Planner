import React from "react";

function SessionField({ sessionData }) {
  return (
    <div className="bg-gray-50 py-24 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-base font-semibold text-indigo-600 text-5xl sm:text-6xl">
          {sessionData.title}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          {sessionData.description}
        </p>
        <div className="grid gap-8 mt-1 lg:grid-cols-2 lg:grid-rows-2">
          {/* Mobile Friendly Section */}
          <div className="relative lg:row-span-2">
            <div className="absolute inset-0 rounded-lg bg-white lg:rounded-l-2xl"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-l-2xl">
              <div className="p-8 sm:p-10">
                <p className="text-lg font-medium text-gray-900">
                  Suggested Place:
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  {sessionData.suggested_place}
                </p>
              </div>
              <div className="relative grow">
                <div className=" inset-x-10 top-10 bottom-0 overflow-hidden rounded-t-lg border border-gray-700 bg-gray-900 shadow-xl">
                  <img
                    className="h-full w-full object-cover object-top"
                    src="https://developers.google.com/static/maps/images/landing/react-codelab-thumbnail.png"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="p-8 sm:p-10">
                <p className="text-lg font-medium text-gray-900">Votes:</p>
                <p className="mt-2 text-sm text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit
                  maiores impedit.
                </p>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-white"></div>
            <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
              <div className="p-8 sm:p-10">
                <p className="text-lg font-medium text-gray-900">Comments:</p>
                <p className="mt-2 text-sm text-gray-600">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit
                  maiores impedit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SessionField;
