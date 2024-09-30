import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const getMarkdownFiles = (folder: string) => {
    const directoryPath = path.join(process.cwd(), folder);
    const filenames = fs.readdirSync(directoryPath);
    return filenames.filter((file) => file.endsWith('.md'));
};

const FileTreeSidebar = () => {
    const postFiles = getMarkdownFiles('posts');
    const projectFiles = getMarkdownFiles('projects');

    return (
        <div className="hidden lg:block w-64 bg-gray-800 text-black p-4 fixed h-full bg-opacity-15">
            <h2 className="text-xl font-bold mb-4">File Tree</h2>
            <div>
                <h3 className="font-semibold">Posts</h3>
                <ul className="mb-4">
                    {postFiles.map((file) => (
                        <li key={file}>
                            <Link href={`/posts/${file.replace('.md', '')}`}>
                                <span className="text-black-400 hover:underline">{file}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <h3 className="font-semibold">Projects</h3>
                <ul>
                    {projectFiles.map((file) => (
                        <li key={file}>
                            <Link href={`/projects/${file.replace('.md', '')}`}>
                                <span className="text-black-400 hover:underline">{file}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FileTreeSidebar;