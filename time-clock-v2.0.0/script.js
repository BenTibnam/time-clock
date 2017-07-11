var getMonthString = function(int_month){
	var string_month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return string_month[int_month];
}

var updateInterval, shiftInfo = null;


function ShiftInfo(hourlyWageBuff){
	var startingDate = new Date(); // Used for initialization, will be undefined after init
	employee = {}
	
	// Starting Date
	employee.s_date_hour = startingDate.getHours();
	employee.s_date_minute = startingDate.getMinutes();
	employee.s_date_seconds = startingDate.getSeconds();
	employee.s_date_milli = startingDate.getMilliseconds();
	employee.s_date_month = startingDate.getMonth();
	employee.s_date_day = startingDate.getDate();
	employee.s_date_year = startingDate.getYear() + 1900; // if 2017, getYear() == 117. To bring it to readable date add 1900 to get 2017
	
	// Current Date(starts with starting date info
	employee.c_date_hour = employee.s_date_hour;
	employee.c_date_minute = employee.s_date_minute;
	employee.c_date_seconds = employee.s_date_seconds;
	employee.c_date_milli = employee.s_date_milli;
	employee.c_date_month = employee.s_date_month;
	employee.c_date_day = employee.s_date_day;
	employee.c_date_year = employee.s_date_year;
	
	// Ending Date
	employee.e_date_hour = null;
	employee.e_date_minute = null;
	employee.e_date_second = null;
	employee.e_date_milli = null;
	employee.e_date_month = null;
	employee.e_date_day = null;
	employee.e_date_year = null;
	
	// Other data
	employee.hourly_wage = parseInt(hourlyWageBuff);
	employee.money_earned = 0;
	employee.minutes_worked = 0;
	employee.l_date_hour = this.s_date_hour - 1;
	
	employee.draw = function(){
		// Drawing time
		let hourContainer = document.getElementById("hour-container"), minuteContainer = document.getElementById("minute-container"), secondContainer = document.getElementById("second-container");
		let timeOfDay = (employee.c_date_hour > 12 || employee.c_date_hour == 12 && employee.c_date_minute > 0) ? "PM" : "AM";
		let hourBuff = (employee.c_date_hour >= 13) ? employee.c_date_hour - 12 : employee.c_date_hour;
		
		hourContainer.innerHTML = "Time: " + (hourBuff.toString().length < 2) ? "0" + hourBuff + ":" : hourBuff + ":";
		minuteContainer.innerHTML = (employee.c_date_minute.toString().length < 2) ? "0" + employee.c_date_minute + ":" : employee.c_date_minute + ":";
		secondContainer.innerHTML = (employee.c_date_seconds.toString().length < 2) ? "0" + employee.c_date_seconds + " " +timeOfDay : employee.c_date_seconds + " " +timeOfDay; // Makes it look like HH:MM:SS PM
		
		// Drawing date
		let monthContainer = document.getElementById("month-container"), dayContainer = document.getElementById("day-container"), yearContainer = document.getElementById("year-container");
		monthContainer.innerHTML = "Date: "+getMonthString(employee.c_date_month) + ", ";
		dayContainer.innerHTML = employee.c_date_day + " ";
		yearContainer.innerHTML = employee.c_date_year; 
		 
		
		// Draw Stats
		let timeWorkedContainer = document.getElementById("time-worked-container"), moneyEarnedContainer = document.getElementById("money-earned-container");
		let hoursWorked = Math.floor(employee.minutes_worked/60); // Gets just the hours worked based on how many minutes are worked
		let minutesWorked = employee.minutes_worked % 60; // Gets minutes worked 
		timeWorkedContainer.innerHTML = "Hours Worked: " + hoursWorked + "." + (minutesWorked.toString()[0]);
		
		let money_str = employee.money_earned.toString();
		moneyEarnedContainer.innerHTML = "Money Earned: $" + money_str.substring(0,4); 
		
	}
	
		
	employee.update = function(){ // will be called every second
		let buff_date = new Date()
		employee.c_date_hour = buff_date.getHours();
		employee.c_date_minute = buff_date.getMinutes();
		employee.c_date_seconds = buff_date.getSeconds();
		employee.c_date_milli = buff_date.getMilliseconds();
		employee.c_date_month = buff_date.getMonth();
		employee.c_date_day = buff_date.getDate();
		employee.c_date_year = buff_date.getYear() + 1900;
		employee.money_earned += (employee.hourly_wage / 60) / 60; /* money/per second since updates every second */
		console.log(employee.money_earned);
		employee.minutes_worked = employee.money_earned / (employee.hourly_wage / 60);
		employee.draw();
	}
	
	
	employee.clockOut = function(){
		employee.e_date_hour = employee.c_date_hour;
		employee.e_date_minute = employee.c_date_minute;
		employee.e_date_second = employee.c_date_second;
		employee.e_date_milli = employee.c_date_milli;
		employee.e_date_month = employee.c_date_month;
		employee.e_date_day = employee.c_date_day;
		employee.e_date_year = employee.c_date_year;
		employee.money_earned += (employee.hourly_wage / 60) / 60;
		employee.draw();
		clearInterval(updateInterval);
	}
	
	updateInterval = setInterval(employee.update, 1000);
	
}

var clockIn = function(){
	let wageBuff = document.getElementById("hourly-wage-input");
	let inputContainer = document.getElementById("clock-in-container");
	let isNumber = !isNaN(parseInt(wageBuff.value));
	
	console.log(isNumber)
	
	if(isNumber){
		shiftInfo = new ShiftInfo(wageBuff.value);
		inputContainer.innerHTML = "<input type = \"button\" value = \"clock out\" id = \"clock-out\"/>";
		document.getElementById("clock-out").addEventListener("click", function(){employee.clockOut();});
	}else{
		wageBuff.placeholder = "No wage entered, please try again...";
		wageBuff.value = ""; 
	}	
}

document.getElementById("clock-in-container").innerHTML = "<input type=\"text\" placeholder=\"Enter Hourly Wage\" id=\"hourly-wage-input\"/><input type=\"button\" value=\"clock-in\" onclick=\"clockIn()\"/>";
