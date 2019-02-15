import * as fs from 'fs';

// const file_path = process.argv[2];
// const file_contents = fs.readFile(file_path, 'UTF-8', reduce_to_simple_code);


export function clean_file(file_path) {
  return get_file_text(file_path).then(
    (file_text) => {
      return reduce_to_simple_code(file_text);
    },
    (err) => {throw err}
  );
}

function get_file_text(file_path) {
  return new Promise(
    (resolve, reject) => {
      fs.readFile(file_path, 'UTF-8', (err, data) => {
        if (err) reject(err);
        resolve(data);
      })
    }
  );
}
function reduce_to_simple_code(file_text) {
  let code_array = file_text.split("\n");
  code_array = clear_complete_line_comments(code_array);
  code_array = clear_in_line_comments(code_array);
  code_array = clear_blank_lines(code_array);
  code_array = clear_white_space(code_array);
  return code_array
}

function clear_complete_line_comments(code_array) {
  const comments_removed = code_array.filter((line) => !(/^\/\//).test(line));
  return comments_removed;
}

function clear_in_line_comments(code_array) {
  const r_inline_comment = /\/\/.*\s*.*$/
  return code_array.map((line) => line.replace(r_inline_comment, ''));
}

function clear_blank_lines(code_array) {
  const r_white_line = /^[\s]+$/;
  const whtie_lines_removed = code_array.filter((line) => {
    return !(r_white_line.test(line))
  });

  const r_empty_line = /^\B$/;
  const blank_lines_removed = whtie_lines_removed.filter((line) => {
    return !(r_empty_line.test(line))
  });

  return blank_lines_removed;
}

function clear_white_space(code_array) {
  return code_array.map((line) => {
    return line.replace(/\s/g, '');
  })
}
