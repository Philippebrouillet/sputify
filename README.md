# Sputify
Sputify est une application web permettant de consulter des informations sur des albums musicaux. Pour ce faire, l'application possède deux types de données : des albums et des chansons. Un album est composé de plusieurs chansons et une chanson appartient à zéro ou un album. Pour la persistance de ces données, un service javascript a déjà été mis en place afin d'enregistrer les données dans le stockage local du navigateur web. En ce moment, l'application possède un jeu de données de départ et elle permet de consulter seulement le titre et le cover des albums.

## Démarrer le projet
Installer [nodejs v16.13.2](https://nodejs.org/de/blog/release/v16.13.2/)
*Note: Si vous ne voulez pas désinstaller votre version actuelle de nodejs, utilisez [nvm](https://github.com/coreybutler/nvm-windows)*

Ouvrir un terminal à la racine du dossier et effectuer les commandes suivantes :
```
npm install
npm run start
```

La dernière commande démarre un serveur de développement sur [http://localhost:3000](http://localhost:3000). 

## Tâches à réaliser
### Afficher toutes les données d'un album
Modifier le composant ```AlbumCard.jsx``` afin d'afficher toute l'information utile concernant un album : nom de l'album, artiste, genre, année de sortie, cover, durée totale (Somme de la durée de toutes les chansons). Aucune contrainte n'est imposée sur la disposition de ces données, vous pouvez faire comme vous le sentez. 

### Modale de création d'un album
Implémenter le composant ```CreateAlbumModal.jsx``` avec tous les champs nécessaires pour créer un nouvel album : nom de l'album, artiste, genre, année de sortie, url du cover, ainsi qu'un composant multi-select permettant de sélectionner des chansons qui n'appartiennent actuellement à aucun album pour les assigner à celui-ci (Utiliser la librairie [react-select](https://react-select.com/home), qui est déjà installée). Évidemment, lorsqu'on clique sur le bouton 'Ajouter', les données doivent être persistées dans le stockage local (Pour vérifier que c'est le cas, redémarrer l'application et vérifier que les nouvelles données sont toujours là)
*Note: Une chanson sans album a un fkAlbumId avec un GUID vide '00000000-0000-0000-0000-000000000000'*

### (**BONUS**) Modale d'édition d'un album
Cette tâche est un bonus, vous n'êtes pas obligé de la réaliser! Quand on y pense, une modale d'édition ou de création fait exactement le même travail excepté lors de la sauvegarde des données. Ainsi, vous pouvez donc réutiliser la modale ```CreateAlbumModal.jsx``` et l'adapter afin de pouvoir gérer les modifications

## Remise
Lorsque l'application sera complétée, zipper tout le contenu de l'application (Sauf les node_modules) et le retourner l'archive par courriel

## Précisions
- Au besoin, vous pouvez installer des packages npm
- L'application sera utilisée seulement sur desktop (1920x1080) alors il n'est pas nécessaire de la faire responsive
- L'application doit être développée pour Google Chrome
- Vous pouvez utiliser l'IDE de votre choix