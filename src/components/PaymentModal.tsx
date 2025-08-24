import React, { useState } from 'react';
import { X, CreditCard, Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  tradeTitle: string;
  tradePrice: string;
  sellerName: string;
  onPaymentComplete: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  tradeTitle,
  tradePrice,
  sellerName,
  onPaymentComplete
}) => {
  const [paymentStep, setPaymentStep] = useState<'confirm' | 'processing' | 'complete'>('confirm');
  const [paypalEmail, setPaypalEmail] = useState('');

  if (!isOpen) return null;

  const handlePayment = () => {
    setPaymentStep('processing');
    // Simulate PayPal payment processing
    setTimeout(() => {
      setPaymentStep('complete');
      setTimeout(() => {
        onPaymentComplete();
        onClose();
        setPaymentStep('confirm');
      }, 2000);
    }, 3000);
  };

  const priceValue = tradePrice.replace(/[^0-9.]/g, '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Secure Payment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={paymentStep === 'processing'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {paymentStep === 'confirm' && (
            <>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-blue-900">Secure Payment Protection</h3>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment is protected by PayPal's Buyer Protection. Only pay after confirming the trade details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Trade Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item:</span>
                    <span className="font-medium">{tradeTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Seller:</span>
                    <span className="font-medium">{sellerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-bold text-green-600">{tradePrice}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seller's PayPal Email
                </label>
                <input
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="seller@example.com"
                  required
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-900">Trading Safety Tips</h3>
                    <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                      <li>• Only pay after confirming trade details publicly</li>
                      <li>• Verify the seller's reputation and flair</li>
                      <li>• Keep all communication in public threads</li>
                      <li>• Report suspicious activity immediately</li>
                    </ul>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={!paypalEmail}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <CreditCard className="w-5 h-5" />
                <span>Pay with PayPal</span>
              </button>
            </>
          )}

          {paymentStep === 'processing' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Processing Payment</h3>
              <p className="text-gray-600">Redirecting to PayPal...</p>
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-700">
                  You will be redirected to PayPal to complete your payment of <strong>{tradePrice}</strong> to <strong>{sellerName}</strong>.
                </p>
              </div>
            </div>
          )}

          {paymentStep === 'complete' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Sent!</h3>
              <p className="text-gray-600 mb-4">Your payment has been successfully sent via PayPal.</p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  The seller has been notified. Please coordinate with them to complete the trade.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;