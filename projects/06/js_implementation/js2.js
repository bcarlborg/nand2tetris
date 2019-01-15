const fs = require('fs');

const file_stream = fs.createReadStream(process.argv[2], encoding='UTF-8');
let line_count = -1
file_stream.on( 'data', (chunk) => {
  line_count++;
  console.log("line #", line_count, chunk);
});
file_stream.on('end', () => {
  console.log("THE FILE IS EMPTY");
})
