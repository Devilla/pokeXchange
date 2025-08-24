import React from 'react';
import { Code, Smartphone, Users, Trophy, Star, Gift } from 'lucide-react';

interface TradingCategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All Posts', icon: Star, color: 'bg-gray-100 text-gray-700', count: '1.2k' },
  { id: 'codes', name: 'Event Codes', icon: Code, color: 'bg-red-100 text-red-700', count: '234' },
  { id: 'pokemon', name: 'Pokemon', icon: Gift, color: 'bg-blue-100 text-blue-700', count: '567' },
  { id: 'items', name: 'Items', icon: Trophy, color: 'bg-yellow-100 text-yellow-700', count: '89' },
  { id: 'friends', name: 'Friends', icon: Users, color: 'bg-green-100 text-green-700', count: '145' },
  { id: 'mobile', name: 'Pokemon Go', icon: Smartphone, color: 'bg-purple-100 text-purple-700', count: '298' },
];

const TradingCategories: React.FC<TradingCategoriesProps> = ({
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Trading Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(category => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-2 ${category.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium text-gray-900">{category.name}</div>
              <div className="text-xs text-gray-500 mt-1">{category.count} posts</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TradingCategories;