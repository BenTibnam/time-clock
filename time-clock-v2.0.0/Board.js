function Break(time, sName){
	var _minTime = time;
	var _name = sName;
	var _taken = false;
	
	this.getName = function(){
		return _name;
	}
	
	this.getTime= function(){
		return _minTime;
	}
	
	this.isBreakTaken = function(){
		return _taken;
	}
	
	this.setTaken = function(status){
		_taken = status;
	}
}

function Board(breakContainer){
	if(typeof breakContainer != "object" || breakContainer.push == undefined || breakContainer[0].getName == undefined) throw "BadBreakContainerType"; // Some error checking to make sure we get an array with breaks
	
	var _breaks = breakContainer;
	var _html = null;
	var _onbreak = false;
	var _currentBreak = null;
	
	this.add = function(newBreak){
		_breaks.push(newBreak)
	}
	
	this.remove = function(breakName){
		let breakContainerBuff = [];
		let currentBreak = null;
		
		for(var i = 0; i < _breaks.length; i++){
			currentBreak = _breaks[i];
			
			if(currentBreak.getName() == breakName){
				continue;
			}
			
			_breaks.push(currentBreak);
		}
	}
	
	this.changeTakenStatus = function(breakName, status){
		for(var i = 0; i < _breaks.length; i++){
			if(_breaks[i].getName() == breakName){
				_breaks[i].setTaken(status);
				return;
			}
		}	
	}
	
	this.takeBreak = function(breakName){
		changeTakenStatus(breakName, 2);
		_currentBreak = breakName;
	}
	
	this.comeOffBreak = function(breakname){
		changeTakenStatus(breakName, true);
		_currentBreak = null;
	}
	
	this.refreshHTML = function(){
		_html = document.createElement("DIV");
		_html.id = "board-container";
		
		for(var i = 0; i < _breaks.length; i++){
			let currentBreak = _breaks[i];
			let widget = document.createElement("P");
			
			widget.className = "board-element";
			widget.id = "board-element-" + i;
			widget.addEventListener("click", function(){takeBreak(currentBreak.getName());}
			widget.innerHTML = currentBreak.getName();
			_html.appendChild(widget);
		}
	}
	
	this.draw = function(container){
		if(container.appendChild == undefined) throw "BadContainerType";
		container.appendChild(_html);
	}
}
