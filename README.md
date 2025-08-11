# 🏆 Platinum Trophy Tracker

A beautiful and user-friendly web application for tracking your PlayStation trophy progress and managing your gaming achievements.

## ✨ Features

### 🎮 Core Functionality
- **Browse Games**: Search and discover PlayStation games with detailed trophy information
- **Trophy Library**: Track your personal trophy collection with progress visualization
- **PSN Integration**: Connect your PlayStation Network account to sync real trophy data
- **Smart Auto-completion**: Automatically mark Platinum trophies when all other trophies are earned

### 🎯 User Experience
- **Intuitive Interface**: Clean, modern design with smooth animations
- **Keyboard Shortcuts**: Quick navigation using keyboard shortcuts
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Full keyboard navigation and screen reader support
- **Real-time Feedback**: Toast notifications for all user actions
- **Tooltips**: Helpful hints and explanations throughout the interface

### 🔧 Technical Features
- **Offline Support**: Works without internet connection
- **Local Storage**: Your data is saved locally in your browser
- **Fast Performance**: Optimized for smooth interactions
- **Cross-platform**: Works on Windows, Mac, Linux, and mobile browsers

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PlatinumTrophyTracker-3
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📖 How to Use

### 🎮 Basic Usage

1. **Browse Games**
   - Use the search bar to find specific games
   - Click "Add" to add games to your library
   - View trophy counts for each game

2. **Manage Your Library**
   - Track your trophy progress with visual progress bars
   - Click checkboxes to mark trophies as earned
   - Expand game cards to see individual trophy details
   - Platinum trophies auto-complete when all other trophies are earned

3. **Connect to PSN** (Advanced Users)
   - Get your NPSSO token from PlayStation's website
   - Connect your account to sync real trophy data
   - View your actual PSN profile and trophy progress

### ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+1` | Browse Games |
| `Ctrl+2` | My Library |
| `Ctrl+3` | PlayStation |
| `Ctrl+4` | Settings |
| `Ctrl+K` | Search Games (when on Browse tab) |

### 🎯 Trophy Types

- **🏆 Platinum**: The ultimate achievement (1 per game)
- **🥇 Gold**: Rare and challenging trophies
- **🥈 Silver**: Medium difficulty trophies  
- **🥉 Bronze**: Common and easy trophies

## 🔗 PSN Integration (Advanced)

### Getting Your NPSSO Token

1. Visit [PlayStation's SSO Cookie page](https://ca.account.sony.com/api/v1/ssocookie)
2. Sign in with your PlayStation account
3. Copy the NPSSO value from the response
4. Paste it into the app's connection form

⚠️ **Important**: This is for advanced users only. The NPSSO token provides access to your PSN account, so keep it secure.

## 🎨 Customization

### Settings
- **Auto-complete Platinum**: Automatically mark Platinum trophies when all other trophies are earned
- **Keyboard Shortcuts**: View all available shortcuts in the Settings tab

### Themes
The app automatically adapts to your system preferences:
- **Dark Mode**: Default modern dark theme
- **High Contrast**: Enhanced visibility for accessibility
- **Reduced Motion**: Respects user's motion preferences

## 📱 Mobile Usage

The app is fully optimized for mobile devices:
- Touch-friendly interface with proper button sizes
- Responsive design that works on all screen sizes
- Swipe gestures and mobile-optimized interactions
- Offline functionality for on-the-go trophy tracking

## 🔧 Development

### Project Structure
```
src/
├── components/          # React components
│   ├── PlatinumTracker.jsx
│   ├── PsnProfile.jsx
│   ├── PsnTrophyList.jsx
│   └── PsnNpssoInstructions.jsx
├── api/                 # API services
│   └── psnService.js
├── data/               # Mock data and constants
│   └── mockGames.js
└── index.css           # Global styles
```

### Building for Production
```bash
npm run build
```

### Technologies Used
- **React 19**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icon library
- **ESBuild**: Fast JavaScript bundler

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- PlayStation Network API for trophy data
- The gaming community for inspiration
- All contributors and users of this application

## 🆘 Support

If you encounter any issues or have questions:
1. Check the Settings tab for helpful information
2. Ensure you're using a modern web browser
3. Try refreshing the page if the app seems unresponsive
4. Contact the development team for technical support

---

**Happy Trophy Hunting! 🏆**
