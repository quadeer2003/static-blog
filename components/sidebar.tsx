import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const getMarkdownFiles = (folder: string) => {
    const directoryPath = path.join(process.cwd(), folder);
    const filenames = fs.readdirSync(directoryPath);
    return filenames.filter((file) => file.endsWith('.md'));
};

const FileTreeSidebar = () => {
<<<<<<< Updated upstream
    const postFiles = getMarkdownFiles('posts');
    const projectFiles = getMarkdownFiles('projects');
=======
    const [isPostsOpen, setIsPostsOpen] = useState(false);
    const [isProjectsOpen, setIsProjectsOpen] = useState(false);
    const [postFiles, setPostFiles] = useState<string[]>([]);
    const [projectFiles, setProjectFiles] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const postsResponse = await fetch('/api/getMarkdownFiles?folder=posts');
                const projectsResponse = await fetch('/api/getMarkdownFiles?folder=projects');
                if (!postsResponse.ok || !projectsResponse.ok) {
                    throw new Error('Failed to fetch files');
                }
                const posts = await postsResponse.json();
                const projects = await projectsResponse.json();
                if (!Array.isArray(posts) || !Array.isArray(projects)) {
                    throw new Error('Invalid response format');
                }
                setPostFiles(posts);
                setProjectFiles(projects);
            } catch (err) {
                console.error('Error fetching files:', err);
                setError('Failed to load files');
            }
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
>>>>>>> Stashed changes

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
<<<<<<< Updated upstream
        <div className="hidden lg:block w-64 bg-gray-800 text-black p-4 fixed h-full bg-opacity-15">
=======
        <div className="hidden lg:block w-64 text-black p-4 fixed h-full bg-opacity-15">
>>>>>>> Stashed changes
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