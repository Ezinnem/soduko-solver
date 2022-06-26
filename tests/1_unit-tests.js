const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let validPuzzle =  '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.';
suite('UnitTests', () => {
    suite("solver tests", function () {
        test("Logic handles a valid puzzle of 81 characters", function(done) {
            let invalidPuzzle = "1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            
            assert.equal(solver.solve(invalidPuzzle), false);
            done();
            });

        test("Logic handles a puzzle string with invalid character (not 1-9 or .)", function(done) {
            let invalidPuzzle = "1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            
        assert.equal(solver.solve(invalidPuzzle), false);
        done();
        });

        test("Logic handles a puzzle string that is not equal to 81 character in length", function(done) {
            let invalidPuzzle = "1.5..2.84..63.12.7.2..5....1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
        assert.equal(solver.solve(invalidPuzzle), false);
        done();
        });

        test("Logic handles a valid row placement", function(done) {
            assert.equal(solver.checkRowPlacement(validPuzzle, "A", "2", "9"), true);
            done();
        })

        test("Logic handles a invalid row placement", function(done) {
            assert.equal(solver.checkRowPlacement(validPuzzle, "A", "2", "1"), false);
            done();
        });

        test("Logic handles a valid col placement", function(done) {
            assert.equal(solver.checkColPlacement(validPuzzle, "A", "2", "8"), true);
            done();
        });

        test("Logic handles a invalid col placement", function(done) {
            assert.equal(solver.checkColPlacement(validPuzzle, "A", "2", "9"), false);
            done();
        });
        
        test("Logic handles a valid (3x3 grid) placement", function(done) {
            assert.equal(solver.checkRegionPlacement(validPuzzle, "A", "2", "3"), true);
            done();
        });

        test("Logic handles a invalid (3x3 grid) placement", function(done) {
            assert.equal(solver.checkRegionPlacement(validPuzzle, "A", "2", "1"), false);
            done();
        });

        test("Valid puzzle strings pass the solver", function(done) {
            let invalidPuzzle = "1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            
            assert.equal(solver.solve(invalidPuzzle), false);
            done();
        });

        test("Invalid puzzle strings fail the solver", function(done) {
            let invalidPuzzle = "1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            
        assert.equal(solver.solve(invalidPuzzle), false);
        done();
        });

        test("Solver returns the expected solution for an incomplete puzzle", function(done) {
            let invalidPuzzle = "1.5..2.84..63.12.7.2..5..g..9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
            
            assert.equal(solver.solve(invalidPuzzle), false);
            done();
            });

    });
});
