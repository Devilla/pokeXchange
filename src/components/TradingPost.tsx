import React from 'react';
import { CheckCircle, AlertCircle, Eye, Image as ImageIcon, MessageSquare, Clock, Tag, DollarSign, Shield } from 'lucide-react';
import { TradingPostData } from '../App';

interface TradingPostProps {
  post: TradingPostData;
  onPaymentClick: (post: TradingPostData) => void;
  onProofClick: (post: TradingPostData) => void;
  onViewProofClick: (post: TradingPostData) => void;
}

const TradingPost: React.FC<TradingPostProps> = ({ post, onPaymentClick, onProofClick, onViewProofClick }) => {
  const hasProof = Boolean(post.proof && post.proof.screenshots && post.proof.screenshots.length > 0);
  const isVerified = Boolean(post.proof && post.proof.verified);

  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-600">{post.user}</span>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">{post.userFlair}</span>
            {isVerified ? (
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3.5 h-3.5" /> Verified proof
              </span>
            ) : hasProof ? (
              <span className="inline-flex items-center gap-1 text-xs text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-0.5 rounded-full">
                <AlertCircle className="w-3.5 h-3.5" /> Pending verification
              </span>
            ) : null}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">{post.title}</h3>
          <p className="text-gray-700 text-sm mb-3">{post.description}</p>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </span>
            <span className="text-xs text-gray-500">• {post.game}</span>
            {post.tags?.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{tag}</span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {post.timestamp}
            </span>
            <span className="inline-flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" /> {post.replies} replies
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          {post.price && (
            <div className="flex items-center gap-1 text-sm font-medium text-gray-900">
              <DollarSign className="w-4 h-4" /> {post.price}
            </div>
          )}

          <div className="flex items-center gap-2">
            {hasProof ? (
              <button
                onClick={() => onViewProofClick(post)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" /> View Proof
              </button>
            ) : (
              <button
                onClick={() => onProofClick(post)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <ImageIcon className="w-4 h-4" /> Add Proof
              </button>
            )}

            {post.price && (
              <button
                onClick={() => onPaymentClick(post)}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
              >
                <Shield className="w-4 h-4" /> Pay Securely
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingPost;


