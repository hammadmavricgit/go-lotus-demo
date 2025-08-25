'use client';

import { useState } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner/LoadingSpinner';
import { useEmergencyContacts } from '@/hooks/useEmergencyContacts';
import { EditEmergencyContactModal } from '@/components/staff/modals/EditEmergencyContactModal';
import { EmergencyContact } from '@/lib/types/emergency-contacts';

interface EmergencyContactSectionProps {
  staffId: string;
}

export function EmergencyContactSection({
  staffId,
}: EmergencyContactSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(
    null
  );
  const {
    emergencyContacts,
    loading,
    error,
    createEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    refetch,
  } = useEmergencyContacts(staffId);

  const handleAddContact = () => {
    setEditingContact(null);
    setIsEditing(true);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setIsEditing(true);
  };

  const handleCloseModal = () => {
    setIsEditing(false);
    setEditingContact(null);
  };

  const handleSave = async (
    contactData: Omit<EmergencyContact, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      if (editingContact) {
        // Update existing contact
        await updateEmergencyContact(editingContact.id, contactData);
      } else {
        // Create new contact
        await createEmergencyContact(contactData);
      }

      // Refresh the data
      await refetch();
    } catch (error) {
      console.error('Error saving emergency contact:', error);
      throw error;
    }
  };

  const handleDeleteContact = async (contactId: number) => {
    if (
      window.confirm('Are you sure you want to delete this emergency contact?')
    ) {
      try {
        await deleteEmergencyContact(contactId);
        await refetch();
      } catch (error) {
        console.error('Error deleting emergency contact:', error);
      }
    }
  };

  const formatPhone = (phone: string | null) => {
    if (!phone) return 'Not provided';
    // Basic phone formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phone;
  };

  if (loading) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Emergency Contact Information
            </h2>
            <button
              disabled
              className='border border-gray-300 text-gray-400 font-semibold text-[18px] px-4 py-2 rounded-lg cursor-not-allowed'
            >
              Add
            </button>
          </div>

          {/* Loading Content */}
          <div className='flex items-center justify-center py-8'>
            <LoadingSpinner size='md' />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Emergency Contact Information
            </h2>
            <button
              onClick={handleAddContact}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
              aria-label='Add emergency contact'
            >
              Add
            </button>
          </div>

          {/* Error Content */}
          <div className='text-center py-8'>
            <p className='text-[#565e64] font-normal text-[14px]'>{error}</p>
          </div>
        </div>

        {/* Edit Modal */}
        <EditEmergencyContactModal
          emergencyContact={editingContact}
          staffId={staffId}
          isOpen={isEditing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    );
  }

  if (!emergencyContacts || emergencyContacts.length === 0) {
    return (
      <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
        <div className='p-4 pb-2'>
          {/* Header */}
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-[#11151b] font-semibold text-[18px]'>
              Emergency Contact Information
            </h2>
            <button
              onClick={handleAddContact}
              className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
              aria-label='Add emergency contact'
            >
              Add
            </button>
          </div>

          {/* Empty State Content */}
          <div className='text-center py-8'>
            <p className='text-[#565e64] font-normal text-[14px]'>
              No emergency contacts available
            </p>
          </div>
        </div>

        {/* Edit Modal */}
        <EditEmergencyContactModal
          emergencyContact={editingContact}
          staffId={staffId}
          isOpen={isEditing}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      </div>
    );
  }

  return (
    <div className='border border-[rgba(108,117,125,0.5)] rounded-lg bg-white'>
      <div className='p-4 pb-2'>
        {/* Header */}
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-[#11151b] font-semibold text-[18px]'>
            Emergency Contact Information
          </h2>
          <button
            onClick={handleAddContact}
            className='border border-[#fc5858] text-[#fc5858] font-semibold text-[18px] px-4 py-2 rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors'
            aria-label='Add emergency contact'
          >
            Add
          </button>
        </div>

        <div className='h-[19px] mb-4' />

        {/* Emergency Contacts List */}
        <div className='space-y-4'>
          {emergencyContacts.map((contact, index) => (
            <div
              key={contact.id}
              className='flex items-start justify-between pl-3 pr-0 py-0'
            >
              <div className='text-[#000101] font-normal text-[14px] leading-[1.4] whitespace-pre-line'>
                <p className='mb-0'>
                  Name: {contact.name}
                  <br />
                  Relationship: {contact.relationship || 'Not provided'}
                </p>
                <p className='mb-0'>
                  E-mail: {contact.email || 'Not provided'}
                </p>
                <p className='mb-0'>Phone: {formatPhone(contact.phone)}</p>
                {contact.address && (
                  <p className='mb-0'>Address: {contact.address}</p>
                )}
              </div>
              <div className='w-8 h-8 rounded-lg overflow-clip relative shrink-0 flex items-center justify-center'>
                <div className='flex gap-1'>
                  <button
                    onClick={() => handleEditContact(contact)}
                    className='w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-blue-600'
                    aria-label='Edit contact'
                    title='Edit'
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDeleteContact(contact.id)}
                    className='w-6 h-6 flex items-center justify-center hover:bg-gray-100 rounded transition-colors text-red-600'
                    aria-label='Delete contact'
                    title='Delete'
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <EditEmergencyContactModal
        emergencyContact={editingContact}
        staffId={staffId}
        isOpen={isEditing}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
