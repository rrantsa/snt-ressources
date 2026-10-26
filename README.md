# La Fabrique SNT

Jeu-questionnaire pédagogique et bibliothèque de ressources SNT, en français. Application statique sans compte, conçue pour fonctionner sur GitHub Pages et s’installer comme PWA.

## Fonctions
- Quiz à quatre choix : 6ème, 5ème, 4ème, 3ème et 2nde.
- Score et bonnes réponses enregistrés dans le navigateur (`localStorage`).
- Articles de cours avec filtres par thème.
- Ressources téléchargeables dans `resources/`.
- Mise en cache hors ligne après la première visite (service worker).

## Développement local
L’application ne nécessite pas de dépendance : ouvrir via un serveur statique, car les service workers ne fonctionnent pas depuis `file://`.

```sh
python3 -m http.server 8000
```
Puis visiter http://localhost:8000.

## Publication GitHub Pages
Le workflow `.github/workflows/pages.yml` publie le contenu du dépôt sur GitHub Pages à chaque push sur `main`. Dans GitHub, ouvrir **Settings → Pages** et choisir **GitHub Actions** comme source si ce n’est pas déjà activé.

## Ajouter des contenus
- Les ressources téléchargeables vont dans `resources/` et sont référencées dans `RESOURCES` de `app.js`.
- Les questions et explications se trouvent dans l’objet `QUESTIONS` de `app.js`.
- Les leçons sont dans le tableau `LESSONS` de `app.js`.

Les questions et cours intégrés sont un contenu de démonstration à relire et adapter au programme et aux ressources de l’enseignant.
