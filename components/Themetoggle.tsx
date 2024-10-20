"use client";
import { useState, useEffect } from 'react';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (localStorage.theme) {
            setTheme(localStorage.theme);
            document.documentElement.classList.add(localStorage.theme);
            console.log(`Initial theme set to ${localStorage.theme}`);
        } else {
            localStorage.theme = 'light';
            console.log('Initial theme set to light');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.theme = newTheme;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(newTheme);
        console.log(`Theme toggled to ${newTheme}`);
    };

    return (
        <button onClick={toggleTheme} className="p-2 rounded bg-gray-200 dark:bg-gray-800">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
    );
};

export default ThemeToggle;