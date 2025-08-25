# Cloudinary Setup Guide

## Step 1: Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your Credentials

1. Log into your Cloudinary dashboard
2. Go to the "Dashboard" section
3. Copy your credentials:
   - Cloud Name
   - API Key
   - API Secret

## Step 3: Create Upload Preset (Required for Frontend Uploads)

1. In your Cloudinary dashboard, go to **Settings** → **Upload**
2. Scroll down to **Upload presets**
3. Click **Add upload preset**
4. Set the following:
   - **Preset name**: `staff-notes-upload` (or any name you prefer)
   - **Signing Mode**: `Unsigned`
   - **Folder**: `staff-notes`
   - **Resource type**: `Auto`
5. Click **Save**

## Step 4: Add Environment Variables

Add these variables to your `.env.local` file:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
NEXT_PUBLIC_CLOUDINARY_API_SECRET="your-api-secret"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="staff-notes-upload"
```

**Important Notes:**

- The `UPLOAD_PRESET` must match the preset name you created in Step 3
- All variables must start with `NEXT_PUBLIC_` for frontend access
- The API secret is only used for file deletion (server-side)

## Step 5: Test Upload

1. Start your development server
2. Go to a staff details page
3. Try adding a note with file attachment
4. Check your Cloudinary dashboard to see uploaded files

## Free Tier Limits

- **Storage:** 25 GB
- **Bandwidth:** 25 GB/month
- **Transformations:** 25,000/month
- **Uploads:** 25,000/month

## File Types Supported

- Images (JPG, PNG, GIF, WebP, etc.)
- Documents (PDF, DOC, DOCX, XLS, XLSX, TXT)
- Videos (MP4, MOV, AVI, etc.)

## Security Notes

- Files are stored in the `staff-notes` folder
- Each file gets a unique public ID
- Files are publicly accessible via URL
- Upload preset is unsigned (no server-side validation)
- Consider implementing access controls for production

## Troubleshooting

**Error: "Upload preset not found"**

- Make sure the upload preset name matches exactly
- Ensure the preset is set to "Unsigned" mode
- Check that the preset is active

**Error: "Module not found: Can't resolve 'fs'"**

- This is fixed by using unsigned uploads (no Node.js SDK needed)
- The new implementation uses direct API calls instead
