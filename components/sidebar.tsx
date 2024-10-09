"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const FileTreeSidebar = () => {
    const [state, setState] = useState({
        isPostsOpen: true,
        isProjectsOpen: true,
        postFiles: [] as string[],
        projectFiles: [] as string[],
        searchTerm: '',
        modalSearchTerm: '',
        isModalOpen: false,
        error: null as string | null,
        selectedIndex: -1,
        fileTreeSelectedIndex: 0,
    });

    const searchInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const [postsResponse, projectsResponse] = await Promise.all([
                    fetch('/api/getMarkdownFiles?folder=posts'),
                    fetch('/api/getMarkdownFiles?folder=projects')
                ]);

                if (!postsResponse.ok || !projectsResponse.ok) {
                    throw new Error('Failed to fetch files');
                }

                const [posts, projects] = await Promise.all([
                    postsResponse.json(),
                    projectsResponse.json()
                ]);

                if (!Array.isArray(posts) || !Array.isArray(projects)) {
                    throw new Error('Invalid response format');
                }

                setState(prevState => ({
                    ...prevState,
                    postFiles: posts,
                    projectFiles: projects
                }));
            } catch (err) {
                console.error('Error fetching files:', err);
                setState(prevState => ({ ...prevState, error: 'Failed to load files' }));
            }
        };

        fetchFiles();
    }, []);

    const filteredPostFiles = useMemo(() =>
        state.postFiles.filter(file => file.toLowerCase().includes(state.searchTerm.toLowerCase())),
        [state.postFiles, state.searchTerm]
    );

    const filteredProjectFiles = useMemo(() =>
        state.projectFiles.filter(file => file.toLowerCase().includes(state.searchTerm.toLowerCase())),
        [state.projectFiles, state.searchTerm]
    );

    const filteredModalPostFiles = useMemo(() =>
        state.postFiles.filter(file => file.toLowerCase().includes(state.modalSearchTerm.toLowerCase())),
        [state.postFiles, state.modalSearchTerm]
    );

    const filteredModalProjectFiles = useMemo(() =>
        state.projectFiles.filter(file => file.toLowerCase().includes(state.modalSearchTerm.toLowerCase())),
        [state.projectFiles, state.modalSearchTerm]
    );

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === 'k') {
            event.preventDefault();
            setState(prevState => ({ ...prevState, isModalOpen: true }));
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        } else if (event.key === 'Escape') {
            setState(prevState => ({
                ...prevState,
                isModalOpen: false,
                selectedIndex: -1,
                searchTerm: '',
                fileTreeSelectedIndex: 0
            }));
        } else if (event.key === 'Enter') {
            if (state.isModalOpen && state.selectedIndex >= 0) {
                const selectedFile = filteredModalPostFiles[state.selectedIndex] || filteredModalProjectFiles[state.selectedIndex - filteredModalPostFiles.length];
                const folder = filteredModalPostFiles.includes(selectedFile) ? 'posts' : 'projects';
                handleLinkClick(`/${folder}/${selectedFile.replace('.md', '')}`);
            }
        } else if (event.key === 'ArrowDown') {
            if (state.isModalOpen) {
                setState(prevState => ({
                    ...prevState,
                    selectedIndex: Math.min(prevState.selectedIndex + 1, filteredModalPostFiles.length + filteredModalProjectFiles.length - 1)
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    fileTreeSelectedIndex: Math.min(prevState.fileTreeSelectedIndex + 1, filteredPostFiles.length + filteredProjectFiles.length - 1)
                }));
            }
        } else if (event.key === 'ArrowUp') {
            if (state.isModalOpen) {
                setState(prevState => ({
                    ...prevState,
                    selectedIndex: Math.max(prevState.selectedIndex - 1, 0)
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    fileTreeSelectedIndex: Math.max(prevState.fileTreeSelectedIndex - 1, 0)
                }));
            }
        }
    }, [state.isModalOpen, state.selectedIndex, filteredModalPostFiles, filteredModalProjectFiles, filteredPostFiles, filteredProjectFiles]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    const validateUrl = (url: string) => {
        const allowedPaths = ['/posts/', '/projects/'];
        return allowedPaths.some(path => url.startsWith(path));
    };

    const handleLinkClick = (url: string) => {
        if (validateUrl(url)) {
            setState(prevState => ({ ...prevState, isModalOpen: false }));
            router.push(url);
        } else {
            console.error('Invalid URL:', url);
        }
    };

    const togglePosts = () => setState(prevState => ({ ...prevState, isPostsOpen: !prevState.isPostsOpen }));
    const toggleProjects = () => setState(prevState => ({ ...prevState, isProjectsOpen: !prevState.isProjectsOpen }));

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (state.error) {
        return <div className="text-red-500">{state.error}</div>;
    }

    return (
        <>
            {state.isModalOpen && (
                <div className="fixed inset-0 bg-cyan-900 bg-opacity-50 flex items-start justify-center z-50 pt-10">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 bg-opacity-10 backdrop-blur-md border border-white border-opacity-20">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={state.modalSearchTerm}
                            onChange={(e) => setState(prevState => ({ ...prevState, modalSearchTerm: e.target.value, selectedIndex: 0 }))}
                            ref={searchInputRef}
                            className="w-full p-2 border border-gray-300 rounded mb-4 bg-opacity-10 backdrop-blur-md border-opacity-20"
                        />
                        {state.modalSearchTerm && (
                            <div className="bg-white border border-gray-300 rounded shadow-lg max-h-40 overflow-y-auto bg-opacity-10 backdrop-blur-md border-opacity-20">
                                {filteredModalPostFiles.map((file, index) => (
                                    <div
                                        key={file}
                                        className={`p-2 hover:bg-gray-200 cursor-pointer ${index === state.selectedIndex ? 'bg-gray-200' : ''}`}
                                        onClick={() => handleLinkClick(`/posts/${file.replace('.md', '')}`)}
                                    >
                                        <span className="text-black-400">{file}</span>
                                    </div>
                                ))}
                                {filteredModalProjectFiles.map((file, index) => (
                                    <div
                                        key={file}
                                        className={`p-2 hover:bg-gray-200 cursor-pointer ${index + filteredModalPostFiles.length === state.selectedIndex ? 'bg-gray-200' : ''}`}
                                        onClick={() => handleLinkClick(`/projects/${file.replace('.md', '')}`)}
                                    >
                                        <span className="text-black-400">{file}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                        <button
                            onClick={() => setState(prevState => ({ ...prevState, isModalOpen: false }))}
                            className="mt-4 p-2 bg-blue-500 text-white rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className={`hidden lg:block w-64 text-black p-4 fixed h-full bg-opacity-15 ${state.isModalOpen ? 'blur-sm' : ''}`}>
                <h2 className="text-xl font-bold mb-4">File Tree</h2>
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Ctrl+K"
                        value={state.searchTerm}
                        onChange={(e) => setState(prevState => ({ ...prevState, searchTerm: e.target.value, fileTreeSelectedIndex: 0 }))}
                        className="w-full p-2 pl-10 border rounded bg-white bg-opacity-50 backdrop-blur-md border-white border-opacity-20 placeholder-gray-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="h-5 w-5 text-gray-500" />
                    </div>
                </div>
                {state.searchTerm && (
                    <div className="bg-white border rounded shadow-lg max-h-40 overflow-y-auto bg-opacity-10 backdrop-blur-md border-white border-opacity-20">
                        {filteredPostFiles.map((file, index) => (
                            <div
                                key={file}
                                className={`p-2 hover:bg-cyan-100 cursor-pointer ${index === state.fileTreeSelectedIndex ? 'bg-gray-200' : ''}`}
                                onClick={() => handleLinkClick(`/posts/${file.replace('.md', '')}`)}
                            >
                                <span className="text-black-400">{file}</span>
                            </div>
                        ))}
                        {filteredProjectFiles.map((file, index) => (
                            <div
                                key={file}
                                className={`p-2 hover:bg-cyan-100 cursor-pointer ${index + filteredPostFiles.length === state.fileTreeSelectedIndex ? 'bg-gray-200' : ''}`}
                                onClick={() => handleLinkClick(`/projects/${file.replace('.md', '')}`)}
                            >
                                <span className="text-black-400">{file}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div>
                    <div className="flex items-center">
                        <h3 className="font-semibold cursor-pointer flex-grow" onClick={() => scrollToSection('posts')}>
                            Posts
                        </h3>
                        <div className="cursor-pointer" onClick={togglePosts}>
                            {state.isPostsOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                    {state.isPostsOpen && (
                        <ul className="mb-4">
                            {filteredPostFiles.map((file) => (
                                <li key={file}>
                                    <span className="text-black-400 hover:underline cursor-pointer" onClick={() => handleLinkClick(`/posts/${file.replace('.md', '')}`)}>{file}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="flex items-center">
                        <h3 className="font-semibold cursor-pointer flex-grow" onClick={() => scrollToSection('projects')}>
                            Projects
                        </h3>
                        <div className="cursor-pointer" onClick={toggleProjects}>
                            {state.isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                    </div>
                    {state.isProjectsOpen && (
                        <ul>
                            {filteredProjectFiles.map((file) => (
                                <li key={file}>
                                    <span className="text-black-400 hover:underline cursor-pointer" onClick={() => handleLinkClick(`/projects/${file.replace('.md', '')}`)}>{file}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default FileTreeSidebar;