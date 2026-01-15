# SpeedReader 🚀

A high-performance speed reading application using **RSVP** (Rapid Serial Visual Presentation). Absorb text as fast as your brain can think by eliminating eye movement.

## ✨ Features

- **RSVP Algorithm**: Displays words one by one at a fixed location, highlighting the "Pivot" (Optimal Recognition Point) in red to keep your focus centered.
- **File Support**: Open `.txt` and `.pdf` files directly in your browser.
- **Customizable Speed**: Adjust reading speed from 60 to 1000 WPM (Words Per Minute).
- **Persistent Settings**: Remembers your preferred font choice across sessions.
- **Controls**: 
  - Play/Pause with **Spacebar**.
  - Rewind 10 seconds.
  - Seek through the text with a progress bar.
- **Responsive Design**: Modern, premium dark mode interface.

## 🛠️ Technology Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **PDF Parsing**: [PDF.js](https://mozilla.github.io/pdf.js/)
- **Styling**: Vanilla CSS with a customized dark-themed design system.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone or download the repository.
2. Navigate to the project directory:
   ```bash
   cd SpeedReader
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```
Open your browser to the URL shown in the terminal (usually `http://localhost:5173`).

## 🌐 Deployment (GitHub Pages)

This project is configured for easy deployment to GitHub Pages.

1.  Push your code to GitHub.
2.  Go to **Settings > Pages**.
3.  Under **Build and deployment > Source**, select **GitHub Actions**.
4.  Vite will automatically deploy the site if you use a standard Vite GitHub Action, or you can build it locally:
    ```bash
    npm run build
    ```
    The output will be in the `/dist` folder.

> [!NOTE]
> The `base` path in `vite.config.js` is set to `/SpeedReader/`. If you rename your repository, make sure to update this value.

## 👨‍💻 Author

Developed by **Saverio Terracciano**
- Twitter: [@tetsuoryuu](https://twitter.com/tetsuoryuu)
- LinkedIn: [Saverio Terracciano](https://www.linkedin.com/in/saverioterracciano)

---
*Inspired by the science of RSVP reading.*
