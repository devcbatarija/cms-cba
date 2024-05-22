import { useEffect, useState } from "react";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DropDownSelect from "./dropDownSelect";

const TablePagination = ({
    classes,
    currentPage,
    totalPages,
    onPageChange,
    topRank,
    itemsPerPage,
    totalItems,
    handleChangeItemsPerPage
}) => {
    const [pageRange, setPageRange] = useState([0, topRank]);
    const [itemsShown, setItemsShown] = useState({
        inicio: 1,
        fin: itemsPerPage
    })
    const limit = topRank
    const handlePrev = () => {
        if (currentPage > 0) {
            onPageChange(currentPage - 1)
            if (pageRange[1] > limit) setPageRange([pageRange[0] - 1, pageRange[1] - 1]);
        }
    }
    const handleNext = () => {
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1)
            if (pageRange[1] < totalPages) setPageRange([pageRange[0] + 1, pageRange[1] + 1]);
        }
    }
    useEffect(() => {
        if ((currentPage + 1) * itemsPerPage <= totalItems) {
            setItemsShown({
                inicio: ((currentPage + 1) * itemsPerPage) + (1 - itemsPerPage),
                fin: (currentPage + 1) * itemsPerPage
            })
        }
        else {
            setItemsShown({
                inicio: ((currentPage + 1) * itemsPerPage) + (1 - itemsPerPage),
                fin: totalItems
            })
        }
    }, [currentPage, itemsPerPage, totalItems]);

    const items = [
        { id: 1, value: 10, txt: '10' },
        { id: 2, value: 25, txt: '25' },
        { id: 3, value: 50, txt: '50' },
        { id: 4, value: 100, txt: '100' },
    ]

    return (
        <div className={`w-full mt-2 shadow flex flex-row justify-between items-center py-2 px-10 text-zinc-600 font-bold text-sm ${classes} `}>
            <div className="flex flex-row items-center">
                <span>Mostrar:</span>
                <DropDownSelect
                    handleFunction={handleChangeItemsPerPage}
                    datos={items}
                    initialSelected={items[0]}
                    disabled={false}
                    containerClass={`bg-white rounded-full gap-x-[2px] px-2 py-1.5 mx-3`}
                    modalClass={`right-0 origin-top-right w-20 bottom-10`}
                    inputText={itemsPerPage}
                />
                <span>por pagina</span>
                <span className="mx-5">{`${itemsShown.inicio} - ${itemsShown.fin} de ${totalItems}`}</span>
            </div>
            <div className="flex flex-row items-center gap-x-3">
                <div onClick={handlePrev} className={`rounded-full h-7 w-7 bg-white flex items-center justify-center ${currentPage > 0 ? 'cursor-pointer hover:bg-blue-200 hover:text-white hover:border hover:border-blue-300' : 'hidden'}`}>
                    <ChevronLeftRoundedIcon />
                </div>
                <div className="flex flex-row items-center gap-x-1.5">
                    {
                        totalPages > 1 &&
                        Array.from({ length: totalPages }, (_, i) => {
                            if (i >= pageRange[0] && i < pageRange[1]) {
                                return (
                                    <span
                                        key={i}
                                        onClick={() => onPageChange(i)}
                                        className={`hover:bg-blue-200 hover:text-white hover:border hover:border-blue-300 rounded-full h-7 w-7 flex items-center justify-center cursor-pointer ${currentPage == i ? 'bg-blue-300 text-white border border-blue-400' : 'bg-white'}`}>
                                        {i + 1}
                                    </span>
                                )
                            }
                        })
                    }
                </div>
                <div onClick={handleNext} className={`rounded-full h-7 w-7 bg-white flex items-center justify-center ${currentPage < totalPages - 1 ? 'cursor-pointer hover:bg-blue-200 hover:text-white hover:border hover:border-blue-300' : 'hidden'} `}>
                    <ChevronRightRoundedIcon />
                </div>
            </div>
        </div>
    );
}

export default TablePagination;