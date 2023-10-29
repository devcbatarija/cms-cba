import React, { useState } from 'react';
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    topRank
}) => {
    const [pageRange, setPageRange] = useState([0, topRank]);
    const limit = topRank
    const handlePrev = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
            if (pageRange[1] > limit) setPageRange([pageRange[0] - 1, pageRange[1] - 1]);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
            if (pageRange[1] < totalPages) setPageRange([pageRange[0] + 1, pageRange[1] + 1]);
        }
    };
    return (
        <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
            <div className="lg:w-3/5 w-full flex items-center justify-between border-t-2 border-gray-200">
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer" onClick={handlePrev}>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm ml-3 font-medium leading-none ">Anterior</p>
                </div>
                <div className="sm:flex hidden">
                    {Array.from({ length: totalPages }, (_, i) => {
                        if (i >= pageRange[0] && i < pageRange[1]) {
                            return (
                                <p
                                    key={i}
                                    className={`text-sm font-medium leading-none cursor-pointer ${currentPage === i ? 'text-indigo-700 border-t-2 border-indigo-400' : 'text-gray-600 hover:text-indigo-700 border-t-2 border-transparent hover:border-indigo-400'} pt-3 mr-4 px-2`}
                                    onClick={() => onPageChange(i)}
                                >
                                    {i + 1}
                                </p>
                            );
                        }
                    })}
                </div>
                <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer" onClick={handleNext}>
                    <p className="text-sm font-medium leading-none mr-3">Siguiente</p>
                    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default Pagination;