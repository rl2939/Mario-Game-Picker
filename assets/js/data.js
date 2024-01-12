/* 
NOTES for testing:
The original: Super Mario Bros.
I liked the sequel better: Super Mario Bros. 2
Super Mario Bros. 3: Super Mario Bros. 3
Super Mario World: Super Mario World
Original: New Super Mario Bros.
Sequel: New Super Mario Bros. 2
Wii: New Super Mario Bros. Wii
WiiU: New Super Mario Bros. U
*/

var data = {
    'init': ['What artstyle do you like?','Pixel','3d-Models'],
    'Pixel': ['Earlier games or Later Games?','Early NES','Late NES-SNES'],
    'Early NES': ['How early?', 'The original', 'I liked the sequel better'],
    'Late NES-SNES': ['Okay, but which one?','Super Mario Bros. 3', 'Super Mario World'],
    '3d-Models': ['Handheld or console?','Handheld','Console'],
    'Handheld': ['Original or Sequel?','Original','Sequel'],
    'Console': ['Wii or WiiU','Wii','WiiU'],
    
    'The original': ['Super Mario Bros.','assets/img/Super_Mario_Bros._box.png'],
    'I liked the sequel better': ['Super Mario Bros. 2','assets/img/Super_Mario_Bros_2.jpg'],
    'Super Mario Bros. 3': ['Super Mario Bros. 3','assets/img/Super_Mario_Bros._3_coverart.png'],
    'Super Mario World': ['Super Mario World','assets/img/Super_Mario_World_Coverart.png'],
    'Original': ['New Super Mario Bros.','assets/img/NewSuperMarioBrothers.jpg'],
    'Sequel': ['New Super Mario Bros. 2','assets/img/New_Super_Mario_Bros._2_box_artwork.png'],
    'Wii': ['New Super Mario Bros. Wii','assets/img/NewSuperMarioBrosWiiBoxart.png'],
    'WiiU': ['New Super Mario Bros. U','assets/img/New_Super_Mario_Bros._U_box_art.png']
}

/*
This is a bonus set of data, rename the var below to "data" to see this in action
This set has data that can loop around itself
Some items have more than 2 choices
There is also 'pick the background image' as a choice
*/

var data2 = {
    'init': ['Select init for loop', '0', 'init'],
    '0': ['What artstyle do you like?','1','2','3','6','pick the background image'],
    '1': ['Earlier games or Later Games?','3','4'],
    '3': ['How early?', 'The original', 'I liked the sequel better','3'],
    '4': ['Okay, but which one?','Super Mario Bros. 3', 'Super Mario World','3','4'],
    '2': ['Handheld or console?','5','6'],
    '5': ['Original or Sequel?','Original','Sequel','5'],
    '6': ['Wii or WiiU','Wii','WiiU','5','6'],
    
    'The original': ['Super Mario Bros.','assets/img/Super_Mario_Bros._box.png'],
    'I liked the sequel better': ['Super Mario Bros. 2','assets/img/Super_Mario_Bros_2.jpg'],
    'Super Mario Bros. 3': ['Super Mario Bros. 3','assets/img/Super_Mario_Bros._3_coverart.png'],
    'Super Mario World': ['Super Mario World','assets/img/Super_Mario_World_Coverart.png'],
    'Original': ['New Super Mario Bros.','assets/img/NewSuperMarioBrothers.jpg'],
    'Sequel': ['New Super Mario Bros. 2','assets/img/New_Super_Mario_Bros._2_box_artwork.png'],
    'Wii': ['New Super Mario Bros. Wii','assets/img/NewSuperMarioBrosWiiBoxart.png'],
    'WiiU': ['New Super Mario Bros. U','assets/img/New_Super_Mario_Bros._U_box_art.png'],
    'pick the background image': ['Background image,','assets/img/bg.png']
}