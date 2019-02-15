import * as builtin from './builtins.mjs';



export function reduce_symbols(code_array) {
  let symbol_table = Object.assign({}, builtin.predefinied_symbol_table);
  let output_code = [];

  // console.log("=============================");
  // console.log(code_array);

  output_code = reduce_labels(code_array, symbol_table);
  // console.log("=============================");
  // console.log(output_code);

  output_code = reduce_variables(output_code, symbol_table);
  // console.log("=============================");
  // console.log(output_code);

  output_code = reduce_c_instructions(output_code, symbol_table);

  // console.log("=============================");
  // console.log(output_code);

  return output_code;
}

function reduce_labels(code_array, symbol_table) {
  let output_code = [];

  for (let i = 0, count = 0; i < code_array.length; i++) {
    let curr_line = code_array[i];

    let is_label = (curr_line[0] === "(");

    if (is_label) {
      let variable = curr_line.slice(1,-1);
      symbol_table[variable] = count;
    }

    else {
      output_code = output_code.concat(curr_line);
      count++;
    }
  }

  return output_code;
}


function reduce_variables(code_array, symbol_table) {
  let output_code = [];

  for (let i = 0; i < code_array.length; i++) {
    let curr_line = code_array[i];
    let is_variable = (curr_line[0] === "@");

    if (is_variable) {
      let variable = curr_line.slice(1);
      let is_defined = (variable in symbol_table)

      if (is_defined) {
        let new_line = "0" + num_to_15_bit_str(symbol_table[variable]);
        output_code = output_code.concat(new_line);
      }

      else {
        let variable_is_number = Number.isInteger(parseInt(variable));
        let new_line = ""
        if (variable_is_number) {
          new_line = "0" + num_to_15_bit_str(parseInt(variable));
        }
        else {
          symbol_table[variable] = symbol_table['~NEXTAVAILABLE'];
          symbol_table['~NEXTAVAILABLE']++;

          new_line = "0" + num_to_15_bit_str(symbol_table[variable]);
        }

        output_code = output_code.concat(new_line);
      }
    }
    else {
      output_code = output_code.concat(curr_line);
    }
  }

  return output_code;
}


function reduce_c_instructions(code_array, symbol_table) {
  let output_code = [];

  for (let i = 0; i < code_array.length; i++) {
    let curr_line = code_array[i];

    let is_variable = /^[01]*$/.test(curr_line);
    let is_c_instruction = (!is_variable);

    if (is_c_instruction) {
      output_code = output_code.concat(parse_c_instruction(curr_line));
    }
    else {
      output_code = output_code.concat(curr_line);
    }
  }
  return output_code;
}







//
// export function reduce_symbols(code_array) {
//   let symbol_table = Object.assign({}, builtin.predefinied_symbol_table);
//   let output_code = []
//
//   for (let i = 0, count = 0; i < code_array.length; i++) {
//     let curr_line = code_array[i];
//
//     let is_label = (curr_line[0] === "(");
//     let is_variable = (curr_line[0] === "@");
//     let is_c_instruction = (!is_label && !is_variable);
//
//     if (is_label) {
//       let variable = curr_line.slice(1,-1);
//
//       symbol_table[variable] = count;
//     }
//
//     else if (is_variable) {
//       let variable = curr_line.slice(1);
//       let is_defined = (variable in symbol_table)
//
//       if (is_defined) {
//         let new_line = "0" + num_to_15_bit_str(symbol_table[variable]);
//         output_code = output_code.concat(new_line);
//       }
//
//       else {
//         let variable_is_number = Number.isInteger(parseInt(variable));
//
//
//         let new_line = ""
//         if (variable_is_number) {
//           new_line = "0" + num_to_15_bit_str(parseInt(variable));
//         }
//         else {
//           symbol_table[variable] = symbol_table['~NEXTAVAILABLE'];
//           symbol_table['~NEXTAVAILABLE']++;
//
//           new_line = "0" + num_to_15_bit_str(symbol_table[variable]);
//         }
//
//         output_code = output_code.concat(new_line);
//       }
//
//       count++;
//     }
//
//     else if (is_c_instruction) {
//       output_code = output_code.concat(parse_c_instruction(curr_line));
//       count++;
//     }
//   }
//
//   return output_code;
// }


function parse_c_instruction(instruction) {
  let instr_obj = instruction_obj(instruction);
  return instr_obj;
 }


function instruction_obj(instruction) {
  let output = {}

  let desitnation_match = instruction.match(/^\S+=/);
  if (desitnation_match) {
    output.dest = desitnation_match[0].slice(0, -1);

  }
  else {
   output.dest = null;
  }

  let dest_comp_match = instruction.match(/\=[0-9A-Z+\-!&|]+/);
  let comp_jump_match = instruction.match(/^[0-9A-Z+\-!&|];+/);

  if (dest_comp_match) {
    output.comp = dest_comp_match[0].slice(1); // =somethingf
  }
  else if (comp_jump_match) {
    output.comp = comp_jump_match[0].slice(0,-1); //
  }


  let jump_match = instruction.match(/;[A-Z]*$/)
  if (jump_match) {
    output.jump = jump_match[0].slice(1);
  }
  else {
    output.jump = null;
  }

  return c_to_bin(output);
}


function c_to_bin(instruction_obj) {
  let initial_bits = "111"

  let comp_bits = ""
  if (instruction_obj.comp) {
    comp_bits = builtin.comp_to_bin[instruction_obj.comp];
  }

  let dest_bits = ""
  if (instruction_obj.dest) {
    dest_bits = builtin.dest_to_bin[instruction_obj.dest];
  }
  else {
    dest_bits = builtin.dest_to_bin["empty"];
  }

  let jump_bits = ""
  if (instruction_obj.jump) {
    jump_bits = builtin.jump_to_bin[instruction_obj.jump];
  }
  else {
    jump_bits = builtin.jump_to_bin["empty"];
  }

  return initial_bits + comp_bits + dest_bits + jump_bits
}


export function num_to_15_bit_str(_num) {
  let pad = "000000000000000";
  let bin_str = _num.toString(2);
  return pad.slice(bin_str.length) + bin_str;
}
