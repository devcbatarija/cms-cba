import { toast } from "react-hot-toast";

export const InformationAlert = ({ t, w, message }) => {
    return (
        <div
            className={`w-[100%] sm:${w} md:${w} lg:${w} xl:${w} bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex">
                    <div className="ml-3 flex-1">
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-blue-400 flex-shrink-0 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
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


