import fs from "fs";
import matter from "gray-matter";
import { ProjectMetadata } from "../components/ProjectMetadata";

const getProjectMetadata = (): ProjectMetadata[] => {
    const folder = "projects/";
    const files = fs.readdirSync(folder);
    const markdownProjects = files.filter((file) => file.endsWith(".md"));

    const projects = markdownProjects.map((fileName) => {
        const fileContents = fs.readFileSync(`projects/${fileName}`, "utf8");
        const matterResult = matter(fileContents);
        return {
            title: matterResult.data.title,
            date: matterResult.data.date,
            subtitle: matterResult.data.subtitle,
            slug: fileName.replace(".md", ""),
            tags: matterResult.data.tags || [],
        };
    });
    return projects;
};

export default getProjectMetadata;