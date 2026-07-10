import React from "react";

const base = {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "none",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
};

export const IconoLupa = ({ color }) => (
    <svg {...base} stroke={color}>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
    </svg>
);

export const IconoBeca = ({ color }) => (
    <svg {...base} stroke={color}>
        <path d="M22 10 12 5 2 10l10 5 10-5Z" />
        <path d="M6 12v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5" />
    </svg>
);

export const IconoDocumento = ({ color }) => (
    <svg {...base} stroke={color}>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
        <path d="M9 13h6M9 17h6" />
    </svg>
);

export const IconoPasaporte = ({ color }) => (
    <svg {...base} stroke={color}>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <circle cx="12" cy="10" r="2.5" />
        <path d="M9 16h6" />
    </svg>
);

export const IconoAvion = ({ color }) => (
    <svg {...base} stroke={color}>
        <path d="M2 16.5 22 9l-4.5 12-3.5-6-6-3.5L2 16.5Z" />
        <path d="M11.5 12.5 15 16" />
    </svg>
);

export const IconoChat = ({ color }) => (
    <svg {...base} stroke={color}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
);

export const IconoGrupo = ({ color }) => (
    <svg {...base} stroke={color}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

export const IconoCheck = ({ color }) => (
    <svg {...base} stroke={color}>
        <path d="m9 11 3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
);

export const IconoUbicacion = ({ color }) => (
    <svg {...base} stroke={color} strokeWidth="2" width="16" height="16">
        <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
        <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
);