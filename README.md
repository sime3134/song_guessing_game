# Guess the Song Game

This is an interactive song guessing game that challenges players to identify songs based on their lyrics. Built with Next.js and Material-UI, the app provides a fun and engaging way to test your music knowledge. Users can request more lyrics if they are stuck, but this reduces the potential score they can earn for each song.

## Playing the Game

When the game is running:

- Start the game by clicking the **Start Game** button.
- Guess the title of the song from the displayed lyrics and enter your guess. Remember that you can only guess once per song.
- Submit your guess or get more lyrics by clicking **Show New Row**, which decreases the points you can earn.
- Points are awarded based on the accuracy and quickness of your guesses.
- The game tracks your score and provides high score tracking via local storage.

## Notes about Framework Choice

TODO

## Getting Started

Start by cloning the repository to your local machine.

```bash
git clone https://github.com/sime3134/api-project
```

## Prerequisites

To run this project, you need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/en/).

## Installing

Then, install the dependencies.

```bash
npm install
```

After that, you can run the development server.

```bash
npm run dev
```

Optionally, you can build the project and run it.

```bash
npm run build
npm run start
```

When the project is running, you can access it on [http://localhost:3000](http://localhost:3000).

## Built With

### Frameworks and Libraries

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/) - Web framework built on top of React
- [Material UI](https://mui.com/) - React UI library

### APIs

- [Musixmatch API](https://developer.musixmatch.com/) - API for retrieving songs and lyrics

## Authors

- **Simon Jern**
- **Johan Salomonsson**
- **Erik Larsson**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
