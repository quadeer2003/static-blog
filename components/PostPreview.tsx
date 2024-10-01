import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const PostPreview = ({ title, date, slug, tags = [] }: { title: string, date: string, slug: string, tags?: string[] }) => {
    return (
        <div className="border border-white/20 rounded-lg p-4 bg-white bg-opacity-20 backdrop-blur-lg shadow-xl">
            <Link href={`/posts/${slug}`}>
                <h2 className="text-xl font-bold">{title}</h2>
            </Link>
            <p className="text-gray-500">{date}</p>
            <div className="flex flex-wrap gap-2 my-2">
                {tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default PostPreview;