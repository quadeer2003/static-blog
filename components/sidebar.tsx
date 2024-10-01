"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FileTreeSidebar = () => {
    const [isPostsOpen, setIsPostsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [postFiles, setPostFiles] = useState<string[]>([]);
    const [projectFiles, setProjectFiles] = useState<string[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            const postsResponse = await fetch('/api/getMarkdownFiles?folder=posts');
            const projectsResponse = await fetch('/api/getMarkdownFiles?folder=projects');
            const posts = await postsResponse.json();
            const projects = await projectsResponse.json();
            setPostFiles(posts);
            setProjectFiles(projects);
        };

        fetchFiles();
    }, []);

    const togglePosts = () => setIsPostsOpen(!isPostsOpen);
    const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="hidden lg:block w-64  text-black p-4 fixed h-full bg-opacity-15">
            <h2 className="text-xl font-bold mb-4">File Tree</h2>
            <div>
                <div className="flex items-center">
                    <h3 className="font-semibold cursor-pointer flex-grow" onClick={() => scrollToSection('posts')}>
                        Posts
                    </h3>
                    <div className="cursor-pointer" onClick={togglePosts}>
                        {isPostsOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                </div>
                {isPostsOpen && (
                    <ul className="mb-4">
                        {postFiles.map((file) => (
                            <li key={file}>
                                <Link href={`/posts/${file.replace('.md', '')}`}>
                                    <span className="text-black-400 hover:underline">{file}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex items-center">
                    <h3 className="font-semibold cursor-pointer flex-grow" onClick={() => scrollToSection('projects')}>
                        Projects
                    </h3>
                    <div className="cursor-pointer" onClick={toggleProjects}>
                        {isProjectsOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                </div>
                {isProjectsOpen && (
                    <ul>
                        {projectFiles.map((file) => (
                            <li key={file}>
                                <Link href={`/projects/${file.replace('.md', '')}`}>
                                    <span className="text-black-400 hover:underline">{file}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default FileTreeSidebar;