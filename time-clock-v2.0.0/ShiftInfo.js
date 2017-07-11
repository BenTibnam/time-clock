function ShiftInfo(){
	info = {}
	
	info.date = new SimpleDate();
	
	info.update = function(){
		info.date = new SimpleDate();
	}	
}
