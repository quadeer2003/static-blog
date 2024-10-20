"use client";
import React, { useEffect } from 'react';
import tsIcon from "./../public/typescript-icon.png";
import linuxIcon from "./../public/linux-icon.png";
import vimIcon from "./../public/vim-icon.png";
import rustIcon from "./../public/rust.png";
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const Hero: React.FC = () => {
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const icons = document.querySelectorAll('.floating-icon');
            icons.forEach(icon => {
                const rect = icon.getBoundingClientRect();
                const iconX = rect.left + rect.width / 2;
                const iconY = rect.top + rect.height / 2;
                const deltaX = (event.clientX - iconX) * 0.05; // Decreased the multiplier for less movement
                const deltaY = (event.clientY - iconY) * 0.05; // Decreased the multiplier for less movement
                (icon as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            });
        };

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            // Add default floating effect
            const icons = document.querySelectorAll('.floating-icon');
            icons.forEach(icon => {
                (icon as HTMLElement).style.animation = 'floating 3s ease-in-out infinite';
            });
        } else {
            document.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (!isMobile) {
                document.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);

    return (
        <div className={`relative p-8 md:p-16 bg-white bg-opacity-10 backdrop-blur-md rounded-lg bg-gradient-to-br from-cyan-200 to-cyan-100 text-center mb-8 ${poppins.className}`}>
            <h1 className="text-4xl md:text-6xl font-bold">
                <span className="text-blue-500">Mohammad</span> <span className="text-black">Abdul Quadeer</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-black">
                I'm a software developer who loves building products that I love. I'm interested in web development, machine learning, and Linux.
            </p>
            <Image src={tsIcon} alt="TypeScript" className="floating-icon absolute w-8 h-8 md:w-12 md:h-12 transition-transform duration-100 ease-out top-10 left-2" />
            <Image src={linuxIcon} alt="Linux" className="floating-icon absolute w-8 h-8 md:w-12 md:h-12 transition-transform duration-100 ease-out top-16 right-12" />
            <Image src={vimIcon} alt="Vim" className="floating-icon absolute w-8 h-8 md:w-12 md:h-12 transition-transform duration-100 ease-out bottom-12 left-2" />
            <Image src={rustIcon} alt="Rust" className="floating-icon absolute w-8 h-8 md:w-12 md:h-12 transition-transform duration-100 ease-out bottom-8 right-8" />
        </div>
    );
};

export default Hero;