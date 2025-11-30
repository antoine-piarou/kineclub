# 🚀 Déploiement Rapide - 5 Minutes

## Étape 1 : Préparer Git (si pas déjà fait)

```bash
cd kineteam-app
git init
git add .
git commit -m "Ready for deployment"
```

## Étape 2 : Créer un repository GitHub

1. Allez sur [github.com/new](https://github.com/new)
2. Nommez votre repository (ex: `kineteam-app`)
3. Ne cochez PAS "Initialize with README"
4. Cliquez sur "Create repository"

## Étape 3 : Pousser votre code

```bash
git remote add origin https://github.com/VOTRE_USERNAME/kineteam-app.git
git branch -M main
git push -u origin main
```

(Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub)

## Étape 4 : Déployer sur Vercel

1. **Allez sur** [vercel.com](https://vercel.com)
2. **Cliquez sur** "Sign Up" → "Continue with GitHub"
3. **Autorisez** Vercel à accéder à GitHub
4. **Cliquez sur** "Add New..." → "Project"
5. **Trouvez** votre repository `kineteam-app`
6. **Cliquez sur** "Import"
7. **Laissez les paramètres par défaut** (Vercel détecte tout automatiquement)
8. **Cliquez sur** "Deploy"

## ✅ C'est fait !

Votre app sera en ligne en 1-2 minutes avec une URL comme :
`https://kineteam-app-xxxxx.vercel.app`

---

## 🔄 Mises à jour futures

Chaque fois que vous modifiez votre code :

```bash
git add .
git commit -m "Description des modifications"
git push
```

Vercel redéploiera automatiquement ! 🎉

---

Pour plus de détails, consultez `DEPLOY.md`
