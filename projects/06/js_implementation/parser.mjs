
import * as fs from 'fs';

// const file_path = process.argv[2];
// const file_contents = fs.readFile(file_path, 'UTF-8', reduce_to_simple_code);

const predefinied_symbol_table = {
  '~NEXTAVAILABLE': 16,
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576,
}

export function reduce_to_assembly(code_array) {
  let symbol_table = Object.assign({}, predefinied_symbol_table);

  initialize_symbol_table(symbol_table, code_array);
  let symbols_replaced = replace_symbols(symbol_table, code_array);
  console.log(symbols_replaced);
}

function replace_symbols(symbol_table, code_array) {
  let output = [];
  output = code_array.map((line) => {
    let is_not_label_or_var = (!(line[0] === '(' || line[0] === '@'));
    if (is_not_label_or_var) return line;


    let variable = line.slice(1);
    let var_is_not_label = (variable[0] !== '(')
    let var_is_integer = (Number.isInteger(parseInt(variable)));

    if (var_is_integer && var_is_not_label) {
      let bin_addr_str = number_to_bin_addr_str(variable);
      return '@' + bin_addr_str;
    }
    else if (var_is_not_label) {
      let num_var = symbol_table[variable];
      console.log("IN MAP:", variable, num_var);
      return '@' + num_var;
    }
  })
  return output;
}


function initialize_symbol_table(symbol_table, code_array) {
  let count = 0, i = 0;

  while (i < code_array.length) {
    let curr_line = code_array[i]

    if (curr_line[0] === '(') {
      let symbol = curr_line.slice(1,-1);
      symbol_table[symbol] = count + 1;
    }

    else if (curr_line[0] === '@') {
      count++;
      let variable = curr_line.slice(1);

      let var_is_not_integer = (!(Number.isInteger(parseInt(variable))));
      let var_not_in_symbol_table = !(variable in symbol_table)

      if (var_not_in_symbol_table && var_is_not_integer) {
        symbol_table[variable] = symbol_table['~NEXTAVAILABLE'];
        symbol_table['~NEXTAVAILABLE']++;
      }
    }
    else {
      count++;
    }
    i++;
  }
}


function number_to_bin_addr_str(_number) {
  let pad='000000000000000'
  let bin_number = _number.toString(2);
  return pad.slice(bin_number.length) + bin_number;
}
