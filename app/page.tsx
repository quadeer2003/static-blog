import fs from 'fs';
import Link from 'next/link';

const getPostMetadata = () =>{
  const folder = "posts/";
  const files = fs.readdirSync(folder);
  const mdFiles = files.filter((file)=>file.endsWith(".md"));
  const slugs = mdFiles.map((file)=>file.replace(".md",""));
  return slugs;
}

const HomePage = () => {
  const postMetadata = getPostMetadata();
  const postPreviews = postMetadata.map((slug) => (
      <div>
        <Link href={`/posts/${slug}`}>
        {slug}
        </Link>
      </div>
  ));
  return <div>{postPreviews}</div> ;
}

export default HomePage;