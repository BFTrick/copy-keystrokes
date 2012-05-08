//this script copies, in realtime, user input from one form field into another

var ckFromPrefix="billing";
var ckToPrefix="shipping";
var ckEnableCopyingByDefault=true;
var ckEnableCopying=ckEnableCopyingByDefault;
var ckCopyCheckboxWrapper="#copyCheckboxWrapper";
var ckCopyCheckboxLabelText="Shipping and billing are the same";
var ckCopyCheckboxId="copyKeystrokeCheckbox";

$(document).ready(function() {
	
	//first insert the copy checkbox into the placeholder div.
	insertCopyCheckbox();
		
	//listen to the copy checkbox
	$("#"+ckCopyCheckboxId).change(function() {
		toggleCopyKeystrokes();
	});
	
	//set the form to copy or not copy using the default
	toggleReadOnlyOnFormElements(ckEnableCopyingByDefault);
	
	//now put event listeners on all of the form fields
	$("input[id^="+ckFromPrefix+"], textarea[id^="+ckFromPrefix+"]").keyup(function() {
    	copyAllInputs(); 
		//FYI I know I could copy over just the input being changed
		//but the reason I copy over all inputs every single time
		//is for auto complete functions built into the browser
	});
	$("select[id^="+ckFromPrefix+"]").change(function() {
    	copyAllInputs(); 
	});
	
});


function clearInputs(){
	//this function is called when a user unchecks the "copy to billing" checkbox
	//erase all of the information in the copied fields 
	
	$("input[id^="+ckToPrefix+"], select[id^="+ckToPrefix+"], textarea[id^="+ckToPrefix+"]").each(function() {
		$(this).val("");;
	});
	
}//function clearInputs


function copyAllInputs(){
	//this function is called when a user checks the "copy to billing" checkbox
	//copy all of the data from each of the inputs over to the target inputs
	
	//first make sure copying is enabled
	if(ckEnableCopying){
		$("input[id^="+ckFromPrefix+"], select[id^="+ckFromPrefix+"], textarea[id^="+ckFromPrefix+"]").each(function() {
			copyFormField(this);
			console.log(this);
		});
		return true;
	}//if
	else{
		return false;
	}//else
	
}//function copyAllInputs


function copyFormField(fromField){
	//this function copies one form field to another
	
	//first make sure copying is enabled
	if(ckEnableCopying){
		//get the value to be copied
		valueToCopy = $(fromField).val();
		
		//get the field to paste in
		var re = new RegExp(ckFromPrefix,"g");
		destinationField = ckToPrefix+$(fromField).attr('id').replace(re, "");
		
		//copy the value to the new field
		$("#"+destinationField).val(valueToCopy);
		return true;
	}//if
	else{
		return false;
	}//else
	
}//function copyFormField


function insertCopyCheckbox(){
	//this function inserts HTML into the placeholder div
	
	//see if we want it checked by default
	checkedByDefault="";
	if(ckEnableCopyingByDefault){
		checkedByDefault="checked='checked'";
	}//if
	
	//set the checkbox HTML
	copyCheckboxHtml="<p><label class='checkbox'><input type='checkbox' name='"+ckCopyCheckboxId+"' id='"+ckCopyCheckboxId+"' "+checkedByDefault+" />"+ckCopyCheckboxLabelText+"</label></p>";
	
	$(ckCopyCheckboxWrapper).html(copyCheckboxHtml);
	
}//function insertCopyCheckbox


function toggleCopyKeystrokes(){
	//this function is called when a user checks on the "copy to billing" checkbox
	//it will either copy all inputs, or clear them
	//it will also disable or enable the copy-to form fields
	
	//see current status and swap it
	if(ckEnableCopying==true){
		ckEnableCopying=false;	
	}//if
	else{
		ckEnableCopying=true;
	}//else
	
	//modify the form accordingly
	if(ckEnableCopying==true){
		copyAllInputs();
		toggleReadOnlyOnFormElements(ckEnableCopying);
	}//if
	else{
		clearInputs();
		toggleReadOnlyOnFormElements(ckEnableCopying);
	}//else
	
}//function toggleCopyKeystrokes


function toggleReadOnlyOnFormElements(toggleReadOnly){
	//this function disables or enables readonly all form elements with the copy-to prefix
	
	$("input[id^="+ckToPrefix+"]").attr("readonly", toggleReadOnly);
	$("select[id^="+ckToPrefix+"]").attr("readonly", toggleReadOnly);
	
}//function toggleReadOnlyOnFormElements