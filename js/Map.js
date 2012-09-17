/** @author William J.D. **/

/*
RTS game
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
The map contains a grid of tiles (eg. grass, water) and units (eg. soldiers, 
workers). 
*/

/// CLASS ATTRIBUTES/FUNCTIONS
// size
Map.TILE_SIZE = 32;
Map.TILE_HALF_SIZE = Map.TILE_SIZE / 2;
Map.TILE_INV_SIZE = 1 / Map.TILE_SIZE;
// units
Map.NO_UNIT = -1;
// tiles
Map.GROUND = 0;
Map.WATER = 1;

/// INSTANCE ATTRIBUTES/METHODS
function Map(size)
{
  /* ATTRIBUTES 
    var a = x; 
  */
  
  // receiver 
  var obj = this, typ = Map;
  
  // 
  var grid = new Array(size.y());
  for(var row = 0; row < size.y(); row++)
  {
    grid[row] = new Array(size.x());
    for(var col = 0; col < size.y(); col++)
      grid[row][col] = { tile: rand_amongst( [typ.GROUND, typ.WATER ] ), 
			 unit: typ.NO_UNIT, selected : false };
  }
  
  /* SUBROUTINES 
  var f = function(p1, ... ) { } 
  */
    
  /* METHODS 
  (obj.f = function(p1, ... ) { }
  */
  
  // utility
  obj.posToCell = function(pos)
  {
    // convert from coordinates to grid-space and reject invalid values
    var grid_pos = pos.scalecpy(typ.TILE_INV_SIZE).floor();
    if(grid_pos.y() >= grid.length || grid_pos.x() >= grid[0].length 
    || grid_pos.x() < 0 || grid_pos.y() < 0)
	return undefined;
    else
      return grid[grid_pos.y()][grid_pos.x()];
  }
  
  // accessors 
  
  // mutators
  obj.select_tile = function(pos)
  {
    var cell = obj.posToCell(pos);
    if(cell)
      cell.selected = !cell.selected;
  }
  
  // update
  obj.draw = function(view)
  {
    const area = view.getArea(), zoom = view.getZoom().getBalance(),
	  min = { 
		  row : Math.max(0, Math.floor(area.y()*Map.TILE_INV_SIZE)), 
		  col : Math.max(0, Math.floor(area.x()*Map.TILE_INV_SIZE)) 
		},
	  max = { 
		  row : Math.min(grid.length, 
			  Math.ceil(min.row + area.h()*Map.TILE_INV_SIZE) + 1), 
		  col : Math.min(grid[0].length, 
			  Math.ceil(min.col + area.w()*Map.TILE_INV_SIZE) + 1)
		 };
    
    for(var row = Math.max(0, min.row); 
	row < Math.min(grid.length, max.row); row++)
    for(var col = Math.max(0, min.col); 
	col < Math.min(grid[row].length, max.col); col++)
    {
      var cell = grid[row][col];
      // draw tile -- setup context
      context.fillStyle = (cell.tile == typ.GROUND) 
			    ? "rgb(50, 255, 50)" 
			    : "rgb(50, 50, 255)";
      context.lineWidth = (cell.selected) ? 5 : 1;
      // draw tile
      var pos = view.globalToLocal(new V2(col*typ.TILE_SIZE, row*typ.TILE_SIZE));
      context.fillRect(pos.x(), pos.y(), 
		       zoom*typ.TILE_SIZE, zoom*typ.TILE_SIZE);
      context.strokeRect(pos.x(), pos.y(), 
			 zoom*typ.TILE_SIZE, zoom*typ.TILE_SIZE);		    
			    
      // draw debug text
      pos.addXY(typ.TILE_HALF_SIZE*zoom, typ.TILE_HALF_SIZE*zoom);
      var text_size = Math.max(Math.min(zoom*8, 16), 4);
      context.font = text_size + "pt monospace";

      context.textAlign = "center";
      context.fillStyle = "rgb(0,0,0)";
      context.fillText(col+","+row, pos.x(), pos.y());
    }    
  }
  
  /* INITIALISE AND RETURN INSTANCE */
  return obj;
}