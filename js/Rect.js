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
A simple rectangle class with various useful accessors and mutators.
*/

/// INSTANCE ATTRIBUTES/METHODS
function Rect(init_pos, init_size)
{
  /* ATTRIBUTES 
    var a = x; 
  */
  
  // receiver 
  var obj = this, typ = Rect;
  
  // true attributes
  var x, y, 		// real: coordinates
      w, h;		// real: size
  
  /* SUBROUTINES 
  var f = function(p1, ... ) { } 
  */
    
  /* METHODS 
  (obj.f = function(p1, ... ) { }
  */
  
  // accessors
  obj.x = function() { return x; }
  obj.y = function() { return y; }
  obj.w = function() { return w; }
  obj.h = function() { return h; }
  obj.pos = function() { return new V2(x, y); }
  obj.size = function() { return new V2(w, h); }
  
  // query
  obj.containsXY = function(px, py)
  {
    return (px >= x && py >= y && px <= x+w && py <= y+h);
  }
  
  obj.containsV2 = function(v)
  {
    return obj.containsXY(v.x(), v.y());
  }
  
  obj.intersectsLine = function(start, end) 
  {
    // discard useless states
    if(Math.min(start.x(), end.x()) > area.x()+area.w() 
    || Math.max(start.x(), end.x()) < area.x())
	return false;
    if(Math.min(start.y(), end.y()) > area.y()+area.h() 
    || Math.max(start.y(), end.y()) < area.y())
	return false;
    
    // otherwise it's all good!
    return true;
  }
  
  // mutators
  // mutators -- position
  obj.setXY = function(new_x, new_y)
  {
    x = new_x;
    y = new_y;
    return obj;
  }
  obj.setX = function(new_x)
  {
    obj.setXY(new_x, y);
    return obj;
  }
  obj.setY = function(new_y)
  {
    obj.setXY(x, new_y);
    return obj;
  }
  obj.setPosV2 = function(v)
  {
    obj.setXY(v.x(), v.y());
    return obj;
  }
  // mutators -- size
  obj.setWH = function(new_w, new_h)
  {
    w = new_w;
    h = new_h;
    return obj;
  }
  obj.setW = function(new_w)
  {
    obj.setWH(new_w, h);
    return obj;
  }
  obj.setH = function(new_h)
  {
    obj.setXY(w, new_h);
    return obj;
  }
  obj.setSizeV2 = function(v)
  {
    obj.setWH(v.x(), v.y());
    return obj;
  }
  // mutators -- position and size
  obj.setXYWH = function(x, y, w, h)
  {
    obj.setXY(x,y);
    obj.setWH(w,h);
  }
  obj.fromRect = function(r)
  {
    obj.setXYWH(r.x(), r.y(), r.w(), r.h());
  }
  
  // modification relative to current state
  obj.addX = function(amount)
  {
    obj.setXY(x + amount, y);
    return obj;
  }
  obj.addY = function(amount)
  {
    obj.setXY(x, y + amount);
    return obj;
  }
  obj.addXY = function(amount_x, amount_y)
  {
    obj.setXY(x + amount_x, y + amount_y);
    return obj;
  }
  obj.addV2 = function(v)
  {
    obj.setXY(x + v.x(), y + v.y());
    return obj;
  }
  obj.subV2 = function(v)
  {
    obj.setXY(x - v.x(), y - v.y());
    return obj;
  }  
  obj.scale = function(amount)
  {
    w *= amount;
    h *= amount;
    return obj;
  }
  
  // printing, for debugging
  obj.toString = function()
  {
    return ('(' + x + ',' + y + ',' + w + ',' + h +')');
  }
  
  /* INITIALISE AND RETURN INSTANCE */
  if(init_pos)
  {
    x = init_pos.x();
    y = init_pos.y();
  }
  if(init_size)
  {
    w = init_size.x();
    h = init_size.y();
  }
  return obj;
}