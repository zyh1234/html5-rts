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
Many game objects will have resources such as ammunition, hitpoints or mana, 
with values that must be kept with a certain interval (most often positive).
Acessors and mutators ensure that we don't add or subtract more than we should
be able to, returning the amount successfully deposited or withdrawn.
*/

/// INSTANCE ATTRIBUTES/METHODS
function Bank(starting_balance, max_balance, min_balance)
// NB - max is after min as min is rarely needed
{
  /* ATTRIBUTES 
    var a = x; 
  */
  
  // handles to provide C-style scoping
  var obj = this, typ = Bank;
  
  // other attributes
  var balance = (starting_balance == undefined ? 0.0 : starting_balance),
      max = (max_balance == undefined ? 1.0 : max_balance),
      min = (min_balance == undefined ? 0.0 : min_balance);
  
  /* SUBROUTINES 
  var f = function(p1, ... ) { } 
  */

  /* PUBLIC METHODS 
  obj.f = function(p1, ... ) { } 
  */
  
  // query
  obj.getBalance = function() { return balance; }
  obj.isEmpty = function() { return (balance == min); }
  obj.isFull = function() { return (balance == max); }
  
  // modification
  obj.withdraw = function(amount)
  {
    if(amount < 0)
      return obj.deposit(-amount);
    
    if(balance - amount >= min)
      balance -= amount;
    else
    {
      amount = balance - min;
      balance = min;
    }
    // return the amount that was withdrawn
    return amount;
  }
  
  obj.deposit = function(amount)
  {
    if(amount < 0)
      return obj.withdraw(-amount);
    
    if(balance + amount <= max)
      balance += amount;
    else
    {
      amount = max - balance;
      balance = max;
    }
    // return the amount that was deposited
    return amount;
  }
  
  obj.setBalance = function(amount)
  {
    if(amount > max)
      balance = max;
    else if(amount < min)
      balance = min;
    else
      balance = amount;
  }
  
  obj.setFull = function()
  {
    return obj.deposit(max);
  }
  
  obj.setEmpty = function()
  {
    return obj.withdraw(max);
  }
  
  /* INITIALISE AND RETURN INSTANCE */
}