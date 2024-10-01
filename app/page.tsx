import PostPreview from '@/components/PostPreview';
import ProjectPreview from '@/components/ProjectPreview';
import getPostMetadata from '@/components/getPostMetadata';
import getProjectMetadata from '@/components/getProjectMetadata';
import TerminalBlock from '@/components/terminalBlock';
import FileTreeSidebar from '@/components/sidebar';
import Link from 'next/link';

const HomePage = () => {
    const postMetadata = getPostMetadata();
    const projectMetadata = getProjectMetadata();

    const postPreviews = postMetadata.map((post) => (
        <PostPreview key={post.slug} {...post} />
    ));

    const projectPreviews = projectMetadata.map((project) => (
        <ProjectPreview key={project.slug} {...project} />
    ));

    return (
        <div className="flex">
            {/* <FileTreeSidebar /> */}
            <div className="flex-grow p-0">
                <TerminalBlock />
                <h1 id="posts" className="text-3xl font-bold mb-4">Posts</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
                    {postPreviews}
                </div>
                <h1 id="projects" className="text-3xl font-bold mb-4">Projects</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {projectPreviews}
                </div>
            </div>
        </div>
    );
};

export default HomePage;