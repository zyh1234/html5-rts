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

/* LAUNCH THE APPLICATION */

var prev_tick = this_tick = (new Date()).getTime();
function update_loop()
{
  // deal with timing
  prev_tick = this_tick;
  this_tick = (new Date()).getTime();
  
  if(canvas.focus)
  {
    // update the Application
    App.getInstance().update(this_tick - prev_tick);
    
    // redraw the Application
    App.getInstance().draw();
    
    // repeat this function after a short delay
    setTimeout(update_loop, 1000 / canvas.MAX_FPS.focus);
  }
  else
  {
    // repeat this function after a somewhat longer delay
    setTimeout(update_loop, 1000 / canvas.MAX_FPS.sleep);
  }
}
update_loop();
