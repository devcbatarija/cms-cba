import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { sRGBEncoding } from 'three';
import './Gallery360.css';

const Gallery360 = ({ image }) => {
    if (!image) {
        return <div className="w-full h-80 flex items-center justify-center">
            <h1 className="text-1xl font-extrabold text-gray-900 dark:text-white text-center md:text-1xl lg:text-1xl">
                Debes seleccionar un ambiente
            </h1>
        </div>;
    }

    const canvasRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(100, canvas.clientWidth / canvas.clientHeight, 1, 2000);

        // Crear el renderer y configurar el antialiasing, la codificación de salida y el factor gamma
        const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputEncoding = sRGBEncoding;
        renderer.gammaFactor = 2.2;

        camera.position.z = 5;

        // Cargar la textura y configurar el mapeo de color
        const texture = new THREE.TextureLoader().load(image);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.encoding = sRGBEncoding;
        texture.needsUpdate = true;

        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.rotation.y = Math.PI; // Rotar la esfera para que la imagen no esté invertida
        scene.add(sphere);

        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };
        const handleTouchStart = (event) => {
            isDragging = true;
            previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        };

        const handleTouchMove = (event) => {
            const { clientX, clientY } = event.touches[0];
            const deltaX = clientX - previousMousePosition.x;
            const deltaY = clientY - previousMousePosition.y;

            if (isDragging) {
                sphere.rotation.y += deltaX * 0.01;
                sphere.rotation.x += deltaY * 0.01;
            }

            previousMousePosition = { x: clientX, y: clientY };
        };

        const handleTouchEnd = () => {
            isDragging = false;
        };
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            const deltaX = clientX - previousMousePosition.x;
            const deltaY = clientY - previousMousePosition.y;

            if (isDragging) {
                sphere.rotation.y += deltaX * 0.01;
                sphere.rotation.x += deltaY * 0.01;
            }

            previousMousePosition = { x: clientX, y: clientY };
        };

        const handleMouseDown = (event) => {
            isDragging = true;
            previousMousePosition = { x: event.clientX, y: event.clientY };
        };

        const handleMouseUp = () => {
            isDragging = false;
        };
        // Asegúrate de actualizar el tamaño del renderer cuando el tamaño del contenedor cambie
        const handleResize = () => {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        const animate = () => {
            requestRef.current = requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            cancelAnimationFrame(requestRef.current);
        };
    }, [image]);

    return (

        <div className="w-full h-full">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default Gallery360;
