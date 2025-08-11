import React, { useState } from 'react';
import { ExternalLink, Copy, Check, AlertTriangle, Info } from 'lucide-react';

const PsnNpssoInstructions = () => {
  const [copiedStep, setCopiedStep] = useState(null);

  const copyToClipboard = (text, step) => {
    navigator.clipboard.writeText(text);
    setCopiedStep(step);
    setTimeout(() => setCopiedStep(null), 2000);
  };

  return (
    <div className="bg-surface rounded-lg p-6 border border-secondary/20">
      <div className="flex items-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-text-primary">How to Get Your NPSSO Token</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-200">
              <p className="font-medium mb-1">Important Note:</p>
              <p>This is for advanced users only. The NPSSO token is sensitive information that provides access to your PSN account.</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div className="flex-1">
              <p className="text-text-primary mb-2">Visit PlayStation's SSO Cookie page</p>
              <button
                onClick={() => window.open('https://ca.account.sony.com/api/v1/ssocookie', '_blank')}
                className="inline-flex items-center space-x-1 text-primary hover:text-primary/80 text-sm"
              >
                <span>Open PlayStation SSO Page</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div className="flex-1">
              <p className="text-text-primary mb-2">Sign in to your PlayStation account</p>
              <p className="text-sm text-text-secondary">Use the same account you use on your PlayStation console</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div className="flex-1">
              <p className="text-text-primary mb-2">Copy the NPSSO value from the response</p>
              <div className="bg-background border border-secondary/20 rounded p-2 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-text-secondary">Example response:</span>
                  <button
                    onClick={() => copyToClipboard('{"npsso":"YOUR_TOKEN_HERE"}', 3)}
                    className="text-primary hover:text-primary/80 flex items-center space-x-1"
                  >
                    {copiedStep === 3 ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span className="text-xs">{copiedStep === 3 ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
                <code className="text-xs text-text-secondary break-all">
                  {"{\"npsso\":\"YOUR_TOKEN_HERE\"}"}
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
              4
            </div>
            <div className="flex-1">
              <p className="text-text-primary mb-2">Extract and paste the token value</p>
              <p className="text-sm text-text-secondary">Copy only the token value (not the entire JSON response) and paste it into the field above</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-3 mt-4">
          <div className="flex items-start space-x-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-200">
              <p className="font-medium mb-1">Need Help?</p>
              <p>If you're having trouble, you can still use the app without PSN connection. All features work offline!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PsnNpssoInstructions;
