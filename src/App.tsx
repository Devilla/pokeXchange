import React, { useState } from 'react';
import { Search, Shield, Users, Trophy, Star, MessageSquare, Clock, Filter } from 'lucide-react';
import Header from './components/Header';
import TradingCategories from './components/TradingCategories';
import TradingPost from './components/TradingPost';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import PaymentModal from './components/PaymentModal';
import ProofModal, { ProofData } from './components/ProofModal';

export interface TradingPostData {
  id: string;
  title: string;
  category: string;
  game: string;
  user: string;
  userFlair: string;
  price?: string;
  description: string;
  tags: string[];
  timestamp: string;
  replies: number;
  verified: boolean;
  proof?: ProofData;
}

const samplePosts: TradingPostData[] = [
  {
    id: '1',
    title: 'Shiny Galar Heroes Bundle - Lancer\'s Zacian & Arthur\'s Zamazenta',
    category: 'codes',
    game: 'Pokemon Go',
    user: 'TrainerAlex92',
    userFlair: 'Master Ball',
    price: '$35',
    description: 'Selling verified shiny Galar Heroes bundle. Codes are untouched and region-free. Both Pokemon come with original trainer IDs.',
    tags: ['shiny', 'legendary', 'bundle', 'verified'],
    timestamp: '2 hours ago',
    replies: 5,
    verified: true,
    proof: {
      id: '1',
      screenshots: [
        'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      description: 'Screenshots showing both Pokemon with original trainer IDs and event ribbons.',
      timestamp: '2 hours ago',
      verified: true,
      verificationNotes: 'Proof verified by moderator. All details match event distribution records.'
    }
  },
  {
    id: '2',
    title: 'LF: Beast Ball Dreepy | FT: Dream Ball Eevee',
    category: 'pokemon',
    game: 'Sword/Shield',
    user: 'PokeBallCollector',
    userFlair: 'Ultra Ball',
    description: 'Looking for Beast Ball Dreepy with good IVs. Offering 5IV Dream Ball Eevee with HA.',
    tags: ['beast-ball', 'dream-ball', 'competitive', 'ha'],
    timestamp: '4 hours ago',
    replies: 12,
    verified: true,
    proof: {
      id: '2',
      screenshots: [
        'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      description: 'Dream Ball Eevee with Hidden Ability and 5 perfect IVs.',
      timestamp: '4 hours ago',
      verified: false
    }
  },
  {
    id: '3',
    title: 'World Championships 2025 Event Codes Available',
    category: 'codes',
    game: 'Various',
    user: 'EventMaster',
    userFlair: 'Cherish Ball',
    price: '$15 each',
    description: 'Toedscool, Amoonguss, and Tandemaus event codes from 2025 Worlds. All codes are unused and verified.',
    tags: ['event', 'worlds-2025', 'toedscool', 'amoonguss'],
    timestamp: '6 hours ago',
    replies: 8,
    verified: true
  },
  {
    id: '4',
    title: 'Friend Code Exchange - Looking for Daily Players',
    category: 'friends',
    game: 'Pokemon Home',
    user: 'DailyTrainer',
    userFlair: 'Great Ball',
    description: 'Active daily player looking for friends for trades and battles. I have a complete living dex and happy to help with trade evolutions.',
    tags: ['active', 'daily', 'helpful', 'complete-dex'],
    timestamp: '1 day ago',
    replies: 23,
    verified: false
  }
];

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'create' | 'profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [posts, setPosts] = useState<TradingPostData[]>(samplePosts);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    post: TradingPostData | null;
  }>({ isOpen: false, post: null });
  const [proofModal, setProofModal] = useState<{
    isOpen: boolean;
    post: TradingPostData | null;
    mode: 'view' | 'submit';
  }>({ isOpen: false, post: null, mode: 'submit' });

  const handleCreatePost = (newPost: Omit<TradingPostData, 'id' | 'timestamp' | 'replies'>) => {
    const post: TradingPostData = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: 'just now',
      replies: 0
    };
    setPosts([post, ...posts]);
    setCurrentView('home');
  };

  const handlePaymentClick = (post: TradingPostData) => {
    setPaymentModal({ isOpen: true, post });
  };

  const handlePaymentComplete = () => {
    // Here you could update the post status, send notifications, etc.
    console.log('Payment completed for trade');
  };

  const handleProofClick = (post: TradingPostData) => {
    setProofModal({ isOpen: true, post, mode: 'submit' });
  };

  const handleViewProofClick = (post: TradingPostData) => {
    setProofModal({ isOpen: true, post, mode: 'view' });
  };

  const handleProofSubmit = (proofData: ProofData) => {
    if (proofModal.post) {
      const updatedPosts = posts.map(post => 
        post.id === proofModal.post!.id 
          ? { ...post, proof: proofData }
          : post
      );
      setPosts(updatedPosts);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentView === 'home' && (
          <>
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Pokemon Trading Hub</h1>
              <p className="text-lg text-gray-600">Safe, verified trading for all Pokemon games and communities</p>
            </div>

            <TradingCategories 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedCategory === 'all' ? 'All Trading Posts' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Trading`}
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Filter className="w-4 h-4" />
                  <span>{filteredPosts.length} posts</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {filteredPosts.map(post => (
                  <TradingPost 
                    key={post.id} 
                    post={post} 
                    onPaymentClick={handlePaymentClick}
                    onProofClick={handleProofClick}
                    onViewProofClick={handleViewProofClick}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {currentView === 'create' && (
          <CreatePost onCreatePost={handleCreatePost} onCancel={() => setCurrentView('home')} />
        )}

        {currentView === 'profile' && (
          <UserProfile />
        )}
      </main>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, post: null })}
        tradeTitle={paymentModal.post?.title || ''}
        tradePrice={paymentModal.post?.price || ''}
        sellerName={paymentModal.post?.user || ''}
        onPaymentComplete={handlePaymentComplete}
      />

      <ProofModal
        isOpen={proofModal.isOpen}
        onClose={() => setProofModal({ isOpen: false, post: null, mode: 'submit' })}
        tradeTitle={proofModal.post?.title || ''}
        onProofSubmit={handleProofSubmit}
        existingProof={proofModal.post?.proof}
        mode={proofModal.mode}
      />
    </div>
  );
}

export default App;