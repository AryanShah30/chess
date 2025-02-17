# Chess Webpage

A fully open-source, browser-based chess platform delivering a lightweight and accessible chess experience—all without the need for backend servers.

## Project Overview

This project aims to deliver a lightweight, fully accessible chess experience that operates entirely in the browser. Unlike many existing chess platforms that require account creation, track user data, or depend on slow server interactions, this application offers a seamless and privacy-focused alternative.

Built from the ground up using pure JavaScript, every aspect of the game—from move validation to handling special rules like castling and en passant—has been meticulously implemented according to official chess regulations.

## Key Features

- **No Signup:** Start playing immediately without the hassle of creating an account
- **Always Available:** Enjoy uninterrupted access anytime
- **Cross-Device Compatibility:** Play seamlessly on desktops, tablets, and smartphones
- **Open Source:** View, modify, and extend the code to suit your needs
- **Privacy-Focused:** No data collection or storage
- **Free Access:** Completely free with no fees or licensing costs
- **Optimized Performance:** Experience fast and responsive gameplay
- **Backend Independence:** Runs entirely in the browser without server-side dependencies

## What's New on the Board

- **Personalized Experience:** Customize player names and avatars
- **Dynamic Time Controls:** Flexible time settings with options for hours, minutes, and seconds
- **Diverse Piece Styles:** Choose from over 30 stunning piece designs (e.g., Alpha, Celtic, Fantasy)
- **Tailored Board Colors:** Create the perfect ambiance using our intuitive color picker
- **Complete Game Scoresheet:** Access a detailed scoresheet for every game
- **Special Move Notation:** Keep track of special moves like castling and en passant with dedicated notation

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
chess/
├── Assets/
│ ├── images/
│ └── pieces/
├── Components/
│ ├── ChessClock.js
│ ├── Documentation.js
│ └── ThemeSetup.js
├── Data/
│ ├── data.js
│ └── pieces.js
├── Events/
│ └── global.js
├── Helper/
│ ├── commonHelper.js
│ ├── constants.js
│ └── notifications.js
├── Render/
│ └── main.js
├── styles/
│ └── index.css
├── index.html
└── index.js


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
1. Refresh the page first (as this is a frontend-only application)
2. If the issue persists, please open an issue on GitHub with:
   - A description of the problem
   - Steps to reproduce
   - Expected vs actual behavior

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For inquiries or suggestions, please reach out through the [GitHub Repository](https://github.com/your-username/chess).