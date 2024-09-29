import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/components/getPostMetadata";

const getPostContent = (slug: string) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    const matterResult = matter(content);
    return matterResult;
};

export const generateStaticParams = async () => {
    const posts = getPostMetadata();
    return posts.map((post) => ({
        slug: post.slug,
    }));
};

const PostPage = (props: any) => {
    const slug = props.params.slug;
    const post = getPostContent(slug);
    const tags = post.data.tags || [];

    return (
        <div>
            <h1 className="text-2xl text-slate-400">{post.data.title}</h1>
            <div className="flex flex-wrap gap-2 my-2">
                {tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
            <article className="prose lg:prose-base">
                <Markdown>{post.content}</Markdown>
            </article>
        </div>
    );
};

export default PostPage;