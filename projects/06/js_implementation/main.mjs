import * as cleaner from './read_file.mjs';
import * as writer from './write_hack.mjs';
import * as parser2 from './parser2.mjs';



cleaner.clean_file(process.argv[2]).then(
  (result) => {
    let hack_array = parser2.reduce_symbols(result);
    return writer.write_file(process.argv[2], hack_array);
  },
  (err) => {
    console.log(err);
  }

).then(
  (result) => {console.log(result);}
);
