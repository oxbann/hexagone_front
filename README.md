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

## Deploiement OVH via GitHub Actions en SFTP

Le workflow `.github/workflows/deploy.yml` build le site a chaque push sur `main`, puis synchronise le contenu de `out/` vers OVH avec SFTP si les secrets GitHub suivants sont configures :

- `OVH_SFTP_HOST` : serveur SFTP indique par OVH dans l'onglet `FTP - SSH`.
- `OVH_SFTP_USER` : utilisateur SFTP/FTP OVH.
- `OVH_SFTP_PASSWORD` : mot de passe SFTP/FTP OVH.
- `OVH_SFTP_PORT` : port SFTP, optionnel. Par defaut `22`.
- `OVH_SFTP_DIR` : dossier distant de publication, optionnel. Par defaut `www`.

Ne jamais commiter de mot de passe, cle privee ou identifiant sensible dans le repository.
