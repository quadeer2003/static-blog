import Link from "next/link";
import { PostMetadata } from "./PostMetadata";

const postPreview = (props: PostMetadata) => {
    return(

     <div className="border border-violet-600 p-3 rounded-md shadow-md bg-white bg-opacity-20">

        <Link href={`/posts/${props.slug}`}>
            <h2 className="font-bold text-violet-600 hover:underline"> {props.title} </h2>
        </Link>
        <p className="text-sm text-slate-400">{props.subtitle}</p>
        <p className="text-sm text-slate-500">{props.date}</p>
    </div>
    );
}
export default postPreview;
