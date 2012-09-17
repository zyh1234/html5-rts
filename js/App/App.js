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
The Application is the main holder class of the entire program. It updates the
model and draws to the canvas depending on its current state, and switches 
between states as nessecary. States implements specific behaviours for menu-
screens, cut-scenes and game-segements.
*/

/// CLASS ATTRIBUTES/METHODS
// singleton
App.getInstance = function()
{
  if(!this.INSTANCE)
    this.INSTANCE = new App();
  return this.INSTANCE;
}

/// INSTANCE ATTRIBUTES/METHODS
function App()
{
  /* ATTRIBUTES 
    var a = x; 
  */
  
  // receiver 
  var obj = this, typ = App;
  
  // true attributes
  var state = new LoadingScreen();

  /* METHODS 
    (obj.f = function(p1, ... ) { }
  */

  obj.update = function(delta_t)
  {
    var next_state_type = state.update(delta_t);
    if(next_state_type)
      state = new next_state_type();
  }
 
  obj.draw = function()
  {
    state.draw();
  }
  
  obj.mousebutton_event = function(which, pressed)
  {
    // check if the current state is a mouse-button event listener
    if(state.mousebutton_event)
      // pass on the event only if it is
      state.mousebutton_event(which, pressed);
  }
  
  obj.wheel_event = function(delta)
  {
    // check if the current state is a mouse-button event listener
    if(state.wheel_event)
      // pass on the event only if it is
      state.wheel_event(delta);
  }
  
  obj.keyboard_event = function(which, pressed)
  {
    // check if the current state is a mouse-button event listener
    if(state.keyboard_event)
      // pass on the event only if it is
      state.keyboard_event(which, pressed);
  }

  /* INITIALISE AND RETURN INSTANCE */
  return obj;
}