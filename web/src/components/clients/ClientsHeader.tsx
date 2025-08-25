'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs/Tabs';
import { Button } from '@/components/ui/Button/Button';
import { Input } from '@/components/ui/Input/Input';
import { ClientStatus } from '@/app/clients/page';

interface ClientsHeaderProps {
  activeTab: ClientStatus;
  onTabChange: (tab: ClientStatus) => void;
  showOnlyMyClients: boolean;
  onShowOnlyMyClientsChange: (show: boolean) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddClient: () => void;
}

export function ClientsHeader({
  activeTab,
  onTabChange,
  showOnlyMyClients,
  onShowOnlyMyClientsChange,
  searchQuery,
  onSearchChange,
  onAddClient,
}: ClientsHeaderProps) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(debouncedSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, onSearchChange]);

  return (
    <div className='space-y-4 md:space-y-6'>
      {/* Header with title and tabs */}
      <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
        <div className='flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-8'>
          <h1 className='text-[24px] md:text-[32px] font-bold leading-[100%] font-manrope text-[#11151B]'>
            Clients
          </h1>

          <div className='flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 lg:space-x-8'>
            <Tabs
              value={activeTab}
              onValueChange={(value) => onTabChange(value as ClientStatus)}
            >
              <TabsList className='bg-transparent p-0 w-full sm:w-auto'>
                <TabsTrigger
                  value='Current'
                  className='px-2 sm:px-4 py-2 text-[14px] sm:text-[16px] font-normal data-[state=active]:text-[#FC5858] data-[state=active]:border-b-2 data-[state=active]:border-[#FC5858] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none transition-all font-manrope text-[#9CA3AF] hover:text-[#374151]'
                >
                  Current
                </TabsTrigger>
                <TabsTrigger
                  value='Waitlisted'
                  className='px-2 sm:px-4 py-2 text-[14px] sm:text-[16px] font-normal data-[state=active]:text-[#FC5858] data-[state=active]:border-b-2 data-[state=active]:border-[#FC5858] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none transition-all font-manrope text-[#9CA3AF] hover:text-[#374151]'
                >
                  Waitlisted
                </TabsTrigger>
                <TabsTrigger
                  value='Archived'
                  className='px-2 sm:px-4 py-2 text-[14px] sm:text-[16px] font-normal data-[state=active]:text-[#FC5858] data-[state=active]:border-b-2 data-[state=active]:border-[#FC5858] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none transition-all font-manrope text-[#9CA3AF] hover:text-[#374151]'
                >
                  Archived
                </TabsTrigger>
                <TabsTrigger
                  value='All clients'
                  className='px-2 sm:px-4 py-2 text-[14px] sm:text-[16px] font-normal data-[state=active]:text-[#FC5858] data-[state=active]:border-b-2 data-[state=active]:border-[#FC5858] data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none transition-all font-manrope text-[#9CA3AF] hover:text-[#374151]'
                >
                  All clients
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Show only my clients toggle */}
            <div className='flex items-center space-x-3'>
              <label className='text-[14px] sm:text-[16px] font-normal text-[#11151B] font-manrope'>
                Show only my clients
              </label>
              <button
                onClick={() => onShowOnlyMyClientsChange(!showOnlyMyClients)}
                className={`relative inline-flex h-6 w-10 items-center rounded-full transition-colors focus:outline-none ${
                  showOnlyMyClients ? 'bg-[#FC5858]' : 'bg-[#E5E7EB]'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                    showOnlyMyClients ? 'translate-x-5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search bar and Add Client button */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='relative w-full sm:w-80'>
          <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] h-4 w-4' />
          <Input
            type='text'
            placeholder='Type e.g Client name'
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className='px-[30px] bg-transparent border border-[#D1D5DB] rounded-full h-12 text-[16px] font-manrope placeholder-[#9CA3AF] focus:border-[#FC5858] focus:ring-0 focus:outline-none w-full'
          />
        </div>

        <Button
          onClick={onAddClient}
          className='bg-[#FC5858] hover:bg-[#e54d4d] text-white px-6 py-3 rounded-xl h-12 text-[16px] font-semibold font-manrope shadow-sm w-full sm:w-auto'
        >
          + Add Client
        </Button>
      </div>
    </div>
  );
}
