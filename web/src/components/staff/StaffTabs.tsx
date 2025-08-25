'use client';

import { StaffStatus } from '@/lib/types/staff';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs/Tabs';

interface StaffTabsProps {
  activeTab: 'current' | 'archived' | 'all';
  onTabChange: (tab: 'current' | 'archived' | 'all') => void;
}

export function StaffTabs({ activeTab, onTabChange }: StaffTabsProps) {
  const tabs = [
    {
      id: 'current' as const,
      label: 'Current Staff',
      status: 'Current' as StaffStatus,
    },
    {
      id: 'archived' as const,
      label: 'Archived Staff',
      status: 'Archived' as StaffStatus,
    },
    { id: 'all' as const, label: 'All Staff', status: undefined },
  ];

  const handleValueChange = (value: string) => {
    onTabChange(value as 'current' | 'archived' | 'all');
  };

  return (
    <Tabs value={activeTab} onValueChange={handleValueChange}>
      <TabsList className='h-auto bg-transparent p-0 text-foreground'>
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className='flex flex-col items-center rounded-none bg-transparent p-0 text-lg font-normal text-[rgba(0,0,0,0.54)] shadow-none data-[state=active]:bg-transparent data-[state=active]:text-[#fc5858] data-[state=active]:font-semibold data-[state=active]:shadow-none hover:bg-transparent hover:text-[#fc5858] focus-visible:ring-0'
          >
            <div className='px-4 py-2'>{tab.label}</div>
            <div
              className={`h-0.5 w-full transition-colors ${
                activeTab === tab.id ? 'bg-[#fc5858]' : 'bg-transparent'
              }`}
            />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
