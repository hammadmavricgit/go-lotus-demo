"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Client } from "@/app/clients/page";

interface ClientsTableProps {
  clients: Client[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ClientsTable({ clients, currentPage, totalPages, onPageChange }: ClientsTableProps) {
  const formatDateOfBirth = (dateString: string) => {
    // If the date is already in the desired format, return as is
    if (dateString.match(/^[A-Za-z]+ \d{1,2}, \d{4}$/)) {
      return dateString;
    }
    
    try {
      // Handle various date formats
      let date: Date;
      
      // Check if it's in DD/MM/YYYY format
      if (dateString.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const [day, month, year] = dateString.split('/');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      } 
      // Check if it's in MM/DD/YYYY format
      else if (dateString.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const [month, day, year] = dateString.split('/');
        date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      }
      // Try to parse other formats
      else {
        date = new Date(dateString);
      }
      
      // Format to "March 15, 2020" format
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
    } catch (error) {
      console.error('Error formatting date:', error);
    }
    
    // Return original string if formatting fails
    return dateString;
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Current":
        return "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]";
      case "Waitlisted":
        return "bg-[#FEF3C7] text-[#D97706] border border-[#FDE68A]";
      case "Archived":
        return "bg-[#F3F4F6] text-[#6B7280] border border-[#E5E7EB]";
      default:
        return "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]";
    }
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Table */}
      <div className="bg-[#F4EDE2] rounded-lg p-3 md:p-6">
        {/* Horizontal Scroll Container */}
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid gap-6 px-6 py-4 mb-4 min-w-[1000px]" style={{ gridTemplateColumns: '180px 180px 200px 240px 140px' }}>
            <div className="text-left text-[14px] font-semibold text-[#374151] uppercase tracking-wider font-manrope">
              Client Name
            </div>
            <div className="text-left text-[14px] font-semibold text-[#374151] uppercase tracking-wider font-manrope">
              Date of Birth
            </div>
            <div className="text-left text-[14px] font-semibold text-[#374151] uppercase tracking-wider font-manrope">
              Associated Staff
            </div>
            <div className="text-left text-[14px] font-semibold text-[#374151] uppercase tracking-wider font-manrope">
              Things to Look Out For
            </div>
            <div className="text-left text-[14px] font-semibold text-[#374151] uppercase tracking-wider font-manrope">
              Status
            </div>
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {clients.map((client) => (
              <div key={client.id} className="bg-white rounded-l-lg min-w-[1000px]">
                <div className="grid gap-6 px-6 py-4 items-center" style={{ gridTemplateColumns: '180px 180px 200px 240px 140px' }}>
                  <div className="text-[16px] font-normal text-[#11151B] font-manrope">
                    <div className="truncate">
                      {client.firstName} {client.lastName}
                    </div>
                  </div>
                  <div className="text-[16px] font-normal text-[#11151B] font-manrope">
                    <div className="truncate">
                      {formatDateOfBirth(client.dateOfBirth)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[16px] font-normal text-[#11151B] font-manrope truncate">
                      {client.associatedStaff[0]}
                    </span>
                    {client.associatedStaff.length > 1 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-[12px] font-semibold bg-[#FC5858] text-white font-manrope flex-shrink-0">
                        +{client.associatedStaff.length - 1}
                      </span>
                    )}
                  </div>
                  <div className="text-[16px] font-normal text-[#11151B] font-manrope">
                    <div className="truncate">
                      {client.thingsToLookOutFor}
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold ${getStatusBadgeColor(client.status)} font-manrope flex-shrink-0`}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-1 sm:space-x-2 pt-4 md:pt-6">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB] transition-colors min-w-[44px] min-h-[44px]"
            >
              <ChevronLeft className="h-5 w-5 text-[#6B7280]" />
            </button>

            <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto max-w-[200px] sm:max-w-none">
              {renderPaginationNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' && onPageChange(page)}
                  disabled={page === "..."}
                  className={`px-2 sm:px-3 py-2 rounded-md text-[12px] sm:text-[14px] font-medium font-manrope transition-colors min-w-[36px] sm:min-w-[40px] min-h-[36px] sm:min-h-[40px] flex items-center justify-center ${
                    page === currentPage
                      ? "bg-[#FCA311] text-white shadow-sm"
                      : page === "..."
                      ? "text-[#6B7280] cursor-default"
                      : "text-[#374151] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#F9FAFB] transition-colors min-w-[44px] min-h-[44px]"
            >
              <ChevronRight className="h-5 w-5 text-[#6B7280]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 