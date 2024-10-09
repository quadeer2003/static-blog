import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import fs from "fs";
import Markdown from "markdown-to-jsx";
import matter from "gray-matter";
import getPostMetadata from "@/components/getPostMetadata";
import ReactMarkdown from "react-markdown";

const getPostContent = (slug: string) => {
    const folder = "content/posts/";
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
    const renderers = {
        code: ({ node, ...props }: { node: any; [key: string]: any }) => {
          // Check if the code element is block-level
          if (!props["data-inline"]) {
            return (
              <SyntaxHighlighter style={oneDark} language="c">
                {props.children}
              </SyntaxHighlighter>
            );
          }
          // If it's inline code, render as plain text
          return <p>{props.children}</p>;
        },
      };
    const components = {
        code({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode }) {
          const match = /language-(\w+)/.exec(className || '');
          if (!inline && match) {
            return (
              <SyntaxHighlighter
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            );
          }
          return (
            <code className="bg-gray-200 text-gray-700 px-1 py-0.5 rounded">
              {children}
            </code>
          );
        },
        h1(props: React.HTMLAttributes<HTMLHeadingElement>) {
            return <h1 className="text-3xl font-bold my-4">{props.children}</h1>;
          },
          h2(props: React.HTMLAttributes<HTMLHeadingElement>) {
            return <h2 className="text-2xl font-bold my-4">{props.children}</h2>;
          },
          h3(props: React.HTMLAttributes<HTMLHeadingElement>) {
            return <h3 className="text-xl font-bold my-4">{props.children}</h3>;
          },
          p(props: React.HTMLAttributes<HTMLParagraphElement>) {
            return <p className="my-2">{props.children}</p>;
          },
            ul(props: React.HTMLAttributes<HTMLUListElement>) {
              return <ul className="list-disc list-inside my-2">{props.children}</ul>;
            },
            ol(props: React.HTMLAttributes<HTMLOListElement>) {
              return <ol className="list-decimal list-inside my-2">{props.children}</ol>;
            },
          blockquote(props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
            return <blockquote className="border-l-4 border-gray-300 pl-4 italic my-2" {...props}>{props.children}</blockquote>;
          },
        };
    return (
        <div className="">
            <h1 className="text-2xl text-slate-400">{post.data.title}</h1>
            <div className="flex flex-wrap gap-2 my-2">
                {tags.map((tag: string) => (
                    <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {tag}
                    </span>
                ))}
            </div>
            {/* Render the content with the custom components */}
            <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
        </div>
    );
};

export default PostPage;