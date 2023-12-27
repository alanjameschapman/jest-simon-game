/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns} = require('../game');

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('Game object contains correct keys', () => {
    test('Score key exists', () => {
        expect('score' in game).toBe(true);
    });
    test('CurrentGame key exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('PlayerMoves key exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('Choices key exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('Choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4']);
    });
});

describe('New game works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['button1', 'button2'];
        game.currentGame = ['button1', 'button2'];
        document.getElementById('score').textContent = '42';
        newGame();
    });
    test('Score is reset to zero', () => {
        expect(game.score).toEqual(0);
    });
    test('should be one move in the computers array', () => {
        expect(game.currentGame.length).toBe(1);
    });
    test('Clear the playerMoves array', () => {
        expect(game.playerMoves.length).toBe(0); // .toBe(0) is the same as .toEqual(0)
    });
    test('Should display 0 for the element with id of score', () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data-listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements) {
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('gamePlay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test('addTurn should add a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test('should add correct class to buttons', () => {
        addTurn();
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
});