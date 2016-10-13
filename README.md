# Easy.js framework

Easy.js est un framework pour NodeJS, amenant de la conception objet côté serveur basé sur ES2015.
Le framework met à disposition des composants devenus incoutournables pour le développement actuel : L'injection de dépendances, le design pattern Strategy, structure MVC et des commandes console permettant de gérer la structure du projet.


## Requirements

Easy.js est construit sur la base de ES2015, il permet donc de pouvoir utiliser toutes les conceptions objets de ce dernier.
Utilisant quelques fonctionnalités non supportés par le moteur V8 (les import par exemple), le framework a donc besoin du transpileur Babel pour fonctionner.

## Maintainers
* Julien Sergent ([juliensergent.com](http://juliensergent.com) - <a href="mailto:sergent.julien@icloud.com">sergent.julien@icloud.com</a>)

## Getting Started

### Requirements

```
npm install babel-cli --global
```

### Installation & start

```
git clone https://github.com/MadDeveloper/easy.js.git myproject
cd myproject
npm install
npm start
```