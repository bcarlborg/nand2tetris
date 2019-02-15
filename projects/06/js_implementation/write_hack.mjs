import * as fs from 'fs';

export function write_file(asm_file_name, code_array) {
  let hack_file_name = asm_file_name.slice(0, -4) + ".hack";

  let code_string = code_array.join('\n');

  return new Promise(
    (resolve, reject) => {
      fs.writeFile(hack_file_name, code_string, (err) => {
        if (err) reject(err);
        resolve(hack_file_name);
      } )
    }
  );

}
