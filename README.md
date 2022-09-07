# Pokemon Guesser

> A web app guessing game that uses various Pokemon's silhouette and/or cry.

## 🚀 Objective

> To build upon a previous project that was developed for a hackathon and polish
> it with more features, more pokemons, and more animations.

## 📸 Screenshots

<ul style="display:flex flex-direction:column">
<img src="./screenshots/landing.PNG" width="690" height="375" alt="landing"> 
<img src="./screenshots/loading.PNG" width="690" height="375" alt="loading">
<img src="./screenshots/difficulty.PNG" width="690" height="375" alt="difficulty">    
<img src="./screenshots/game.PNG" width="690" height="375" alt="game">    
<img src="./screenshots/ranking.PNG" width="690" height="375" alt="ranking">
</ul>

## 🎥 Live Demo

<a href="https://jonathancarpena.me/work/demo/Pokemon%20Guesser" target="_blank" rel="noopener noreferrer">Click
Here 🔗</a>

## 📋 Features

-  5 Game difficulty options.
   -  Easy: Pokedex Order + Pokemon Silhouette.
   -  Medium: Pokedex Order + No Pokemon Silhouette.
   -  Hard: Random Order + Pokemon Silhouette.
   -  Expert: Random Order + No Pokemon Silhouette.
   -  Master: All Pokemon + No Pokemon Silhouette + No Pokemon Cry
-  Pokemon Generations 1-8.
   -  Pokedex ID #1-905
-  High Score Table for each Pokemon generation and different levels.
-  Desktop Only.

## ⚙ Technologies

### Front End:

-  React
-  React Router
-  Tailwind CSS
-  Axios
-  Netlify

### Back End:

-  MongoDB
-  Express
-  Node.js
-  Heroku

## 🛠 Installation and Setup

### Install

Clone down this repository. You will need node and npm installed globally on
your machine.

```
$ git clone https://github.com/jonathancarpena/pokemon-guesser.git
```

1. Install project folder `npm install`
1. Install client packages `cd client` `npm install`
1. Install server packages `cd server` `npm install`

### Environment Variables

To run this project, you will need to add the following environment variables to
your `.env` file inside the server folder.

`MONGO_URI`: Register a new cluster in MongoDB Atlas and record your Mongo URI

### Scripts

Development mode. Open http://localhost:3000 to view it in the browser. Server
will run on PORT:5000

```
npm run dev
```

Server-side. (PORT:5000) Open http://localhost:5000 to access.

```
npm run server
```

Client-side. (PORT:3000) Open http://localhost:3000 to view it in the browser.

```
npm run client
```
