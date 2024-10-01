// app/api/getMarkdownFiles/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const getMarkdownFiles = (folder: string) => {
    const contentDirectory = process.env.CONTENT_DIRECTORY || 'content';
    const directoryPath = path.join(process.cwd(), contentDirectory, folder);
    const filenames = fs.readdirSync(directoryPath);
    return filenames.filter((file) => file.endsWith('.md'));
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');
    if (!folder) {
        return NextResponse.json({ error: 'Invalid folder parameter' }, { status: 400 });
    }

    try {
        const files = getMarkdownFiles(folder);
        return NextResponse.json(files);
    } catch (error) {
        console.error('Error reading directory:', error);
        return NextResponse.json({ error: 'Failed to read files' }, { status: 500 });
    }
}