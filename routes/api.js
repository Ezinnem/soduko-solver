'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value} = req.body;
      if(!puzzle || !coordinate || !value){
        res.json({error: "Required field(s) missing"});
        return;
      }
      const row = coordinate.split("")[0];
      const column = coordinate.split("")[1];
      if(
        coordinate.length !== 2 ||
        !/[a-i]/i.test(row) ||
        !/[1-9]/i.test(column)
      ){
        res.json({error: "Invalid coordinate"});
        return;
      }
      if(!/[0-9]/.test(value)){
        res.json({ error: 'Invalid value' });
        return;
      }
      if(!/[1-9]/i.test(value)){
        res.json({ error: "Invalid value" });
        return;
      }
      if(![1-9].test(value)){
        res.json({ error: "Invalid value" });
        return;
      };
      if(puzzle.length != 81){
        res.json({error: "Expected puzzle to be 81 characters long"})
        return;
      }
      if (/[^0-9.]/g.test(puzzle)){
        res.json({ error: "Invalid characters in puzzle" });
        return;
      }

      let validCol = solver.checkColPlacement(puzzle, row, column, value);
      let validReg = solver.checkRegionPlacement(puzzle, row, column, value);
      let validRow = solver.checkRowPlacement(puzzle, row, column, value);

      let conflict = [];
      if(validCol && validReg && validRow){
        res.json({ valid: true})
      } else {
        if (!validRow) {
          conflict.push("row");
        }

        if (!validCol) {
          conflict.push("column");
        }

        if (!validReg) {
          conflict.push("region");
        }
        res.json({ valid: false, conflict: conflict})
      }
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      if(!puzzle) {
        res.json({error: "Required field missing"});
        return;
      }
      if(puzzle.length != 81){
        res.json({ error: "Expected puzzle to be 81 characters long"});
        return false;
      }
      if(/[^0-9.]/g.test(puzzle)){
        res.json({error: "Invalid characters in puzzle"});
        return false;
      }

      let solvedString = solver.solve(puzzle);
      if (!solvedString) {
        res.json({error: "Puzzle cannot be solved"})
      } else {
        res.json({ solution: solvedString })
      }

    });
};
