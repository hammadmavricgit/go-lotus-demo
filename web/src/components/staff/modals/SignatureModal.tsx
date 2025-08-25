'use client';

import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';

interface SignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (signatureData: string) => Promise<void>;
  existingSignature?: string | null;
  staffName: string;
}

export function SignatureModal({
  isOpen,
  onClose,
  onSave,
  existingSignature,
  staffName,
}: SignatureModalProps) {
  const sigPadRef = useRef<SignatureCanvas>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    if (sigPadRef.current) {
      sigPadRef.current.clear();
      setIsEmpty(true);
    }
  };

  const handleSave = async () => {
    if (sigPadRef.current && !isEmpty) {
      try {
        setIsSubmitting(true);
        const signatureData = sigPadRef.current.toDataURL('image/png');
        await onSave(signatureData);
        onClose();
      } catch (error) {
        console.error('Error saving signature:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBeginDrawing = () => {
    setIsEmpty(false);
  };

  const handleEndDrawing = () => {
    if (sigPadRef.current && sigPadRef.current.isEmpty()) {
      setIsEmpty(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-transparent flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg w-full max-w-2xl mx-4 shadow-xl border'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <h2 className="text-[#11151b] font-semibold text-[18px] font-['Manrope']">
            Digital Signature - {staffName}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors'
            aria-label='Close signature modal'
          >
            <X className='w-6 h-6 text-gray-500' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          {/* Instructions */}
          <div className='mb-4'>
            <p className="text-[#565e64] font-normal text-[14px] font-['Manrope'] mb-2">
              Please sign in the area below using your mouse, trackpad, or touch
              screen.
            </p>
            {existingSignature && (
              <p className="text-[#565e64] font-normal text-[12px] font-['Manrope']">
                Note: Creating a new signature will replace the existing one.
              </p>
            )}
          </div>

          {/* Signature Canvas */}
          <div className='relative'>
            <div className='border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50'>
              <SignatureCanvas
                ref={sigPadRef}
                canvasProps={{
                  width: 600,
                  height: 200,
                  className:
                    'signature-canvas w-full h-full bg-white rounded border cursor-crosshair',
                  style: { touchAction: 'none' },
                }}
                backgroundColor='white'
                penColor='#000000'
                minWidth={1}
                maxWidth={3}
                onBegin={handleBeginDrawing}
                onEnd={handleEndDrawing}
              />
            </div>

            {/* Signature Line */}
            <div className='mt-4 flex items-center justify-center'>
              <div className='flex-1 border-t border-gray-400'></div>
              <span className="px-4 text-[#565e64] font-normal text-[12px] font-['Manrope']">
                Signature
              </span>
              <div className='flex-1 border-t border-gray-400'></div>
            </div>
          </div>

          {/* Existing Signature Preview */}
          {existingSignature && (
            <div className='mt-6'>
              <h3 className="text-[#11151b] font-semibold text-[14px] font-['Manrope'] mb-2">
                Current Signature:
              </h3>
              <div className='border border-gray-200 rounded p-4 bg-gray-50'>
                <img
                  src={existingSignature}
                  alt='Current signature'
                  className='max-w-full h-auto'
                  style={{ maxHeight: '100px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className='flex items-center justify-between p-6 border-t border-gray-200'>
          <button
            type='button'
            onClick={handleClear}
            className="px-4 py-2 border border-gray-300 text-gray-600 font-semibold text-[14px] font-['Manrope'] rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>

          <div className='flex gap-3'>
            <button
              type='button'
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 border border-[#fc5858] text-[#fc5858] font-semibold text-[16px] font-['Manrope'] rounded-lg hover:bg-[#fc5858] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type='button'
              onClick={handleSave}
              disabled={isSubmitting || isEmpty}
              className="px-6 py-2 bg-[#fc5858] text-white font-semibold text-[16px] font-['Manrope'] rounded-lg hover:bg-[#e54545] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Signature'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
