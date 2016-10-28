# Request

La request est un élément important dans le processus http, puisque c'est dedans que l'on pourra retrouver tous les éléments nécessaire pour répondre correctement au client, ou bien même faire transiter temporairement des données.

La classe `Request` de Easy.js est une surcouche de l'objet `request` Express. Cet objet est capturé lors d'un premier middleware et est envoyé au constructeur de la `Request` Easy.js. Tout ceci est déjà intégré vous n'avez pas besoin de le faire vous-même.

L'avantage de la surcouche Easy.js va être de pouvoir fournir des méthodes plus simples et permettant de faire des traitements plus lourds que si vous les auriez fais vous-même.

