
rm ../asm_files/Add.hack; node --experimental-modules main.mjs ../asm_files/Add.asm
rm ../asm_files/Rect.hack; node --experimental-modules main.mjs ../asm_files/Rect.asm
rm ../asm_files/Max.hack; node --experimental-modules main.mjs ../asm_files/Max.asm;
rm ../asm_files/Pong.hack; node --experimental-modules main.mjs ../asm_files/Pong.asm;

cd ../asm_files/
rm project6.zip
zip project6 *.hack prog.txt

cd ../js_implementation
