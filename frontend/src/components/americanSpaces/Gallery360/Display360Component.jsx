import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Gallery360.css';

const Gallery360 = ({ image }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);

        // Obtener la textura del objeto proporcionado por props
        const texture = new THREE.TextureLoader().load(image);
        const geometry = new THREE.SphereGeometry(5, 32, 32);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const sphere = new THREE.Mesh(geometry, material);
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
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchstart', handleTouchStart);
            window.addEventListener('touchmove', handleTouchMove);
            window.addEventListener('touchend', handleTouchEnd);
        };
    }, [image]); // Asegúrate de pasar textureObject como una dependencia si quieres que cambie cuando las props cambien

    return (
        <div className="w-full h-full">
            <canvas ref={canvasRef} className="w-full h-full" />
        </div>
    );
};

export default Gallery360;
