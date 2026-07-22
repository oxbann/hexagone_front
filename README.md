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

## Deploiement OVH via GitHub Actions en SSH

Le workflow `.github/workflows/deploy.yml` build le site a chaque push sur `main`, puis synchronise le contenu de `out/` vers OVH avec SSH + rsync si les secrets GitHub suivants sont configures :

- `OVH_SSH_HOST` : serveur SSH indique par OVH dans l'onglet `FTP - SSH`.
- `OVH_SSH_USER` : utilisateur SSH/FTP OVH.
- `OVH_SSH_PRIVATE_KEY` : cle privee de deploiement, sans passphrase de preference pour GitHub Actions.
- `OVH_SSH_PORT` : port SSH, optionnel. Par defaut `22`.
- `OVH_SSH_DIR` : dossier distant de publication, optionnel. Par defaut `www`.

Ne jamais commiter de cle privee, mot de passe ou identifiant sensible dans le repository.

### Creation conseillee de la cle SSH

Sur ton ordinateur, cree une cle dediee au deploiement :

```bash
ssh-keygen -t ed25519 -C "github-actions-ovh-hexagone" -f ovh_github_actions
```

Ajoute le contenu de `ovh_github_actions.pub` dans OVH pour l'utilisateur SSH concerne, puis ajoute le contenu complet de `ovh_github_actions` dans le secret GitHub `OVH_SSH_PRIVATE_KEY`.
