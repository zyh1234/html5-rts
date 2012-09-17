/** @author William J.D. **/

/*
HTML5 base code
Copyright (C) 2012 William James Dyce

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
The MainMenu is an Application state. It draws the main menu screen and allows
for navigation to other states (menus) based on player input.
*/


function MainMenu() // extends AppState
{
  /* ATTRIBUTES 
    var a = x; 
  */
  // receiver 
  var obj = this, typ = MainMenu;
  
  // true attributes
  var next_state = null;
  
  /* METHODS 
    (obj.f = function(p1, ... ) { }
  */
  
  obj.update = function(delta_t)
  {
    return next_state;
  }
  
  // display a graphic while loading
  obj.draw = function()
  {
    // clear canvas
    context.fillStyle = "rgb(200, 50, 100)";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  // handle mouse-button events
  obj.mousebutton_event = function(which, pressed)
  {
    if(pressed && which === mouse.LEFT)
      next_state = Game;
  }
}
