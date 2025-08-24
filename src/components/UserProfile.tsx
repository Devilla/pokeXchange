import React from 'react';
import { User, Star, Trophy, Shield, MessageSquare, CheckCircle } from 'lucide-react';

const UserProfile: React.FC = () => {
  const stats = [
    { label: 'Successful Trades', value: '127', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Total Posts', value: '43', icon: MessageSquare, color: 'text-blue-600' },
    { label: 'Reputation Score', value: '98%', icon: Star, color: 'text-yellow-600' },
    { label: 'Current Flair', value: 'Master Ball', icon: Trophy, color: 'text-purple-600' }
  ];

  const recentTrades = [
    { title: 'Shiny Charizard Trade', partner: 'PokeMaster99', status: 'completed', date: '2 days ago' },
    { title: 'Event Code Sale', partner: 'TrainerJoe', status: 'completed', date: '5 days ago' },
    { title: 'Beast Ball Exchange', partner: 'BallCollector', status: 'pending', date: '1 week ago' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">CurrentUser</h1>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                Master Ball Flair
              </span>
              <CheckCircle className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">Verified Trader</span>
            </div>
            <p className="text-gray-600 mt-2">Active since January 2024 • Trading across all games</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Trading Safety</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <div className="font-medium text-green-800">Public Trading Only</div>
                <div className="text-sm text-green-600">All trades must be conducted publicly</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <div>
                <div className="font-medium text-blue-800">Verified Account</div>
                <div className="text-sm text-blue-600">Identity verified for secure trading</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Star className="w-5 h-5 text-yellow-600" />
              <div>
                <div className="font-medium text-yellow-800">High Reputation</div>
                <div className="text-sm text-yellow-600">98% positive feedback from traders</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentTrades.map((trade, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{trade.title}</div>
                  <div className="text-sm text-gray-600">with {trade.partner}</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${
                    trade.status === 'completed' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {trade.status === 'completed' ? 'Completed' : 'Pending'}
                  </div>
                  <div className="text-xs text-gray-500">{trade.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;