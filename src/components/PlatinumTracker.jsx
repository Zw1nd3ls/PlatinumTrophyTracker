import React, { useState, useEffect } from 'react';
import { Search, Trophy, Star, Award, Plus, Check, ChevronDown, ChevronUp, Download, User, Wifi, WifiOff } from 'lucide-react';
import { PSNService } from '../api/psnService.js';
import { mockGames } from '../data/mockGames.js';
import PsnProfile from './PsnProfile.jsx';
import PsnTrophyList from './PsnTrophyList.jsx';
import PsnNpssoInstructions from './PsnNpssoInstructions.jsx';

const TABS = {
  BROWSE: 'browse',
  LIBRARY: 'library',
  PSN: 'psn',
  SETTINGS: 'settings',
};

const PSNConnection = ({ onConnect, onDisconnect, isConnected, profile }) => {
  const [npsso, setNpsso] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    if (!npsso.trim()) {
      setError('Please enter your NPSSO token');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      await onConnect(npsso.trim());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    setNpsso('');
    setError('');
  };

  if (isConnected && profile) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Wifi className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">Connected to PSN</span>
            </div>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors"
          >
            Disconnect
          </button>
        </div>

        <div className="mt-3 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{profile.onlineId}</span>
          </div>
          <div className="text-sm opacity-90">
            Level {profile.trophySummary.level} • {profile.trophySummary.earnedTrophies.platinum} Platinums
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <WifiOff className="w-5 h-5 text-gray-400" />
        <h3 className="font-medium text-white">Connect to PlayStation Network</h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        Connect your PSN account to sync your real trophy progress and library.
      </p>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            NPSSO Token
          </label>
          <input
            type="password"
            placeholder="Enter your NPSSO token..."
            value={npsso}
            onChange={(e) => setNpsso(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Get your NPSSO from PlayStation's website cookies (advanced users only)
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md p-2">
            {error}
          </div>
        )}

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center space-x-2"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span>Connecting...</span>
            </>
          ) : (
            <>
              <Wifi className="w-4 h-4" />
              <span>Connect to PSN</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const TrophyIcon = ({ type, size = 'w-5 h-5' }) => {
  const iconProps = { className: size };

  switch (type) {
    case 'platinum':
      return <Award {...iconProps} className={`${size} text-cyan-400`} />;
    case 'gold':
      return <Trophy {...iconProps} className={`${size} text-yellow-400`} />;
    case 'silver':
      return <Trophy {...iconProps} className={`${size} text-gray-300`} />;
    case 'bronze':
      return <Trophy {...iconProps} className={`${size} text-amber-600`} />;
    default:
      return <Trophy {...iconProps} />;
  }
};

const GameCard = ({ game, onAddToLibrary, isInLibrary }) => (
  <div className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{game.image}</span>
        <div>
          <h3 className="font-semibold text-white">{game.title}</h3>
          <p className="text-sm text-gray-400">{game.platform}</p>
        </div>
      </div>
      {!isInLibrary && (
        <button
          onClick={() => onAddToLibrary(game)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      )}
    </div>

    <div className="flex items-center space-x-4 text-sm text-gray-400">
      <div className="flex items-center space-x-1">
        <TrophyIcon type="platinum" size="w-4 h-4" />
        <span>1</span>
      </div>
      <div className="flex items-center space-x-1">
        <TrophyIcon type="gold" size="w-4 h-4" />
        <span>{game.trophies.gold.length}</span>
      </div>
      <div className="flex items-center space-x-1">
        <TrophyIcon type="silver" size="w-4 h-4" />
        <span>{game.trophies.silver.length}</span>
      </div>
      <div className="flex items-center space-x-1">
        <TrophyIcon type="bronze" size="w-4 h-4" />
        <span>{game.trophies.bronze.length}</span>
      </div>
    </div>
  </div>
);

const TrophyItem = ({ trophy, type, onToggle, isEarned }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
    <button
      onClick={onToggle}
      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
        isEarned
          ? 'bg-green-600 border-green-600 text-white'
          : 'border-gray-600 hover:border-gray-400'
      }`}
    >
      {isEarned && <Check className="w-3 h-3" />}
    </button>

    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        <TrophyIcon type={type} size="w-4 h-4" />
        <h4 className={`font-medium ${isEarned ? 'text-green-400' : 'text-white'}`}>
          {trophy.name}
        </h4>
      </div>
      <p className="text-sm text-gray-400">{trophy.description}</p>
    </div>
  </div>
);

const LibraryGame = ({ game, onTrophyToggle, autoCompletePlatinum }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const allTrophies = [
    ...game.trophies.bronze.map(t => ({...t, type: 'bronze'})),
    ...game.trophies.silver.map(t => ({...t, type: 'silver'})),
    ...game.trophies.gold.map(t => ({...t, type: 'gold'}))
  ];

  const totalTrophies = allTrophies.length + 1; // +1 for platinum
  const earnedTrophies = allTrophies.filter(t => t.earned).length + (game.trophies.platinum.earned ? 1 : 0);
  const progressPercent = Math.round((earnedTrophies / totalTrophies) * 100);

  const nonPlatinumEarned = allTrophies.filter(t => t.earned).length;
  const allNonPlatinumEarned = nonPlatinumEarned === allTrophies.length;

  // Auto-complete platinum if all other trophies are earned
  useEffect(() => {
    if (autoCompletePlatinum && allNonPlatinumEarned && !game.trophies.platinum.earned && nonPlatinumEarned > 0) {
      onTrophyToggle(game.id, 'platinum', 0);
    }
  }, [nonPlatinumEarned, allNonPlatinumEarned, game.trophies.platinum.earned, autoCompletePlatinum, onTrophyToggle, game.id]);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{game.image}</span>
          <div>
            <h3 className="font-semibold text-white">{game.title}</h3>
            <p className="text-sm text-gray-400">{game.platform}</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-white">{earnedTrophies}/{totalTrophies} ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Trophy Summary */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <div className={`flex items-center space-x-1 ${game.trophies.platinum.earned ? 'text-green-400' : 'text-gray-400'}`}>
          <TrophyIcon type="platinum" size="w-4 h-4" />
          <span>{game.trophies.platinum.earned ? 1 : 0}/1</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <TrophyIcon type="gold" size="w-4 h-4" />
          <span>{game.trophies.gold.filter(t => t.earned).length}/{game.trophies.gold.length}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <TrophyIcon type="silver" size="w-4 h-4" />
          <span>{game.trophies.silver.filter(t => t.earned).length}/{game.trophies.silver.length}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-400">
          <TrophyIcon type="bronze" size="w-4 h-4" />
          <span>{game.trophies.bronze.filter(t => t.earned).length}/{game.trophies.bronze.length}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="space-y-3 mt-4">
          {/* Platinum Trophy */}
          <TrophyItem
            trophy={game.trophies.platinum}
            type="platinum"
            onToggle={() => onTrophyToggle(game.id, 'platinum', 0)}
            isEarned={game.trophies.platinum.earned}
          />

          {/* Other Trophies */}
          {['gold', 'silver', 'bronze'].map(type =>
            game.trophies[type].map((trophy, index) => (
              <TrophyItem
                key={trophy.name}
                trophy={trophy}
                type={type}
                onToggle={() => onTrophyToggle(game.id, type, index)}
                isEarned={trophy.earned}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

const PlatinumTracker = () => {
  const [activeTab, setActiveTab] = useState(TABS.BROWSE);
  const [searchTerm, setSearchTerm] = useState('');
  const [library, setLibrary] = useState([]);
  const [autoCompletePlatinum, setAutoCompletePlatinum] = useState(true);

  // PlayStation API state
  const [psnService] = useState(() => new PSNService());
  const [isConnectedToPSN, setIsConnectedToPSN] = useState(false);
  const [psnProfile, setPsnProfile] = useState(null);
  const [psnTrophyTitles, setPsnTrophyTitles] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const filteredGames = mockGames.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToLibrary = (game) => {
    if (!library.find(g => g.id === game.id)) {
      setLibrary([...library, { ...game }]);
    }
  };

  // PlayStation API functions
  const connectToPSN = async (npsso) => {
    const result = await psnService.authenticate(npsso);
    setIsConnectedToPSN(true);
    setPsnProfile(result.profile);

    // Auto-sync trophy data after connection
    await syncTrophyData();
  };

  const disconnectFromPSN = () => {
    psnService.disconnect();
    setIsConnectedToPSN(false);
    setPsnProfile(null);
    setPsnTrophyTitles([]);
  };

  const syncTrophyData = async () => {
    if (!isConnectedToPSN) return;

    setIsSyncing(true);
    try {
      const trophyTitles = await psnService.getTrophyTitles();
      setPsnTrophyTitles(trophyTitles);

      // Auto-add PSN games to library and sync progress
      trophyTitles.forEach(psnGame => {
        const existingGame = mockGames.find(g =>
          g.title.toLowerCase() === psnGame.trophyTitleName.toLowerCase()
        );

        if (existingGame) {
          // Add to library if not already there
          if (!library.find(g => g.id === existingGame.id)) {
            const gameWithProgress = {
              ...existingGame,
              psnProgress: psnGame.earnedTrophies,
              psnTotal: psnGame.definedTrophies,
              lastSynced: new Date().toISOString()
            };

            // Sync trophy progress from PSN
            updateTrophyProgressFromPSN(gameWithProgress, psnGame);
            setLibrary(prev => [...prev, gameWithProgress]);
          }
        }
      });

    } catch (error) {
      console.error('Failed to sync trophy data:', error);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateTrophyProgressFromPSN = (game, psnData) => {
    // This would normally parse actual PSN trophy data
    // For demo purposes, we'll simulate some progress
    if (psnData.progress === 100) {
      // Mark all trophies as earned for completed games
      game.trophies.platinum.earned = true;
      Object.keys(game.trophies).forEach(type => {
        if (type !== 'platinum' && Array.isArray(game.trophies[type])) {
          game.trophies[type].forEach(trophy => {
            trophy.earned = true;
          });
        }
      });
    } else if (psnData.progress > 0) {
      // Mark some trophies as earned based on progress
      const bronzeToEarn = Math.floor(game.trophies.bronze.length * (psnData.progress / 100));
      for (let i = 0; i < bronzeToEarn; i++) {
        if (game.trophies.bronze[i]) {
          game.trophies.bronze[i].earned = true;
        }
      }
    }
  };

  const toggleTrophy = (gameId, trophyType, trophyIndex) => {
    setLibrary(prev => prev.map(game => {
      if (game.id === gameId) {
        const updatedGame = { ...game };

        if (trophyType === 'platinum') {
          const newPlatinumState = !updatedGame.trophies.platinum.earned;
          updatedGame.trophies.platinum.earned = newPlatinumState;

          // If platinum is being earned, mark all other trophies as earned
          if (newPlatinumState) {
            ['bronze', 'silver', 'gold'].forEach(type => {
              updatedGame.trophies[type].forEach(trophy => {
                trophy.earned = true;
              });
            });
          }
        } else {
          updatedGame.trophies[trophyType][trophyIndex].earned = !updatedGame.trophies[trophyType][trophyIndex].earned;
        }

        return updatedGame;
      }
      return game;
    }));
  };

  const totalPlatinums = library.filter(game => game.trophies.platinum.earned).length;
  const totalGames = library.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Award className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold">Platinum Tracker</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrophyIcon type="platinum" />
                <span>{totalPlatinums} Platinums</span>
              </div>
              <div className="text-gray-400">
                {totalGames} Games
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-2">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {Object.values(TABS).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-md capitalize transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {tab === 'psn' ? 'PlayStation' : tab}
                </button>
              ))}
            </div>

            {isConnectedToPSN && (
              <button
                onClick={syncTrophyData}
                disabled={isSyncing}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-3 py-1 rounded-md text-sm transition-colors"
              >
                {isSyncing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Sync PSN</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Browse Games */}
        {activeTab === TABS.BROWSE && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">Browse PlayStation Games</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGames.map(game => (
                <GameCard
                  key={game.id}
                  game={game}
                  onAddToLibrary={addToLibrary}
                  isInLibrary={library.some(g => g.id === game.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Library */}
        {activeTab === TABS.LIBRARY && (
          <div>
            <h2 className="text-xl font-semibold mb-6">My Trophy Library</h2>
            {library.length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-4">Your trophy library is empty</p>
                <button
                  onClick={() => setActiveTab(TABS.BROWSE)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Browse Games
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {library.map(game => (
                  <LibraryGame
                    key={game.id}
                    game={game}
                    onTrophyToggle={toggleTrophy}
                    autoCompletePlatinum={autoCompletePlatinum}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PlayStation Tab */}
        {activeTab === TABS.PSN && (
          <div>
            <h2 className="text-xl font-semibold mb-6">PlayStation Network Integration</h2>

            <div className="space-y-6">
              <PSNConnection
                onConnect={connectToPSN}
                onDisconnect={disconnectFromPSN}
                isConnected={isConnectedToPSN}
                profile={psnProfile}
              />

              {isConnectedToPSN && <PsnProfile profile={psnProfile} />}

              <PsnTrophyList trophyTitles={psnTrophyTitles} />

              <PsnNpssoInstructions />
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === TABS.SETTINGS && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Settings</h2>
            <div className="bg-gray-800 rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">Auto-complete Platinum</h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Automatically mark Platinum trophy as earned when all other trophies are completed
                  </p>
                </div>
                <button
                  onClick={() => setAutoCompletePlatinum(!autoCompletePlatinum)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autoCompletePlatinum ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autoCompletePlatinum ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatinumTracker;
