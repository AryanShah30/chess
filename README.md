# Zero-Lag Chess: The Ultimate Serverless Experience

[Experience Chess Without Limits](https://aryanshah30.github.io/chess/)

## Overview

This web app aims to deliver a lightweight, fully accessible chess experience that operates entirely in the browser, without relying on backend servers. Unlike many existing chess platforms that require account creation, track user data, or depend on slow server interactions, this application offers a seamless and privacy-focused alternative.

A fully open-source chess platform built from the ground up. No external chess libraries were used—every aspect of the game, from move validation to special rules like castling and en passant, has been meticulously implemented using pure JavaScript, strictly following chess regulations.

## Key Features

- **Instant Play:** No signup required—start playing immediately!
- **Always Available:** Play anytime, anywhere, on any device
- **Cross-Device Compatibility:** Enjoy a consistent experience on desktops, tablets, and smartphones
- **Privacy-Focused:** Your data stays on your device—no tracking or storage
- **Open Source:** Fully customizable and extendable by the community
- **Optimized Performance:** Experience fast, responsive gameplay without latency
- **Backend Independence:** Runs entirely in the browser

## What's New

- **Personalized Experience:** Customize player names and avatars
- **Dynamic Time Controls:** Flexible settings for hours, minutes, and seconds
- **Diverse Piece Styles:** Over 30 stunning piece designs (e.g., Alpha, Celtic, Fantasy)
- **Tailored Board Colors:** Use our intuitive color picker to set the perfect board ambiance
- **Complete Game Scoresheet:** Detailed scoresheet available for every game
- **Special Move Notation:** Dedicated notation for moves like castling and en passant

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chess.git
   ```

2. Navigate to the project directory:
   ```bash
   cd chess
   ```

3. Open `index.html` in your browser

## Project Structure
```
chess/
├── Assets/
│   ├── images/           # Visual assets and banners
│   └── pieces/           # Chess piece images
├── Components/
│   ├── ChessClock.js     # Chess clock functionality
│   ├── Documentation.js  # In-app documentation
│   └── ThemeSetup.js     # Theme and color customization
├── Data/
│   ├── data.js           # General data configurations
│   └── pieces.js         # Piece definitions and configurations
├── Events/
│   └── global.js         # Global event handling
├── Helper/
│   ├── commonHelper.js   # Common utility functions
│   ├── constants.js      # Constant values used across the app
│   └── notifications.js  # User notifications and alerts
├── Render/
│   └── main.js           # Main rendering logic for the board and pieces
├── styles/
│   └── index.css         # Styling for the application
├── index.html            # Entry point for the app
└── index.js              # Main JavaScript file
```

## Future Development

- **PGN Export:** Export your game scoresheets in PGN format
- **Stockfish Integration:** Real-time analysis with evaluation bar and AI opponents
- **Multiplayer Link Sharing:** Invite friends via shareable links

## Contributing

Contributions are welcome! If you'd like to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## Bug Reports

If you encounter any issues:

1. Refresh the Page: Since this is a frontend-only application, a refresh might resolve minor glitches.
2. Submit an Issue: Provide a detailed description, steps to reproduce the problem, and the expected versus actual behavior.
3. Report via the Web App: Alternatively, you can directly report bugs using the 'Report Bugs' button within the web app for a quick and seamless submission.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For inquiries or suggestions, please reach out through our [GitHub Repository](https://github.com/AryanShah30/chess).
