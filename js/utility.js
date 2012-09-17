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

var areColliding = function(a, b)
{
  return (a.getPosition().dist2(b.getPosition()) 
	  < Math.pow(a.getRadius() + b.getRadius(), 2));
}


function lap_around(position, half_size, boundary_size)
{
  // lap around 
  if(position.x() > canvas.width + half_size)
    position.addX(-canvas.width - half_size);
  else if(position.x() < -half_size)
    position.addX(canvas.width + half_size);

  if(position.y() > canvas.height + half_size)
    position.addY(-canvas.height - half_size);
  else if(position.y() < -half_size)
    position.addY(canvas.height + half_size);
}