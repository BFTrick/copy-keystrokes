//this script copies, in realtime, user input from one form field into another

var ckFromPrefix="billing";
var ckToPrefix="shipping";
var enableCopyingByDefault=true;

$(document).ready(function() {
	
	//first insert some HTML into the placeholder div.
	if(enableCopyingByDefault){
		insertCopyCheckbox();
	}//if
	
	//now put event listeners on all of the input fields
	$("input[id^="+ckFromPrefix+"]").keyup(function() {
    	copyInput(this);
	});
	
	
});

function clearInput(){
	//this function is called when a user unchecks the "copy to billing" checkbox
	//erase all of the information in the copied fields 
	
	//TODO
	
}//function clearInput

function copyInput(fromField){
	//this function copies one input field to another
	
	//get the value to be copied
	valueToCopy = $(fromField).val();
	
	//get the field to paste in
	var re = new RegExp(ckFromPrefix,"g");
	destinationField = ckToPrefix+$(fromField).attr('id').replace(re, "");
	
	//copy the value over
	$("#"+destinationField).val(valueToCopy);
	
}//copyInput

function copyAllInputs(){
	//this function is called when a user checks on the "copy to billing" checkbox
	//copy all of the data from each of the inputs over to the target inputs
	
	//TODO
	
}

function insertCopyCheckbox(){
	//this function inserts HTML into the placeholder div
	
	//TODO
	
}//function insertCopyCheckbox