import React from 'react';

const PsnNpssoInstructions = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="font-semibold text-white mb-4">How to Get Your NPSSO Token</h3>
      <ol className="list-decimal list-inside text-sm text-gray-400 space-y-2">
        <li>Visit <a href="https://ca.account.sony.com/api/v1/ssocookie" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">PlayStation's SSO Cookie page</a></li>
        <li>Sign in to your PlayStation account</li>
        <li>Copy the NPSSO value from the response</li>
        <li>Paste it into the token field above</li>
      </ol>
    </div>
  );
};

export default PsnNpssoInstructions;
