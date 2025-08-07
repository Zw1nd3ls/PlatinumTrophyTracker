import { mockGames } from '../data/mockGames.js';

// PlayStation API configuration
export const PSN_API_CONFIG = {
  baseURL: 'https://m.np.playstation.com/api',
  // Note: In a real implementation, you'd need proper authentication
  // This is a mock configuration for demonstration
  endpoints: {
    trophyTitles: '/trophy/v1/users/{accountId}/trophyTitles',
    trophyGroups: '/trophy/v1/npCommunicationIds/{npCommunicationId}/trophyGroups',
    trophies: '/trophy/v1/npCommunicationIds/{npCommunicationId}/trophyGroups/{trophyGroupId}/trophies'
  }
};

// Mock PlayStation API response data
const mockPSNResponse = {
  trophyTitles: [
    {
      npServiceName: "trophy",
      npCommunicationId: "NPWR20188_00",
      trophyTitleName: "Cyberpunk 2077",
      trophyTitleIconUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202010/2217/cKZ4tKNFaOhqSNzQC8b43xVt.png",
      trophyTitlePlatform: "PS4,PS5",
      hasTrophyGroups: false,
      definedTrophies: {
        bronze: 17,
        silver: 8,
        gold: 2,
        platinum: 1
      },
      progress: 45,
      earnedTrophies: {
        bronze: 8,
        silver: 3,
        gold: 0,
        platinum: 0
      },
      hiddenFlag: false,
      lastUpdatedDateTime: "2024-12-15T10:30:00Z"
    },
    {
      npServiceName: "trophy",
      npCommunicationId: "NPWR19557_00",
      trophyTitleName: "Astro Bot",
      trophyTitleIconUrl: "https://image.api.playstation.com/vulcan/ap/rnd/202409/0312/astrobot.png",
      trophyTitlePlatform: "PS5",
      hasTrophyGroups: false,
      definedTrophies: {
        bronze: 25,
        silver: 12,
        gold: 4,
        platinum: 1
      },
      progress: 100,
      earnedTrophies: {
        bronze: 25,
        silver: 12,
        gold: 4,
        platinum: 1
      },
      hiddenFlag: false,
      lastUpdatedDateTime: "2024-11-20T14:22:00Z"
    }
  ]
};

// PlayStation API service
export class PSNService {
  constructor() {
    this.isConnected = false;
    this.accountId = null;
    this.accessToken = null;
  }

  async authenticate(npsso) {
    // Mock authentication - in reality this would use OAuth flow
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (npsso && npsso.length > 10) {
        this.isConnected = true;
        this.accountId = 'mock_account_id_12345';
        this.accessToken = 'mock_access_token';
        return {
          success: true,
          accountId: this.accountId,
          profile: {
            onlineId: 'MockUser123',
            aboutMe: 'PlayStation gamer',
            avatarUrl: 'https://secure.gravatar.com/avatar/placeholder',
            plus: 1,
            trophySummary: {
              level: 425,
              progress: 67,
              earnedTrophies: {
                bronze: 1250,
                silver: 340,
                gold: 89,
                platinum: 12
              }
            }
          }
        };
      }
      throw new Error('Invalid NPSSO token');
    } catch (error) {
      this.isConnected = false;
      throw error;
    }
  }

  async getTrophyTitles() {
    if (!this.isConnected) {
      throw new Error('Not authenticated with PlayStation Network');
    }

    // Mock API response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockPSNResponse.trophyTitles;
  }

  async getTrophiesForGame(npCommunicationId) {
    if (!this.isConnected) {
      throw new Error('Not authenticated');
    }

    // Return mock trophy data based on our existing games
    const gameData = mockGames.find(g => g.npCommunicationId === npCommunicationId);
    return gameData ? gameData.trophies : null;
  }

  disconnect() {
    this.isConnected = false;
    this.accountId = null;
    this.accessToken = null;
  }
}
