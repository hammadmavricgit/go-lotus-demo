export interface FileAttachment {
  id: string;
  url: string;
  publicId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface Note {
  id: number;
  issueDate: string | null;
  label: string | null;
  note: string | null;
  fileUrl: string | null;
  attachments: FileAttachment[] | null;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface NoteCreate {
  issueDate?: string;
  label?: string;
  note?: string;
  fileUrl?: string;
  attachments?: FileAttachment[];
  userId?: number;
}

export interface NoteUpdate {
  issueDate?: string;
  label?: string;
  note?: string;
  fileUrl?: string;
  attachments?: FileAttachment[];
  userId?: number;
}
