import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import File from '@/models/File';

export const dynamic = 'force-dynamic';

// GET: Get file by ID and increment download counter
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await dbConnect();

        const file = await File.findById(id).lean();

        if (!file) {
            return NextResponse.json({ error: 'File not found' }, { status: 404 });
        }

        // Increment download counter
        await File.findByIdAndUpdate(id, { $inc: { downloads: 1 } });

        return NextResponse.json({ file }, { status: 200 });
    } catch (error) {
        console.error('Error fetching file:', error);
        return NextResponse.json({ error: 'Failed to fetch file' }, { status: 500 });
    }
}
