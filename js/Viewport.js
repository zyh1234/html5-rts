/** @author William J.D. **/

/*
RTS game.
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
The Viewport is a zoomable viewp to visualise RTS games with. It can be
paned as well, and contains useful functions for detecting what geometric 
objects are inside.
*/

/// INSTANCE ATTRIBUTES/METHODS
function Viewport(size) 
{
  /* ATTRIBUTES 
    var a = x; 
  */
  
  // receiver 
  var obj = this, typ = Viewport;
  
  // real attributes
  var area = new Rect(V2.ORIGIN, size),
      zoom = new Bank(1.0, 2.0, 0.5);
    
  
  /* METHODS 
    (obj.f = function(p1, ... ) { }
  */
  
  // query
  obj.getZoom = function() { return zoom; }
  obj.getArea = function() { return area; }

  obj.globalToLocal = function(pos) 
  {
    return new V2().fromV2(pos).subV2(area.pos()).scale(zoom.getBalance());
  }
  
  obj.localToGlobal = function(pos)
  {
    return new V2().fromV2(pos).scalecpy(1.0/zoom.getBalance()).addV2(area.pos());
  }

  obj.containsPoint = function(pos) 
  {
    return area.containsV2(pos);
  }
  
  // modification
  obj.reset = function()
  {
    area.setPosV2(V2.ORIGIN);
    area.setWH(canvas.width, canvas.height);
    zoom.setBalance(1.0);
  }
  
  obj.pan = function(v)
  {
    area.addV2(v.scalecpy(1.0 / zoom.getBalance()));
  }
  
  obj.zoom = function(amount)
  {
    var mouse_true = obj.localToGlobal(mouse.pos),
    mouse_rel = new V2(mouse.pos.x()/canvas.width, mouse.pos.y()/canvas.height);
    	    
    // reset zoom counter, don't zoom too much
    zoom.deposit(amount * zoom.getBalance());
   
    // perform the zoom -- resize first
    area.setWH(canvas.width/zoom.getBalance(), canvas.height/zoom.getBalance());  
  
    // perform the zoom -- reposition second, using the new size!
    area.setXY(mouse_true.x() - area.w()*mouse_rel.x(),
	      mouse_true.y() - area.h()*mouse_rel.y());  
  }
  
  obj.draw = function()
  {
    context.lineWidth = 15;
    var mouse_true = obj.localToGlobal(mouse.pos),
    mouse_rel = new V2(mouse.pos.x()/canvas.width, mouse.pos.y()/canvas.height);
    
    
    context.strokeRect((mouse_true.x() - area.x())*zoom.getBalance() - area.w()*mouse_rel.x()*0.5, 
			(mouse_true.y() - area.y())*zoom.getBalance() - area.h()*mouse_rel.y()*0.5,
			area.w()*0.5,
			area.h()*0.5);
  }
}