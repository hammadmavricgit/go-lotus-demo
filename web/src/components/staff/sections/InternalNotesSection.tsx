'use client';

import { useState, useRef } from 'react';
import { useNotes } from '@/hooks/useNotes';
import { FileAttachment } from '@/lib/types/notes';

interface InternalNotesSectionProps {
  staffId: string;
}

export function InternalNotesSection({ staffId }: InternalNotesSectionProps) {
  const {
    notes,
    loading,
    error,
    uploading,
    createNote,
    deleteNote,
    deleteAttachment,
  } = useNotes(staffId);
  const [noteContent, setNoteContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() && selectedFiles.length === 0) return;

    try {
      await createNote(
        { note: noteContent.trim() || undefined },
        selectedFiles.length > 0 ? selectedFiles : undefined
      );

      // Reset form
      setNoteContent('');
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝';
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet'))
      return '📊';
    return '📎';
  };

  if (loading) {
    return (
      <div className='bg-white rounded-lg border border-gray-200 p-6'>
        <div className='animate-pulse'>
          <div className='h-6 bg-gray-200 rounded w-1/4 mb-4'></div>
          <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h3 className='text-lg font-semibold text-gray-900'>Internal Notes</h3>
        <span className='text-sm text-gray-500'>
          {notes.length} note{notes.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Add Note Form */}
      <form onSubmit={handleSubmit} className='mb-6 space-y-4'>
        <div>
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder='Add internal note...'
            className='w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            rows={3}
            disabled={uploading}
          />
        </div>

        {/* File Upload */}
        <div className='space-y-2'>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            onChange={handleFileSelect}
            className='hidden'
            accept='image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt'
            disabled={uploading}
          />
          <button
            type='button'
            onClick={() => fileInputRef.current?.click()}
            className='px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50'
            disabled={uploading}
          >
            📎 Attach Files
          </button>
        </div>

        {/* Selected Files Preview */}
        {selectedFiles.length > 0 && (
          <div className='space-y-2'>
            <p className='text-sm font-medium text-gray-700'>Selected Files:</p>
            <div className='space-y-1'>
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between p-2 bg-gray-50 rounded'
                >
                  <div className='flex items-center space-x-2'>
                    <span>{getFileIcon(file.type)}</span>
                    <span className='text-sm text-gray-700'>{file.name}</span>
                    <span className='text-xs text-gray-500'>
                      ({formatFileSize(file.size)})
                    </span>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='text-red-500 hover:text-red-700 text-sm'
                    disabled={uploading}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type='submit'
          disabled={
            uploading || (!noteContent.trim() && selectedFiles.length === 0)
          }
          className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {uploading ? 'Adding Note...' : 'Add Note'}
        </button>
      </form>

      {/* Error Display */}
      {error && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
          <p className='text-sm text-red-600'>{error}</p>
        </div>
      )}

      {/* Notes List */}
      <div className='space-y-4'>
        {notes.length === 0 ? (
          <div className='text-center py-8 text-gray-500'>
            <p>No internal notes yet.</p>
            <p className='text-sm'>Add a note to get started.</p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className='border border-gray-200 rounded-lg p-4'
            >
              {/* Note Content */}
              {note.note && <p className='text-gray-700 mb-3'>{note.note}</p>}

              {/* Attachments */}
              {note.attachments && note.attachments.length > 0 && (
                <div className='mb-3'>
                  <p className='text-sm font-medium text-gray-700 mb-2'>
                    Attachments:
                  </p>
                  <div className='space-y-1'>
                    {note.attachments.map((attachment) => (
                      <div
                        key={attachment.id}
                        className='flex items-center justify-between p-2 bg-gray-50 rounded'
                      >
                        <a
                          href={attachment.url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center space-x-2 text-blue-600 hover:text-blue-800'
                        >
                          <span>{getFileIcon(attachment.mimeType)}</span>
                          <span className='text-sm'>{attachment.fileName}</span>
                          <span className='text-xs text-gray-500'>
                            ({formatFileSize(attachment.fileSize)})
                          </span>
                        </a>
                        <button
                          onClick={() =>
                            deleteAttachment(
                              note.id,
                              attachment.id,
                              attachment.publicId
                            )
                          }
                          className='text-red-500 hover:text-red-700 text-sm'
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Note Metadata */}
              <div className='flex items-center justify-between text-xs text-gray-500'>
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => deleteNote(note.id)}
                  className='text-red-500 hover:text-red-700'
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
