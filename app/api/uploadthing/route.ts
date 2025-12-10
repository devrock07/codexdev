import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import File from '@/models/File';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Simple file upload without Uploadthing - stores base64 in MongoDB
export async function POST(request: NextRequest) {
    try {
        // Check authentication
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token');

        // Allow upload for testing - you can add strict auth later
        const userId = token ? 'staff' : 'anonymous';

        await dbConnect();

        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Read file as buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Convert to base64 for storage
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type};base64,${base64}`;

        // Create file record
        const fileRecord = await File.create({
            filename: `${Date.now()}-${file.name}`,
            originalName: file.name,
            fileUrl: dataUrl, // Store as base64 data URL
            fileType: file.type.startsWith('image/') ? 'image' : 'zip',
            mimeType: file.type,
            fileSize: file.size,
            thumbnailUrl: file.type.startsWith('image/') ? dataUrl : '',
            uploadedBy: userId,
            downloads: 0
        });

        return NextResponse.json({
            success: true,
            file: {
                id: fileRecord._id,
                url: dataUrl,
                name: file.name
            }
        }, { status: 201 });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({
            error: 'Upload failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
