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
The LoadingScreen is an Application state. It draw some kind of loading-screen
graphic and when queried returns change_state : false unless all resources 
are loaded into memory.
*/


function LoadingScreen() // extends AppState
{
  /* ATTRIBUTES 
    var a = x; 
  */
  // receiver 
  var obj = this, typ = LoadingScreen;
  
  /* METHODS 
    (obj.f = function(p1, ... ) { }
  */
  
  obj.update = function(delta_t)
  {
    if(left_to_load > 0)
      // stay in this AppState until all required resources are loaded
      return null;
    else 
      // launch the application proper only when ready
      return MainMenu; 
  }
  
  // display a graphic while loading
  obj.draw = function()
  {
    console.log("wtf");
    
    // clear canvas
    context.fillStyle = "rgb(100, 50, 200)";
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // draw "loading" text
    context.fillStyle = "rgb(255, 255, 255)";
    context.font = "48pt monospace";
    context.textAlign = "center";
    context.textBaseline = "middle";
    var percent_loaded = 100 - Math.round((left_to_load/total_to_load)*100);
    context.fillText("Loading " + percent_loaded + "%",
		      canvas.width/2, canvas.height/2);
  }
}
