# ImmoG - Système de Gestion Immobilière

## À propos du projet

ImmoG est une application web de gestion immobilière développée avec Laravel. Elle permet de gérer efficacement :

-   Les biens immobiliers
-   Les contrats de location
-   Les propriétaires et locataires
-   La gestion des documents (contrats, quittances, etc.)
-   Le suivi des paiements

## Fonctionnalités principales

-   Gestion complète des biens immobiliers
-   Génération et suivi des contrats de location
-   Gestion des propriétaires et locataires
-   Système de messagerie intégré
-   Génération de documents PDF
-   Suivi des activités et historique
-   Interface utilisateur moderne et intuitive

## Prérequis techniques

-   PHP >= 8.1
-   Composer
-   MySQL >= 5.7
-   Node.js & NPM

## Installation

1. Cloner le repository

```bash
git clone [URL_DU_REPO]
```

2. Installer les dépendances PHP

```bash
composer install
```

3. Installer les dépendances JavaScript

```bash
npm install
```

4. Configurer l'environnement

```bash
cp .env.example .env
php artisan key:generate
```

5. Configurer la base de données dans le fichier `.env`

6. Exécuter les migrations

```bash
php artisan migrate
```

7. Lancer le serveur de développement

```bash
php artisan serve
npm run dev
```

## Sécurité

Si vous découvrez une vulnérabilité de sécurité, veuillez envoyer un e-mail à [VOTRE_EMAIL]. Toutes les vulnérabilités seront traitées rapidement.

## Licence

Ce projet est sous licence [MIT](https://opensource.org/licenses/MIT).
