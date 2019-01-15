// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed.
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

@black
M = -1

@white
M = 0

(INIT)
@SCREEN
D = A

@curr
M = D

(LOOP)
  // BEGIN end of screen reinit
    @24576
    D = A

    @curr
    D = M - D

    @INIT
    D;JEQ
  // END end of screen reinit


  // BEGIN IF keypress make black
    @KBD
    D = M

    @COLORWHITE
    D;JEQ

    @black
    D = M

    @curr
    A = M
    M = D

    @curr
    M = M + 1

    @LOOP
    0;JMP

    (COLORWHITE)
    @white
    D = M

    @curr
    A = M
    M = D

    @curr
    M = M + 1

    @LOOP
    0;JMP
  //END IF KEYPRESS
