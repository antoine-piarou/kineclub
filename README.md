# KineTeam PDF Generator

This is a simple web application to generate PDF reports for players from an Excel file.

## Features
- **Excel Upload**: Drag and drop your `.xlsx` file.
- **Automatic Parsing**: Extracts player data, metrics, and chart scores.
- **PDF Generation**: Generates a PDF for each player with the exact design required.
- **Bulk Download**: Downloads all PDFs in a single ZIP file.

## How to Use
1. Ensure you have Node.js installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
4. Open your browser at `http://localhost:5173`.
5. Upload the `tableau kineteam BCUS test 11.09.2025.xlsx` file.
6. Verify the preview and click "Download All PDFs".

## Tech Stack
- React + Vite
- Tailwind CSS
- Chart.js (Radar Chart)
- jsPDF + html2canvas

## Déploiement

### Option 1 : Vercel (Recommandé - Gratuit et Simple)

#### Méthode rapide (Interface web)
1. Poussez votre code sur GitHub
2. Allez sur [vercel.com](https://vercel.com)
3. Connectez votre compte GitHub
4. Cliquez sur "New Project"
5. Importez votre repository `kineteam-app`
6. Vercel détectera automatiquement les paramètres (Vite)
7. Cliquez sur "Deploy"
8. Votre app sera en ligne en 1-2 minutes !

#### Méthode CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Dans le dossier kineteam-app
cd kineteam-app
vercel

# Suivre les instructions, puis pour la production:
vercel --prod
```

### Option 2 : Autres hébergements
- **Netlify** : Similaire à Vercel, très simple
- **GitHub Pages** : Gratuit mais nécessite une configuration supplémentaire
- **WordPress** : Non recommandé pour une app React (nécessite beaucoup de configuration)

## Variables d'environnement
Aucune variable d'environnement nécessaire pour cette application.
