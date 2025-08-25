'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/Button/Button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dilaog/Dialog';
import { useProfile } from '@/hooks/useProfile';

interface ProfilePictureUploadProps {
  currentImageUrl?: string | null;
  onImageUpload?: (imageUrl: string) => void;
  onImageDelete?: () => void;
}

export function ProfilePictureUpload({
  currentImageUrl,
  onImageUpload,
  onImageDelete,
}: ProfilePictureUploadProps) {
  const { uploadProfileImage, uploadingImage, error } = useProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file');
        return;
      }

      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setUploadError(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  // Handle file upload
  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    try {
      setUploadError(null);
      const imageUrl = await uploadProfileImage(selectedFile);

      // Call callback if provided
      onImageUpload?.(imageUrl);

      // Close dialog and reset state
      setIsOpen(false);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setUploadError(errorMessage);
    }
  }, [selectedFile, uploadProfileImage, onImageUpload]);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) {
        // Handle the dropped file directly
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setIsOpen(false);
      }
    },
    [handleFileSelect]
  );

  // Handle delete current image
  const handleDeleteCurrent = useCallback(() => {
    onImageDelete?.();
  }, [onImageDelete]);

  return (
    <div className='flex flex-col items-center gap-4'>
      {/* Current Profile Picture */}
      <div className='relative'>
        <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200'>
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt='Profile'
              className='w-full h-full object-cover'
            />
          ) : (
            <div className='w-full h-full flex items-center justify-center'>
              <svg
                className='w-12 h-12 text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}
        </div>

        {/* Upload Button Overlay */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className='absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 bg-[#FC5858] hover:bg-[#e04a4a]'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                />
              </svg>
            </Button>
          </DialogTrigger>

          <DialogContent className='sm:max-w-md'>
            <DialogHeader>
              <DialogTitle>Upload Profile Picture</DialogTitle>
            </DialogHeader>

            <div className='space-y-4'>
              {/* Drag & Drop Area */}
              <div
                className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#FC5858] transition-colors'
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                {preview ? (
                  <div className='space-y-2'>
                    <img
                      src={preview}
                      alt='Preview'
                      className='w-24 h-24 mx-auto rounded-full object-cover'
                    />
                    <p className='text-sm text-gray-600'>
                      {selectedFile?.name}
                    </p>
                  </div>
                ) : (
                  <div className='space-y-2'>
                    <svg
                      className='w-12 h-12 mx-auto text-gray-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                      />
                    </svg>
                    <p className='text-sm text-gray-600'>
                      Click to select or drag and drop
                    </p>
                    <p className='text-xs text-gray-500'>
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                onChange={handleFileSelect}
                className='hidden'
              />

              {/* Error Messages */}
              {(uploadError || error) && (
                <div className='text-red-600 text-sm'>
                  {uploadError || error}
                </div>
              )}

              {/* Action Buttons */}
              <div className='flex gap-2 justify-end'>
                <Button
                  variant='outline'
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedFile(null);
                    setPreview(null);
                    setUploadError(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || uploadingImage}
                  className='bg-[#FC5858] hover:bg-[#e04a4a]'
                >
                  {uploadingImage ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Current Image Button */}
      {currentImageUrl && (
        <Button
          variant='outline'
          onClick={handleDeleteCurrent}
          className='text-red-600 border-red-200 hover:bg-red-50'
        >
          Remove Picture
        </Button>
      )}
    </div>
  );
}
