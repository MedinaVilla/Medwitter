export function isControlKey(e: any) {
    // If the user gives the textbox any keyboard input, mark the input box as "dirty"
    var k = e.which;

    if (k == 20 /* Caps lock */
        || k == 16 /* Shift */
         || k == 8 /* Shift */
        || k == 9 /* Tab */
        || k == 27 /* Escape Key */
        || k == 17 /* Control Key */
        || k == 91 /* Windows Command Key */
        || k == 19 /* Pause Break */
        || k == 18 /* Alt Key */
        || k == 93 /* Right Click Point Key */
        || (k >= 35 && k <= 40) /* Home, End, Arrow Keys */
        || k == 45 /* Insert Key */
        || (k >= 33 && k <= 34) /*Page Down, Page Up */
        || (k >= 112 && k <= 123) /* F1 - F12 */
        || (k >= 144 && k <= 145)) { /* Num Lock, Scroll Lock */
        return true;
    } else return false;
}
