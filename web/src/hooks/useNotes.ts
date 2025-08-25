import { useState, useEffect } from 'react';
import {
  Note,
  NoteCreate,
  NoteUpdate,
  FileAttachment,
} from '@/lib/types/notes';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import {
  validateNotes,
  transformBackendNotesToNotes,
} from '@/lib/validation/staff-details';

interface UseNotesReturn {
  notes: Note[];
  loading: boolean;
  error: string | null;
  uploading: boolean;
  fetchNotes: () => Promise<void>;
  createNote: (noteData: NoteCreate, files?: File[]) => Promise<void>;
  updateNote: (id: number, noteData: NoteUpdate) => Promise<void>;
  deleteNote: (id: number) => Promise<void>;
  deleteAttachment: (
    noteId: number,
    attachmentId: string,
    publicId: string
  ) => Promise<void>;
}

export function useNotes(staffId: string): UseNotesReturn {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Auto-fetch notes when staffId changes (only if valid)
  useEffect(() => {
    if (staffId && staffId.trim() !== '') {
      fetchNotes();
    } else {
      setNotes([]);
      setError(null);
    }
  }, [staffId]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchNotes = async () => {
    // Only fetch notes if a valid staffId is provided
    if (!staffId || staffId.trim() === '') {
      setNotes([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/notes?userId=${staffId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }

      const data = await response.json();

      // Transform the data first
      const transformedNotes = transformBackendNotesToNotes(data.data || []);

      // Then validate the transformed data
      const validationResult = validateNotes(transformedNotes);
      if (!validationResult.success) {
        console.error(
          '🔍 useNotes: Validation errors:',
          validationResult.error
        );
      }

      setNotes(transformedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes');
      console.error('🔍 useNotes: Error fetching notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData: NoteCreate, files?: File[]) => {
    setUploading(true);
    setError(null);
    try {
      let attachments: FileAttachment[] = [];

      // Upload files to Cloudinary if provided
      if (files && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const uploadResult = await uploadToCloudinary(file);
          return {
            id: uploadResult.publicId,
            url: uploadResult.url,
            publicId: uploadResult.publicId,
            fileName: uploadResult.fileName,
            fileSize: uploadResult.fileSize,
            mimeType: uploadResult.mimeType,
            uploadedAt: new Date().toISOString(),
          };
        });

        attachments = await Promise.all(uploadPromises);
      }

      // Create note with attachments
      const noteWithAttachments = {
        ...noteData,
        userId: parseInt(staffId),
        attachments:
          attachments.length > 0 ? JSON.stringify(attachments) : undefined,
      };

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteWithAttachments),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      // Refresh notes list
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
      console.error('Error creating note:', err);
    } finally {
      setUploading(false);
    }
  };

  const updateNote = async (id: number, noteData: NoteUpdate) => {
    setError(null);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      // Refresh notes list
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update note');
      console.error('Error updating note:', err);
    }
  };

  const deleteNote = async (id: number) => {
    setError(null);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      // Refresh notes list
      await fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
      console.error('Error deleting note:', err);
    }
  };

  const deleteAttachment = async (
    noteId: number,
    attachmentId: string,
    publicId: string
  ) => {
    setError(null);
    try {
      // Delete from Cloudinary
      await deleteFromCloudinary(publicId);

      // Update note to remove attachment
      const note = notes.find((n) => n.id === noteId);
      if (note && note.attachments) {
        const updatedAttachments = note.attachments.filter(
          (a) => a.id !== attachmentId
        );
        await updateNote(noteId, { attachments: updatedAttachments });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to delete attachment'
      );
      console.error('Error deleting attachment:', err);
    }
  };

  return {
    notes,
    loading,
    error,
    uploading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    deleteAttachment,
  };
}
