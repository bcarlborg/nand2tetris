// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

// r2 = r0
// for (i = 0; i < r1; i++) {
//   temp = r2
//   r2 = temp + r0
// }


// r2 = r0
// i = 0

// while (i < r1) {
//   temp = r2
//   r2 = temp + r0
//   i++
// }



@R2
M = 0   // mem[r2] = mem[r0]

@i
M = 0

// if i == mem[r1], jump to end
(LOOP)
@i
D = M

@R1
D = D - M

@END
D;JEQ

@R2
D = M

@R0
D = M + D

@R2
M = D

@i
M = M + 1

@LOOP
0;JMP


(END)
@END
0;JMP
