'use client';

import React, { useState, useMemo } from 'react';
import { Note } from '@/lib/types/notes';

type SortField = 'attachments';
type SortDirection = 'asc' | 'desc';

interface NotesTableProps {
  notes: Note[];
  className?: string;
  onSort?: (field: SortField, direction: SortDirection) => void;
  currentSort?: { field: SortField; direction: SortDirection };
}

export const NotesTable: React.FC<NotesTableProps> = ({ 
  notes, 
  className = '', 
  onSort,
  currentSort 
}) => {
  const [localSort, setLocalSort] = useState<{ field: SortField; direction: SortDirection } | null>(null);

  // Use external sort if provided, otherwise use local sort
  const activeSort = currentSort || localSort;

  // Helper functions for file display
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
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊';
    return '📎';
  };

  // Sort notes based on current sort
  const sortedNotes = useMemo(() => {
    if (!activeSort) return notes;

    return [...notes].sort((a, b) => {
      let aValue: any;
      let bValue: any;

             // Sort by attachment count or first attachment name
       const aAttachments = Array.isArray(a.attachments) ? a.attachments : (a.attachments ? [a.attachments] : []);
       const bAttachments = Array.isArray(b.attachments) ? b.attachments : (b.attachments ? [b.attachments] : []);
       aValue = aAttachments.length > 0 ? aAttachments[0]?.fileName || '' : '';
       bValue = bAttachments.length > 0 ? bAttachments[0]?.fileName || '' : '';

      if (activeSort.direction === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [notes, activeSort]);

  const handleSort = (field: SortField) => {
    const newDirection: SortDirection = 
      activeSort?.field === field && activeSort?.direction === 'asc' ? 'desc' : 'asc';
    
    const newSort = { field, direction: newDirection };
    
    if (onSort) {
      onSort(field, newDirection);
    } else {
      setLocalSort(newSort);
    }
  };

  const getSortIcon = (field: SortField) => {
    if (activeSort?.field !== field) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    return activeSort.direction === 'asc' ? (
      <svg className="w-4 h-4 text-[#FC5858]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-[#FC5858]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  if (notes.length === 0) {
    return (
      <div className={`text-center py-8 text-[#565E64] font-manrope ${className}`}>
        <p className="text-[14px]">No notes available</p>
      </div>
    );
  }

  return (
                                       <div className={`bg-[#F4EDE2] rounded-lg p-4 w-[95%] ml-[5%] ${className}`}>
       <div className="overflow-x-auto">
         <table className="w-full mx-auto border-separate border-spacing-y-2">
                     <thead>
             <tr className="border-b border-[#6C757D80]">
               <th 
                 className="text-left py-3 px-4 text-[12px] font-semibold text-[#11151B] font-manrope uppercase tracking-wide cursor-pointer hover:bg-gray-50"
                 onClick={() => handleSort('attachments')}
               >
                 <div className="flex items-center gap-2">
                   File
                   {getSortIcon('attachments')}
                 </div>
               </th>
               <th className="text-left py-3 px-4 text-[12px] font-semibold text-[#11151B] font-manrope uppercase tracking-wide">
                 Note
               </th>
             </tr>
           </thead>
          <tbody>
            {sortedNotes.map((note, index) => {
              // Handle attachments - could be array or single object
              const attachments = Array.isArray(note.attachments) 
                ? note.attachments 
                : (note.attachments ? [note.attachments] : []);

              return (
                                 <tr
                   key={note.id}
                   className={`${
                     index % 2 === 0 ? 'bg-white' : 'bg-[#F9F5FF]'
                   } hover:bg-gray-50 transition-colors rounded-lg`}
                 >
                   <td className="py-3 px-4">
                     {attachments.length > 0 ? (
                       <div className="space-y-1">
                         {attachments.map((attachment) => (
                           <div
                             key={attachment.id}
                             className="flex items-center justify-between p-2 bg-gray-50 rounded"
                           >
                             <a
                               href={attachment.url}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
                             >
                               <span>{getFileIcon(attachment.mimeType)}</span>
                               <span className="text-sm">{attachment.fileName}</span>
                               <span className="text-xs text-gray-500">
                                 ({formatFileSize(attachment.fileSize)})
                               </span>
                             </a>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <span className="text-[14px] text-gray-500 font-manrope">
                         No attachments
                       </span>
                     )}
                   </td>
                   <td className="py-3 px-4">
                     <span className="text-[14px] text-[#FC5858] font-manrope">
                       {note.note || 'No note content'}
                     </span>
                   </td>
                 </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
