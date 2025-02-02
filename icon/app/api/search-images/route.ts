// app/api/search-images/route.ts
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder'); // 예: "1_Human sounds"
    const filename = searchParams.get('filename'); // 예: "Cheering.png"

    if (!folder || !filename) {
        return NextResponse.json(
            { error: 'Both folder and filename are required' },
            { status: 400 }
        );
    }

    try {
        const s3Client = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY!,
                secretAccessKey: process.env.AWS_SECRET_KEY!
            },
            region: 'ap-northeast-2',
        });

        const searchKey = `${folder}/${filename}`;

        const listObjectsCommand = new ListObjectsV2Command({
            Bucket: 'ku-sw-project',
            Prefix: '',
        });

        const { Contents } = await s3Client.send(listObjectsCommand);

        const filteredImages = (Contents || [])
            .filter((obj) => obj.Key === searchKey)
            .map((obj) => ({
                key: obj.Key!,
                url: `https://ku-sw-project.s3.ap-northeast-2.amazonaws.com/${obj.Key}`
            }));

        return NextResponse.json({ images: filteredImages });
    } catch (error) {
        console.error('Error searching images:', error);
        return NextResponse.json(
            { error: 'Failed to search images' },
            { status: 500 }
        );
    }
}