import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import File from '@/models/File';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// GET: List all files (public for now - add auth later if needed)
export async function GET(request: NextRequest) {
    try {
        await dbConnect();

        const files = await File.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ files }, { status: 200 });
    } catch (error) {
        console.error('Error fetching files:', error);
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 });
    }
}

// POST: Create file record (called after upload)
export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const body = await request.json();
        const { filename, originalName, fileUrl, fileType, mimeType, fileSize, thumbnailUrl } = body;

        const file = await File.create({
            filename,
            originalName,
            fileUrl,
            fileType,
            mimeType,
            fileSize,
            thumbnailUrl: thumbnailUrl || '',
            uploadedBy: 'staff',
            downloads: 0
        });

        return NextResponse.json({ file }, { status: 201 });
    } catch (error) {
        console.error('Error creating file:', error);
        return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
    }
}

// DELETE: Delete file
export async function DELETE(request: NextRequest) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'File ID required' }, { status: 400 });
        }

        const result = await File.findByIdAndDelete(id);

        if (!result) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'File deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error deleting file:', error);
        return NextResponse.json({
            error: 'Failed to delete file',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
