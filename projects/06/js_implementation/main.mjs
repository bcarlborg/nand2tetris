import * as cleaner from './read_file.mjs';


cleaner.clean_file(process.argv[2]).then((result) => console.log(result));

// console.log("cleaner", cleaner.code_array);
