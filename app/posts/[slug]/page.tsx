import fs from "fs";

const getPostContent = (slug:string) => {
    const folder = "posts/";
    const file = `${folder}${slug}.md`;
    const content = fs.readFileSync(file, "utf8");
    return content;
}


const PostPage = (props:any) =>{
    const slug = props.params.slug;
    const content = getPostContent(slug);
    return(
        <p>
            <h1>This is: {slug}</h1>
            <p>{content}</p>
        </p>
    );
};


export default PostPage;
