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
The Game is an Application state. It holds all the game objects and allows the
player to interacts with them.
*/


function Game() // extends AppState
{
  /* ATTRIBUTES 
    var a = x; 
  */
  // receiver 
  var obj = this, typ = Game;
  
  // real attributes
  var view = new Viewport(new V2(canvas.width, canvas.height)),
      map = new Map(new V2(20, 30));
  
  /* METHODS 
    (obj.f = function(p1, ... ) { }
  */
  
  // update game objects
  obj.update = function(delta_t)
  {
    // pan the view page on the keyboard direction
    if(view.pan(keyboard.direction.scalecpy(0.1*delta_t)));
  }
  
  // display a graphic while loading
  obj.draw = function()
  {
    // clear canvas
    context.fillStyle = "rgb(128, 128, 128)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // draw the contents of the Map
    map.draw(view);
    
    view.draw();
  }
  
  // pass mouse-scroll on to the viewport
  obj.wheel_event = function(delta)
  {
    view.zoom(delta * 0.1);
  }
  
  // treat mousebutton input
  obj.mousebutton_event = function(which, pressed)
  {
    if(which == mouse.LEFT && pressed)
      map.select_tile(view.localToGlobal(mouse.pos));
  }
  
  // treat keyboard input
  obj.keyboard_event = function(which, pressed)
  {
  }
}
