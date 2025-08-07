import React from 'react';

const calculateTrophyCount = (trophies) => {
  return (trophies.bronze || 0) + (trophies.silver || 0) + (trophies.gold || 0) + (trophies.platinum || 0);
};

const PsnTrophyList = ({ trophyTitles }) => {
  if (!trophyTitles || trophyTitles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-white mb-4">Synced PlayStation Games</h3>
      <div className="space-y-3">
        {trophyTitles.map((game) => (
          <div key={game.npCommunicationId} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
            <div>
              <div className="font-medium text-white">{game.trophyTitleName}</div>
              <div className="text-sm text-gray-400">{game.trophyTitlePlatform}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-white">{game.progress}% Complete</div>
              <div className="text-xs text-gray-400">
                {calculateTrophyCount(game.earnedTrophies)}/
                {calculateTrophyCount(game.definedTrophies)} Trophies
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsnTrophyList;
