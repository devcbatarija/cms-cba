import React, { useState } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { ErrorAlert } from "../../../toastAlerts/errorAlerts";

const DownloadReports = ({
    requestUrl,
    FileName,
    data,
}) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadFile = async () => {
        setIsDownloading(true);
        // Simula un retraso de 5 segundos antes de iniciar la descarga
        setTimeout(async () => {
            try {
                const response = await axios.post(requestUrl, data, {
                    responseType: 'blob',
                });
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${FileName}.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.remove();
                setIsDownloading(false);
            } catch (error) {
                setIsDownloading(false);
                toast.custom((t) => (
                    <ErrorAlert t={t} w={'w-4/12'} message={'Error al descargar el archivo'} />
                ));
            }
        }, 500);
    };

    return (
        <button
            onClick={downloadFile}
            className={`flex gap-x-3 bg-cbaBlue text-white py-2 px-5 rounded-full font-semibold items-center`}
        >
            {isDownloading ?
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
            }
            {isDownloading ? 'Descargando...' : 'Exportar a Excel'}
        </button>
    );
}

export default DownloadReports;
