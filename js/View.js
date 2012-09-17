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
The View is a graphical interface to visualise RTS games with. It can be
paned as well, and contains useful functions for detecting what geometric 
objects are inside.
*/

/// INSTANCE ATTRIBUTES/METHODS
function View(size, boundary_size) 
{
  /* ATTRIBUTES 
    var a = x; 
  */
  
  // receiver 
  var obj = this, typ = View;
  
  // real attributes
  var field = new Rect(V2.ORIGIN, size),
      boundary = new Rect(V2.ORIGIN, boundary_size),
      zoom = new Bank(1.0, 2.0, Math.min(canvas.width/boundary.w(), 
					 canvas.height/boundary.h())+0.0001);
  
  /* SUBROUTINES 
  var f = function(p1, ... ) { } 
  */
  
  var keepInsideBounds = function()
  {
    var overlap = field.getOverlap(boundary);
    
    // pan view to keep within borders
    
    // pan view to keep within borders -- left/right
    console.log(overlap.x());
    if(overlap.x() < 0)
    {
      // left
      if(field.x() < boundary.x())
	field.setX(boundary.x());
      // right
      else if(field.endx() > boundary.endx())
	field.setX(boundary.endx()-field.w());
    }
    else if(overlap.x() > 0)
      field.setX(boundary.x() - overlap.x()*0.5);
    
    // pan view to keep within borders -- top/bottom
    if(overlap.y() < 0)
    {
      // top
      if(field.y() < boundary.y())
	field.setY(boundary.y());
      // bottom
      else if(field.endy() > boundary.endy())
	field.setY(boundary.endy()-field.h());
    }
    else if(overlap.y() > 0)
      field.setY(boundary.y() - overlap.y()*0.5);
  }
  
  var updateFieldFromZoom = function(mouse_true)
  {
    // get the mouse position as a fraction of the canvas-size
    var mouse_rel = new V2(mouse.pos.x()/canvas.width, 
			   mouse.pos.y()/canvas.height);
    	    
    // perform the zoom -- resize first
    field.setWH(canvas.width/zoom.getBalance(), canvas.height/zoom.getBalance());  
    // perform the zoom -- reposition second, using the new size!
    field.setXY(mouse_true.x() - field.w()*mouse_rel.x(),
	      mouse_true.y() - field.h()*mouse_rel.y());  
	      
    // if we've strayed beyond the bounds move back inside them
    keepInsideBounds();
  }
  
  /* METHODS 
    (obj.f = function(p1, ... ) { }
  */
  
  // query
  obj.getZoom = function() { return zoom; }
  obj.getField = function() { return field; }

  obj.globalToLocal = function(pos) 
  {
    return new V2().fromV2(pos).subV2(field.pos()).scale(zoom.getBalance());
  }
  
  obj.localToGlobal = function(pos)
  {
    return new V2().fromV2(pos).scalecpy(1.0/zoom.getBalance()).addV2(field.pos());
  }

  obj.containsPoint = function(pos) 
  {
    return field.containsV2(pos);
  }
  
  // modification
  obj.reset = function()
  {
    field.setPosV2(V2.ORIGIN);
    field.setWH(canvas.width, canvas.height);
    zoom.setBalance(1.0);
  }
  
  obj.pan = function(v)
  {
    // move the view based on the vector and the zoom value
    field.addV2(v.scalecpy(1.0 / zoom.getBalance()));
    
    // if we've strayed beyond the bounds move back inside them
    keepInsideBounds();
  }
  
  obj.addZoom = function(amount)
  {
    // get the global position of the mouse *before* changing the zoom value
    var mouse_true = obj.localToGlobal(mouse.pos);
    // reset zoom and change view accordingly
    zoom.deposit(amount * zoom.getBalance());
    updateFieldFromZoom(mouse_true);
  }
  
  obj.setZoom = function(amount)
  {
    // get the global position of the mouse *before* changing the zoom value
    var mouse_true = obj.localToGlobal(mouse.pos);
    // reset zoom and change view accordingly
    zoom.setBalance(amount);
    updateFieldFromZoom()
  }
}