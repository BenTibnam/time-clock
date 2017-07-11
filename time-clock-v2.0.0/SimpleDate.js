/* Contains the following date information
 * month, day, year, hour, minute, second
 */

function SimpleDate(){
	info = {};
	info.month = null;
	info.day = null;
	info.year = null;
	info.monthDisplay = null;
	info.hour = null;
	info.minute = null;
	info.second = null;
	info.hourDisplay = null;
	info.minuteDisplay = null;
	info.secondDisplay = null;
	info.timeOfDay = null;
	info.displayTime = null;
	info.displayDate = null;
	info.html = null;
	
	
	info.getDisplayMonth = function(currentMonth){
		let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
		return months[currentMonth];
	}
	
	info.getTimeUnitDisplay = function(unitValue){
		return (unitValue.toString().length == 1) ? '0' + unitValue.toString() : unitValue.toString(); 
	}
	
	info.updateIntergalValues = function(date){
		info.month = date.getMonth();
		info.day = date.getDate();
		info.year = date.getYear() + 1900;
		info.hour = date.getHours();
		info.minute = date.getMinutes();
		info.second = date.getSeconds();
	}
	
	info.updateDisplayValues = function(date){
		info.monthDisplay = info.getDisplayMonth(date.getMonth());
		info.hourDisplay = info.getTimeUnitDisplay((date.getHours() > 12) ? date.getHours()-12 : date.getHours());
		info.minuteDisplay = info.getTimeUnitDisplay(date.getMinutes());
		info.secondDisplay = info. getTimeUnitDisplay(date.getSeconds());
		info.timeOfDay = (date.getHours() > 12 || date.getHours() == 12 && date.getMinutes() > 0) ? "PM" : "AM";
		info.displayTime = info.hourDisplay + ":" + info.minuteDisplay + ":" + info.secondDisplay + " " + info.timeOfDay;
		info.displayDate = info.monthDisplay + ", " + info.day + " " + info.year; 
	}
	
	info.test = function(){
		console.log("Time: " + info.displayTime + "\n");
		console.log("Date: " + info.displayDate);
	}
	
	info.draw = function(){
		info.html = document.createElement("DIV");
		info.html.id = "date-container";
		
		let dateInfo = document.createElement("P")
		dateInfo.className = "date-element";
		dateInfo.id = "date";
		dateInfo.innerHTML = info.displayDate;
		info.html.appendChild(dateInfo);
		
		let timeInfo = document.createElement("P");
		timeInfo.className = "date-element";
		timeInfo.id = "time";
		timeInfo.innerHTML = info.displayTime;
		info.html.appendChild(timeInfo);
		
		return info.html;
		
	}
	
	info.update = function(){
		let currentDate = new Date();
		info.updateIntergalValues(currentDate);
		info.updateDisplayValues(currentDate);
		info.draw();
		document.body.appendChild(info.html);
	}
	

	info.update();
	
	// this.interval = setInterval(info.update, 500);

}
