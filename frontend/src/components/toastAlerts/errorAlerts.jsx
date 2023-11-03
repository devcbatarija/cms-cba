import { toast } from "react-hot-toast";

export const ErrorAlert = ({ t, w, message }) => {
  return (
    <div
      className={`w-[100%] sm:${w} md:${w} lg:${w} xl:${w} bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex">
          <div className="ml-3 flex-1">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="ml-2 text-sm font-medium text-gray-900">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => toast.remove(t.id)}
        className="flex border-l border-gray-200"
      >
        <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Close
        </button>
      </div>
    </div>
  );
};
