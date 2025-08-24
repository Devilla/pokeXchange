import React from 'react';
import { Search, Plus, User, Shield } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'create' | 'profile';
  setCurrentView: (view: 'home' | 'create' | 'profile') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  searchQuery, 
  setSearchQuery 
}) => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PokeTradeHub</span>
            </div>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search trades, Pokemon, codes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCurrentView(currentView === 'home' ? 'home' : 'home')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentView === 'home'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            
            <button
              onClick={() => setCurrentView('create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Create Post</span>
            </button>
            
            <button
              onClick={() => setCurrentView('profile')}
              className={`p-2 rounded-lg transition-colors ${
                currentView === 'profile'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;