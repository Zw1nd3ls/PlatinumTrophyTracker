import React from 'react';

const PsnProfile = ({ profile }) => {
  if (!profile) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-white mb-4">Your PlayStation Profile</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-cyan-400">{profile.trophySummary.level}</div>
          <div className="text-sm text-gray-400">Level</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-amber-600">{profile.trophySummary.earnedTrophies.bronze}</div>
          <div className="text-sm text-gray-400">Bronze</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-300">{profile.trophySummary.earnedTrophies.silver}</div>
          <div className="text-sm text-gray-400">Silver</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">{profile.trophySummary.earnedTrophies.gold}</div>
          <div className="text-sm text-gray-400">Gold</div>
        </div>
      </div>

      <div className="text-center p-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg">
        <div className="text-3xl font-bold text-white">{profile.trophySummary.earnedTrophies.platinum}</div>
        <div className="text-cyan-100">Platinum Trophies</div>
      </div>
    </div>
  );
};

export default PsnProfile;
