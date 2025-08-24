import React, { useState } from 'react';
import { X, Plus, Image } from 'lucide-react';
import { TradingPostData } from '../App';

interface CreatePostProps {
  onCreatePost: (post: Omit<TradingPostData, 'id' | 'timestamp' | 'replies'>) => void;
  onCancel: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onCreatePost, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'pokemon',
    game: 'Pokemon Home',
    price: '',
    description: '',
    tags: [] as string[],
    newTag: '',
    includeProof: false
  });

  const categories = [
    { value: 'codes', label: 'Event Codes' },
    { value: 'pokemon', label: 'Pokemon' },
    { value: 'items', label: 'Items' },
    { value: 'friends', label: 'Friends' },
    { value: 'mobile', label: 'Pokemon Go' }
  ];

  const games = [
    'Pokemon Home',
    'Sword/Shield',
    'Pokemon Go',
    'Scarlet/Violet',
    'Legends Arceus',
    'Brilliant Diamond/Shining Pearl',
    'Various'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePost({
      title: formData.title,
      category: formData.category,
      game: formData.game,
      user: 'CurrentUser',
      userFlair: 'Great Ball',
      price: formData.price || undefined,
      description: formData.description,
      tags: formData.tags,
      verified: false
    });
  };

  const addTag = () => {
    if (formData.newTag && !formData.tags.includes(formData.newTag)) {
      setFormData({
        ...formData,
        tags: [...formData.tags, formData.newTag],
        newTag: ''
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create Trading Post</h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What are you trading?"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Game</label>
              <select
                value={formData.game}
                onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {games.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price (Optional)</label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., $25, 5 Pokemon, Free"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe what you're offering and what you're looking for..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.tags.map(tag => (
                <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <span>{tag}</span>
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-600">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={formData.newTag}
                onChange={(e) => setFormData({ ...formData, newTag: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="includeProof"
              checked={formData.includeProof}
              onChange={(e) => setFormData({ ...formData, includeProof: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="includeProof" className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Image className="w-4 h-4" />
              <span>I will provide proof for this trade</span>
            </label>
          </div>

          {formData.includeProof && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Image className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900">Proof Commitment</h4>
                  <p className="text-sm text-green-700 mt-1">
                    You've committed to providing proof for this trade. After creating the post, 
                    you can upload screenshots and verification materials to build trust with potential traders.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Create Post
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;