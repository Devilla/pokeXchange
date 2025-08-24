import React from 'react';
import { MessageSquare, Clock, Tag, Shield, CheckCircle, CreditCard, Image, Eye } from 'lucide-react';
import { TradingPostData } from '../App';
import { ProofData } from './ProofModal';

interface TradingPostProps {
  post: TradingPostData;
  onPaymentClick?: (post: TradingPostData) => void;
  onProofClick?: (post: TradingPostData) => void;
  onViewProofClick?: (post: TradingPostData) => void;
}

const flairColors: { [key: string]: string } = {
  'Master Ball': 'bg-purple-100 text-purple-800',
  'Ultra Ball': 'bg-blue-100 text-blue-800',
  'Great Ball': 'bg-green-100 text-green-800',
  'Poke Ball': 'bg-red-100 text-red-800',
  'Cherish Ball': 'bg-pink-100 text-pink-800',
  'Premier Ball': 'bg-gray-100 text-gray-800',
};

const TradingPost: React.FC<TradingPostProps> = ({ post, onPaymentClick, onProofClick, onViewProofClick }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer mb-1">
            {post.title}
          </h3>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-medium">{post.user}</span>
              {post.verified && (
                <CheckCircle className="w-4 h-4 text-blue-500" />
              )}
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${flairColors[post.userFlair]}`}>
              {post.userFlair}
            </span>
            <span className="text-gray-400">•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>
        {post.price && (
          <div className="text-lg font-bold text-green-600">
            {post.price}
          </div>
        )}
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">
        {post.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
            {post.game}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
            {post.category}
          </span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <MessageSquare className="w-4 h-4" />
            <span>{post.replies}</span>
          </div>
          <div className="flex items-center space-x-2">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span className="text-xs">{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          {post.proof && (
            <div className="flex items-center space-x-1 text-sm">
              {post.proof.verified ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Image className="w-4 h-4 text-yellow-600" />
              )}
              <span className={post.proof.verified ? 'text-green-600' : 'text-yellow-600'}>
                {post.proof.verified ? 'Verified Proof' : 'Proof Submitted'}
              </span>
            </div>
          )}
          {post.price && (
            <div className="text-sm text-gray-600">
              Secure payment available
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {post.proof && onViewProofClick && (
            <button
              onClick={() => onViewProofClick(post)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm"
            >
              <Eye className="w-4 h-4" />
              <span>View Proof</span>
            </button>
          )}
          
          {!post.proof && onProofClick && (
            <button
              onClick={() => onProofClick(post)}
              className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm"
            >
              <Image className="w-4 h-4" />
              <span>Add Proof</span>
            </button>
          )}
          
          {post.price && onPaymentClick && (
            <button
              onClick={() => onPaymentClick(post)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingPost;
          </div>
          <button
            onClick={() => onPaymentClick(post)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 text-sm"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pay Now</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default TradingPost;