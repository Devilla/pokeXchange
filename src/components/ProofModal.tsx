import React, { useState } from 'react';
import { X, Upload, Image, CheckCircle, AlertCircle, Eye, Download } from 'lucide-react';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeTitle: string;
  onProofSubmit: (proofData: ProofData) => void;
  existingProof?: ProofData;
  mode: 'view' | 'submit';
}

export interface ProofData {
  id: string;
  screenshots: string[];
  description: string;
  timestamp: string;
  verified: boolean;
  verificationNotes?: string;
}

const ProofModal: React.FC<ProofModalProps> = ({
  isOpen,
  onClose,
  tradeTitle,
  onProofSubmit,
  existingProof,
  mode
}) => {
  const [proofData, setProofData] = useState({
    screenshots: [] as string[],
    description: '',
  });
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProofData(prev => ({
          ...prev,
          screenshots: [...prev.screenshots, result]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const removeScreenshot = (index: number) => {
    setProofData(prev => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const proof: ProofData = {
      id: Date.now().toString(),
      screenshots: proofData.screenshots,
      description: proofData.description,
      timestamp: new Date().toLocaleString(),
      verified: false
    };
    onProofSubmit(proof);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {mode === 'view' ? 'Trade Proof' : 'Submit Trade Proof'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">Trade: {tradeTitle}</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Proof Requirements</h4>
                  <ul className="text-sm text-blue-700 mt-1 space-y-1">
                    <li>• Screenshots of Pokemon summary screens showing OT/ID</li>
                    <li>• Trade confirmation screens from the game</li>
                    <li>• Event code redemption confirmations (if applicable)</li>
                    <li>• Clear, unedited images with visible game UI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {mode === 'view' && existingProof ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                {existingProof.verified ? (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Verified Proof</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertCircle className="w-5 h-5" />
                    <span className="font-medium">Pending Verification</span>
                  </div>
                )}
                <span className="text-sm text-gray-500">• {existingProof.timestamp}</span>
              </div>

              {existingProof.screenshots.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Screenshots</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {existingProof.screenshots.map((screenshot, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={screenshot}
                          alt={`Proof ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                          <button className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 p-2 rounded-lg transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {existingProof.description && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{existingProof.description}</p>
                </div>
              )}

              {existingProof.verificationNotes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Verification Notes</h4>
                  <p className="text-gray-700 bg-green-50 border border-green-200 p-4 rounded-lg">
                    {existingProof.verificationNotes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Screenshots
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Drag and drop images here, or{' '}
                    <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                      browse files
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileInput}
                        className="hidden"
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>

                {proofData.screenshots.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Uploaded Screenshots</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {proofData.screenshots.map((screenshot, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={screenshot}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => removeScreenshot(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={proofData.description}
                  onChange={(e) => setProofData(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the trade details, Pokemon involved, and any additional context..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={proofData.screenshots.length === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Submit Proof
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProofModal;