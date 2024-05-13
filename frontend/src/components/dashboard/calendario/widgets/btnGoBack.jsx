import { useLocation, useNavigate } from "react-router-dom";

const BtnGoBack = ({
    defaultPage
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const doesAnyHistoryEntryExist = location.key !== 'default'
    const goBack = () => {
        if (doesAnyHistoryEntryExist) {
            navigate(-1);
        } else {
            // Redirige al usuario a una página predeterminada si no hay una ruta anterior
            navigate(defaultPage);
        }
    }
    return (
        <button className="sm:absolute flex-shrink-0 ml-2 left-0 bg-white text-zinc-400 h-10 w-10 flex items-center justify-center rounded-full shadow-lg transition ease-in-out delay-150 duration-500 hover:scale-[1.1] "
            onClick={goBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
        </button>
    );
}

export default BtnGoBack;