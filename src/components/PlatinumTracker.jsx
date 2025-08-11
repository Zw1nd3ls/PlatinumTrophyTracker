import React, { useState, useEffect } from 'react';
import { Search, Trophy, Star, Award, Plus, Check, ChevronDown, ChevronUp, Download, User, Wifi, WifiOff, Gamepad2, Library, Network, Settings, PackageOpen, Info, AlertCircle, RefreshCw, HelpCircle, ExternalLink } from 'lucide-react';
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

// Toast notification component
const Toast = ({ message, type = 'info', onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-600' : type === 'success' ? 'bg-green-600' : 'bg-blue-600';
  
  return (
    <div className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3 animate-in slide-in-from-right`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white/80 hover:text-white">
        ×
      </button>
    </div>
  );
};

// Tooltip component
const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2'
  };

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className={`absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg whitespace-nowrap ${positionClasses[position]}`}>
          {content}
          <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
            position === 'top' ? 'top-full left-1/2 -translate-x-1/2' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2' :
            position === 'left' ? 'left-full top-1/2 -translate-y-1/2' :
            'right-full top-1/2 -translate-y-1/2'
          }`}></div>
        </div>
      )}
    </div>
  );
};

const PSNConnection = ({ onConnect, onDisconnect, isConnected, profile }) => {
  const [npsso, setNpsso] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);

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
      setError(err.message || 'Failed to connect to PSN. Please check your token and try again.');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onDisconnect();
    setNpsso('');
    setError('');
  };

  const handleGetToken = () => {
    window.open('https://ca.account.sony.com/api/v1/ssocookie', '_blank');
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
            className="text-sm bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md transition-colors transition-transform transform hover:scale-105"
            aria-label="Disconnect from PSN"
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
    <div className="bg-surface rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-3">
        <WifiOff className="w-5 h-5 text-text-secondary" />
        <h3 className="font-medium text-text-primary">Connect to PlayStation Network</h3>
        <Tooltip content="Connect your PSN account to automatically sync your trophy progress">
          <HelpCircle className="w-4 h-4 text-text-secondary cursor-help" />
        </Tooltip>
      </div>

      <p className="text-sm text-text-secondary mb-4">
        Connect your PSN account to sync your real trophy progress and library.
      </p>

      <div className="space-y-3">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-text-secondary">
              NPSSO Token
            </label>
            <button
              onClick={handleGetToken}
              className="text-xs text-primary hover:text-primary/80 flex items-center space-x-1"
            >
              <span>Get Token</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <input
            type="password"
            placeholder="Enter your NPSSO token..."
            value={npsso}
            onChange={(e) => setNpsso(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-secondary/20 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            aria-describedby="npsso-help"
          />
          <p id="npsso-help" className="text-xs text-text-secondary/50 mt-1">
            Get your NPSSO from PlayStation's website cookies (advanced users only)
          </p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md p-3 flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex space-x-2">
          <button
            onClick={handleConnect}
            disabled={isConnecting}
            className="flex-1 bg-primary hover:bg-primary/90 disabled:bg-secondary disabled:cursor-not-allowed text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center space-x-2 transition-transform transform hover:scale-105"
            aria-label={isConnecting ? "Connecting to PSN..." : "Connect to PSN"}
          >
            {isConnecting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Wifi className="w-4 h-4" />
                <span>Connect to PSN</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="px-3 py-2 bg-secondary/20 hover:bg-secondary/30 text-text-secondary rounded-md transition-colors"
            aria-label="Show connection instructions"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>

        {showInstructions && (
          <div className="mt-3 p-3 bg-background rounded-md border border-secondary/20">
            <PsnNpssoInstructions />
          </div>
        )}
      </div>
    </div>
  );
};

const TrophyIcon = ({ type, size = 'w-5 h-5' }) => {
  const iconProps = { className: size };

  switch (type) {
    case 'platinum':
      return <Award {...iconProps} className={`${size} text-primary`} />;
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
  <div className="bg-surface rounded-lg p-4 hover:bg-gradient-to-br from-surface to-background transition-all duration-300 shadow-lg transform hover:scale-105 focus-within:ring-2 focus-within:ring-primary">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center space-x-3">
        <span className="text-2xl" role="img" aria-label={game.title}>{game.image}</span>
        <div>
          <h3 className="font-bold text-text-primary text-lg">{game.title}</h3>
          <p className="text-base text-text-secondary">{game.platform}</p>
        </div>
      </div>
      {!isInLibrary ? (
        <Tooltip content={`Add ${game.title} to your trophy library`}>
          <button
            onClick={() => onAddToLibrary(game)}
            className="bg-primary hover:bg-primary/90 text-white px-3 py-1 rounded-md flex items-center space-x-1 text-sm transition-colors transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Add ${game.title} to library`}
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </Tooltip>
      ) : (
        <div className="flex items-center space-x-1 text-green-400 text-sm">
          <Check className="w-4 h-4" />
          <span>Added</span>
        </div>
      )}
    </div>

    <div className="flex items-center space-x-4 text-sm text-text-secondary">
      <Tooltip content="Platinum Trophy">
        <div className="flex items-center space-x-1">
          <TrophyIcon type="platinum" size="w-4 h-4" />
          <span>1</span>
        </div>
      </Tooltip>
      <Tooltip content={`${game.trophies.gold.length} Gold Trophies`}>
        <div className="flex items-center space-x-1">
          <TrophyIcon type="gold" size="w-4 h-4" />
          <span>{game.trophies.gold.length}</span>
        </div>
      </Tooltip>
      <Tooltip content={`${game.trophies.silver.length} Silver Trophies`}>
        <div className="flex items-center space-x-1">
          <TrophyIcon type="silver" size="w-4 h-4" />
          <span>{game.trophies.silver.length}</span>
        </div>
      </Tooltip>
      <Tooltip content={`${game.trophies.bronze.length} Bronze Trophies`}>
        <div className="flex items-center space-x-1">
          <TrophyIcon type="bronze" size="w-4 h-4" />
          <span>{game.trophies.bronze.length}</span>
        </div>
      </Tooltip>
    </div>
  </div>
);

const TrophyItem = ({ trophy, type, onToggle, isEarned }) => (
  <div className="flex items-start space-x-3 p-3 bg-surface rounded-lg hover:bg-gradient-to-br from-surface to-background transition-all duration-300">
    <button
      onClick={onToggle}
      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
        isEarned
          ? 'bg-green-600 border-green-600 text-white'
          : 'border-secondary/20 hover:border-primary'
      }`}
      aria-label={`${isEarned ? 'Unmark' : 'Mark'} ${trophy.name} as ${isEarned ? 'unearned' : 'earned'}`}
      aria-pressed={isEarned}
    >
      {isEarned && <Check className="w-3 h-3" />}
    </button>

    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-1">
        <TrophyIcon type={type} size="w-4 h-4" />
        <h4 className={`font-semibold ${isEarned ? 'text-green-400' : 'text-text-primary'}`}>
          {trophy.name}
        </h4>
        {isEarned && (
          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
            Earned
          </span>
        )}
      </div>
      <p className="text-sm text-text-secondary">{trophy.description}</p>
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
    <div className="bg-surface rounded-lg p-4 border border-secondary/20 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl" role="img" aria-label={game.title}>{game.image}</span>
          <div>
            <h3 className="font-bold text-text-primary text-lg">{game.title}</h3>
            <p className="text-base text-text-secondary">{game.platform}</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-text-secondary hover:text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded"
          aria-label={`${isExpanded ? 'Collapse' : 'Expand'} trophy list for ${game.title}`}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-text-secondary">Progress</span>
          <span className="text-sm font-medium text-text-primary">{earnedTrophies}/{totalTrophies} ({progressPercent}%)</span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Trophy Summary */}
      <div className="flex items-center space-x-4 mb-4 text-sm">
        <div className={`flex items-center space-x-1 ${game.trophies.platinum.earned ? 'text-green-400' : 'text-text-secondary'}`}>
          <TrophyIcon type="platinum" size="w-4 h-4" />
          <span>{game.trophies.platinum.earned ? 1 : 0}/1</span>
        </div>
        <div className="flex items-center space-x-1 text-text-secondary">
          <TrophyIcon type="gold" size="w-4 h-4" />
          <span>{game.trophies.gold.filter(t => t.earned).length}/{game.trophies.gold.length}</span>
        </div>
        <div className="flex items-center space-x-1 text-text-secondary">
          <TrophyIcon type="silver" size="w-4 h-4" />
          <span>{game.trophies.silver.filter(t => t.earned).length}/{game.trophies.silver.length}</span>
        </div>
        <div className="flex items-center space-x-1 text-text-secondary">
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
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [isLoading, setIsLoading] = useState(false);

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
      setToastMessage(`Added ${game.title} to your library!`);
      setToastType('success');
    } else {
      setToastMessage(`${game.title} is already in your library.`);
      setToastType('info');
    }
  };

  // PlayStation API functions
  const connectToPSN = async (npsso) => {
    setIsLoading(true);
    try {
      const result = await psnService.authenticate(npsso);
      setIsConnectedToPSN(true);
      setPsnProfile(result.profile);
      setToastMessage('Successfully connected to PlayStation Network!');
      setToastType('success');

      // Auto-sync trophy data after connection
      await syncTrophyData();
    } catch (err) {
      setToastMessage(err.message || 'Failed to connect to PSN. Please check your token and try again.');
      setToastType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectFromPSN = () => {
    psnService.disconnect();
    setIsConnectedToPSN(false);
    setPsnProfile(null);
    setPsnTrophyTitles([]);
    setToastMessage('Disconnected from PlayStation Network.');
    setToastType('info');
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
      setToastMessage('Failed to sync trophy data. Please try again.');
      setToastType('error');
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
            setToastMessage(`🎉 Platinum achieved for ${game.title}!`);
            setToastType('success');
          }
        } else {
          const trophy = updatedGame.trophies[trophyType][trophyIndex];
          const newEarnedState = !trophy.earned;
          trophy.earned = newEarnedState;
          
          if (newEarnedState) {
            setToastMessage(`🏆 Earned ${trophyType} trophy: ${trophy.name}`);
            setToastType('success');
          }
        }

        return updatedGame;
      }
      return game;
    }));
  };

  const totalPlatinums = library.filter(game => game.trophies.platinum.earned).length;
  const totalGames = library.length;

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault();
            setActiveTab(TABS.BROWSE);
            break;
          case '2':
            e.preventDefault();
            setActiveTab(TABS.LIBRARY);
            break;
          case '3':
            e.preventDefault();
            setActiveTab(TABS.PSN);
            break;
          case '4':
            e.preventDefault();
            setActiveTab(TABS.SETTINGS);
            break;
          case 'k':
            e.preventDefault();
            if (activeTab === TABS.BROWSE) {
              document.querySelector('input[aria-label="Search games"]')?.focus();
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface rounded-lg p-6 flex items-center space-x-3">
            <RefreshCw className="w-6 h-6 animate-spin text-primary" />
            <span className="text-text-primary">Loading...</span>
          </div>
        </div>
      )}
      
      <div className="container mx-auto p-4">
        <header className="bg-surface border-b border-secondary/20 px-6 py-4 rounded-t-lg mb-4">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-10 h-10 text-primary" />
              <h1 className="text-3xl font-bold">Platinum Tracker</h1>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <TrophyIcon type="platinum" />
                <span>{totalPlatinums} Platinums</span>
              </div>
              <div className="text-text-secondary">
                {totalGames} Games
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <aside className="col-span-12 sm:col-span-3">
            <nav className="bg-surface rounded-lg p-4">
              <div className="flex flex-col space-y-2" role="tablist" aria-label="Main navigation">
                {Object.values(TABS).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-md capitalize transition-colors text-left transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary ${
                      activeTab === tab
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-secondary/20'
                    }`}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`${tab}-panel`}
                  >
                    {tab === 'psn' ? 'PlayStation' : tab}
                  </button>
                ))}
              </div>
            </nav>
          </aside>
          <main className="col-span-12 sm:col-span-9">
            <div className="bg-surface rounded-lg p-6">
              {/* Browse Games */}
              {activeTab === TABS.BROWSE && (
                <div role="tabpanel" id="browse-panel" aria-labelledby="browse-tab">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 flex items-center"><Gamepad2 className="w-6 h-6 mr-2" /> Browse PlayStation Games</h2>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search for games..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-secondary/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        aria-label="Search games"
                      />
                    </div>
                    {searchTerm && (
                      <p className="text-sm text-text-secondary mt-2">
                        Found {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} matching "{searchTerm}"
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div role="tabpanel" id="library-panel" aria-labelledby="library-tab">
                  <h2 className="text-2xl font-bold mb-6 flex items-center"><Library className="w-6 h-6 mr-2" /> My Trophy Library</h2>
                  {library.length === 0 ? (
                    <div className="text-center py-12">
                      <PackageOpen className="w-16 h-16 text-secondary mx-auto mb-4" />
                      <p className="text-text-secondary text-lg mb-4">Your trophy library is empty</p>
                      <button
                        onClick={() => setActiveTab(TABS.BROWSE)}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors transition-transform transform hover:scale-105"
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
                <div role="tabpanel" id="psn-panel" aria-labelledby="psn-tab">
                  <h2 className="text-2xl font-bold mb-6 flex items-center"><Network className="w-6 h-6 mr-2" /> PlayStation Network Integration</h2>

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
                <div role="tabpanel" id="settings-panel" aria-labelledby="settings-tab">
                  <h2 className="text-2xl font-bold mb-6 flex items-center"><Settings className="w-6 h-6 mr-2" /> Settings</h2>
                  <div className="bg-surface rounded-lg p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-text-primary">Auto-complete Platinum</h3>
                        <p className="text-sm text-text-secondary mt-1">
                          Automatically mark Platinum trophy as earned when all other trophies are completed
                        </p>
                      </div>
                      <button
                        onClick={() => setAutoCompletePlatinum(!autoCompletePlatinum)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          autoCompletePlatinum ? 'bg-primary' : 'bg-secondary'
                        }`}
                        aria-label={`${autoCompletePlatinum ? 'Disable' : 'Enable'} auto-complete platinum`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            autoCompletePlatinum ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="border-t border-secondary/20 pt-6">
                      <h3 className="font-semibold text-text-primary mb-4">Keyboard Shortcuts</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary">Browse Games</span>
                          <kbd className="px-2 py-1 bg-background border border-secondary/20 rounded text-xs">Ctrl+1</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary">My Library</span>
                          <kbd className="px-2 py-1 bg-background border border-secondary/20 rounded text-xs">Ctrl+2</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary">PlayStation</span>
                          <kbd className="px-2 py-1 bg-background border border-secondary/20 rounded text-xs">Ctrl+3</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary">Settings</span>
                          <kbd className="px-2 py-1 bg-background border border-secondary/20 rounded text-xs">Ctrl+4</kbd>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-text-secondary">Search Games</span>
                          <kbd className="px-2 py-1 bg-background border border-secondary/20 rounded text-xs">Ctrl+K</kbd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default PlatinumTracker;
