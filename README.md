# Hexagone Front

Site vitrine Next.js pour Hexagone Academie.

## Developpement local

```bash
npm install
npm run dev
```

## Build statique

```bash
npm run build
```

La configuration `next.config.js` utilise `output: "export"`. Le build produit le dossier `out/`, compatible avec un hebergement web OVH classique.

## Deploiement OVH via GitHub Actions

Le workflow `.github/workflows/deploy.yml` build le site a chaque push sur `main`, puis deploye le contenu de `out/` sur OVH si les secrets GitHub suivants sont configures :

- `OVH_FTP_SERVER` : serveur FTP/SSH indique dans OVH, souvent sous l'onglet `FTP - SSH`.
- `OVH_FTP_USERNAME` : utilisateur FTP OVH.
- `OVH_FTP_PASSWORD` : mot de passe FTP OVH.
- `OVH_FTP_DIR` : dossier distant de publication, par defaut `./www/` si le secret est absent.

Ne jamais commiter les identifiants OVH dans le repository.
