import React, { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from "framer-motion";
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
}

const ImagenesEstilizadas = ({ multimedia }) => {
    const [stylesState, setStylesState] = useState([styles.img1, styles.img2, styles.img3]);
    const controls = [useAnimation(), useAnimation(), useAnimation()];
    const size = useWindowSize();

    const cycleImages = () => {
        if (multimedia.length === 3) {
            setStylesState(prevStyles => [prevStyles[2], prevStyles[0], prevStyles[1]]);
        } else if (multimedia.length === 2) {
            setStylesState(prevStyles => [prevStyles[1], prevStyles[0], prevStyles[2]]);
        }
    };

    const animateOpacity = (controls, styleState, index) => {
        useEffect(() => {
            if (styleState === styles.img1) {
                controls.start({ opacity: 0 }).then(() => controls.start({ opacity: 1 }));
            }
        }, [styleState, controls]);
    };

    useEffect(() => {
        const interval = setInterval(cycleImages, 10000);
        return () => clearInterval(interval);
    }, [multimedia.length]);

    stylesState.forEach((styleState, index) => {
        animateOpacity(controls[index], styleState, index);
    });

    //carousel de imagenes
    const [page, setPage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPage((page + 1) % multimedia.length);
        }, 10000); 
        return () => clearInterval(interval);
    }, [page, multimedia.length]);

    const variants = {
        enter: {
            opacity: 0,
        },
        center: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
        },
    };


    return (
        <div className="h-full items-center relative grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
            {size.width >= 1024 ? multimedia.map((src, index) =>
                <motion.img
                    key={index}
                    animate={controls[index]}
                    transition={{ duration: 1 }}
                    src={src}
                    style={stylesState[index]}
                    alt=""
                    className="w-86% h-60 object-cover rounded-lg sm:h-3/4 sm:col-span-full lg:col-span-full shadow-lg shadow-gray-500"
                />
            ) : <AnimatePresence>
                <motion.img
                    key={page}
                    src={multimedia[page]}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        opacity: { duration: 1 },
                    }}
                    alt=""
                    className="w-full h-full object-cover rounded-lg sm:col-span-2 lg:col-span-full shadow-lg shadow-gray-500 absolute"
                    loading="lazy"
                />
            </AnimatePresence>}
        </div>
    );
}

export default ImagenesEstilizadas;

const styles = {
    img1: {
        position: 'absolute',
        zIndex: 3,
    },
    img2: {
        position: 'absolute',
        zIndex: 2,
        top: 0,
        right: '7%',
    },
    img3: {
        position: 'absolute',
        zIndex: 1,
        top: '5%',
        right: 0,
    },
}
