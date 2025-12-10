import { createUploadthing, type FileRouter } from "uploadthing/next";
import { cookies } from "next/headers";

const f = createUploadthing();

// Middleware to check if user is authenticated (staff only)
const auth = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token) {
        throw new Error("Unauthorized - Please login as staff");
    }

    return { userId: "staff" }; // Return user info
};

// FileRouter for your app
export const ourFileRouter = {
    // Image uploader
    imageUploader: f({ image: { maxFileSize: "16MB", maxFileCount: 5 } })
        .middleware(async () => await auth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Image upload complete for userId:", metadata.userId);
            console.log("File URL:", file.url);

            // Save to database
            return { uploadedBy: metadata.userId, fileUrl: file.url };
        }),

    // ZIP uploader
    zipUploader: f({ "application/zip": { maxFileSize: "16MB", maxFileCount: 3 } })
        .middleware(async () => await auth())
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("ZIP upload complete for userId:", metadata.userId);
            console.log("File URL:", file.url);

            // Save to database
            return { uploadedBy: metadata.userId, fileUrl: file.url };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
