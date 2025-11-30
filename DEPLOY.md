# Guide de Déploiement - KineTeam App

## 🚀 Déploiement sur Vercel (Recommandé)

Vercel est la plateforme idéale pour déployer votre application React/Vite. C'est **gratuit**, **rapide** et **très simple**.

### Prérequis
- Un compte GitHub (gratuit)
- Votre code doit être poussé sur GitHub

---

## Méthode 1 : Via l'interface web Vercel (Le plus simple)

### Étape 1 : Préparer votre code sur GitHub

1. Créez un repository GitHub (si vous ne l'avez pas déjà)
   - Allez sur [github.com](https://github.com)
   - Cliquez sur "New repository"
   - Nommez-le (ex: `kineteam-app`)
   - Ne cochez PAS "Initialize with README" si vous avez déjà du code

2. Poussez votre code local vers GitHub :
   ```bash
   cd kineteam-app
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/VOTRE_USERNAME/kineteam-app.git
   git push -u origin main
   ```

### Étape 2 : Déployer sur Vercel

1. **Créez un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Cliquez sur "Sign Up"
   - Choisissez "Continue with GitHub"
   - Autorisez Vercel à accéder à GitHub

2. **Importez votre projet**
   - Sur le dashboard Vercel, cliquez sur "Add New..." puis "Project"
   - Vous verrez la liste de vos repositories GitHub
   - Cliquez sur "Import" à côté de votre repository `kineteam-app`

3. **Configurez le projet**
   - **Framework Preset** : Vercel détectera automatiquement "Vite"
   - **Root Directory** : Laisser vide (ou `./` si nécessaire)
   - **Build Command** : `npm run build` (déjà prérempli)
   - **Output Directory** : `dist` (déjà prérempli)
   - **Install Command** : `npm install` (déjà prérempli)

4. **Déployez !**
   - Cliquez sur le bouton "Deploy"
   - Attendez 1-2 minutes
   - Votre application sera en ligne !

5. **Obtenez votre URL**
   - Après le déploiement, Vercel vous donnera une URL comme :
     `https://kineteam-app-xxxxx.vercel.app`
   - Cette URL est votre application en ligne !

### Étape 3 : Mises à jour futures

À chaque fois que vous poussez du code sur GitHub (dans la branche `main`), Vercel redéploiera automatiquement votre application ! C'est magique ✨

---

## Méthode 2 : Via la CLI Vercel

Si vous préférez utiliser la ligne de commande :

### Installation

```bash
# Installer Vercel CLI globalement
npm install -g vercel
```

### Déploiement

1. **Connectez-vous à Vercel**
   ```bash
   vercel login
   ```
   Cela ouvrira votre navigateur pour vous connecter.

2. **Dans le dossier de votre projet**
   ```bash
   cd kineteam-app
   vercel
   ```

3. **Suivez les instructions**
   - Vercel vous posera quelques questions :
     - Set up and deploy? **Yes**
     - Which scope? (choisissez votre compte)
     - Link to existing project? **No** (pour la première fois)
     - Project name? (laissez le nom suggéré ou changez-le)
     - Directory? (appuyez sur Entrée pour le dossier actuel)
     - Override settings? **No** (la première fois)

4. **Premier déploiement (preview)**
   - Vercel va déployer une version de test
   - Vous obtiendrez une URL temporaire

5. **Déploiement en production**
   ```bash
   vercel --prod
   ```
   Cela déploiera sur votre URL principale de production.

---

## 🔧 Configuration avancée (Optionnelle)

### Domaine personnalisé

1. Dans votre projet Vercel, allez dans "Settings" > "Domains"
2. Ajoutez votre domaine (ex: `app.kineteam.fr`)
3. Suivez les instructions pour configurer les DNS

### Variables d'environnement

Pour cette application, aucune variable d'environnement n'est nécessaire. Si vous en ajoutez plus tard :

1. Allez dans "Settings" > "Environment Variables"
2. Ajoutez vos variables
3. Redéployez l'application

---

## 📊 Autres options d'hébergement

### Netlify (Alternative à Vercel)

1. Allez sur [netlify.com](https://netlify.com)
2. Connectez votre compte GitHub
3. Importez votre repository
4. Configuration :
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Déployez !

### GitHub Pages (Gratuit mais plus complexe)

Nécessite quelques modifications supplémentaires dans `vite.config.ts` :

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/kineteam-app/' // Nom de votre repository
})
```

Puis utilisez un GitHub Action pour déployer automatiquement.

---

## ✅ Vérification du déploiement

Après le déploiement, testez :

1. ✅ L'application se charge correctement
2. ✅ Le téléchargement de fichiers Excel fonctionne
3. ✅ La génération de PDF fonctionne
4. ✅ Tous les graphiques s'affichent correctement

---

## 🆘 Problèmes courants

### "Build failed"
- Vérifiez que toutes les dépendances sont dans `package.json`
- Vérifiez que `npm run build` fonctionne localement

### "404 Not Found" après déploiement
- Vercel devrait gérer cela automatiquement avec le fichier `vercel.json`
- Vérifiez que le fichier `vercel.json` est présent dans votre projet

### L'application est lente
- Vercel utilise un CDN global, normalement très rapide
- Vérifiez la taille de votre bundle avec `npm run build` localement

---

## 📝 Notes importantes

- **Gratuit** : Vercel offre un plan gratuit généreux (100 GB de bande passante/mois)
- **HTTPS** : Activé automatiquement
- **CDN** : Votre app est distribuée dans le monde entier
- **Déploiements automatiques** : À chaque push sur GitHub
- **Preview URLs** : Chaque Pull Request obtient sa propre URL de prévisualisation

---

## 🎉 C'est tout !

Votre application est maintenant en ligne. Partagez l'URL avec vos utilisateurs !

Pour toute question, consultez la [documentation Vercel](https://vercel.com/docs).
