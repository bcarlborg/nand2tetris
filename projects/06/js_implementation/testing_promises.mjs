import * as fs from 'fs';

function getData(file_path) {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(file_path, 'UTF-8', (err, data) => {
        // it seems like the only reason we have two seperate functions is to allow for
        if (err) reject(err); // this will set the state from pending to resolved-- will also set the result to something
        resolve(data); // this will set the sate from pending to rejected -- will also set the result to something else
      });
    }
  );
}

// I still don't understand what the resolve function is and what the reject function is.

let result = getData(process.argv[2]).then(
  (cat) => {console.log("FROM THEN: RESOLVE --", cat.length)}, // This first functiong gets run when the state changes from pending to resolved
  // once this is called, the result gets passed as an argument to the function
  (dog) => {console.log("FROM THEN: REJECT --", dog)} // This function gets run when the state changes from pending to rejected
  // once this is called, the result gets passed as an argument to the function

);

console.log("result", result.state);
