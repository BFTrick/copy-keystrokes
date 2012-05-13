//this script copies, in realtime, user input from one form field into another
//author: @BFTrick

(function( $ ) {
jQuery.fn.copyKeystrokes = function( options ) {
	
	// Create some defaults, extending them with any options that were provided
    var settings = $.extend( {
      'originPrefix' : 'billing',
      'destinationPrefix' : 'shipping',
	  'enableCopyingByDefault' : true,
	  'copyCheckboxWrapper' : '#copyKeyStrokesCheckboxWrapper',
	  'copyCheckboxLabelText' : 'Shipping and billing are the same',
	  'copyCheckboxId' : 'copyKeystrokeCheckbox',
	  'targetFormSelector' : '#formFoo'
    }, options);
	
	//this variable tracks the status of the checkbox
	var enableCopying = settings['enableCopyingByDefault'];
		
	//first insert the copy checkbox into the placeholder div.
	insertCopyCheckbox();
		
	//listen to the copy checkbox
	$(settings['targetFormSelector']+" #"+settings['copyCheckboxId']).change(function() {
		toggleCopyKeystrokes();
	});
	
	//set the form to copy or not copy using the default
	toggleReadOnlyOnFormElements(settings['enableCopyingByDefault']);
	
	//now put event listeners on all of the form fields
	$(settings['targetFormSelector']+" input[id^="+settings['originPrefix']+"],"+settings['targetFormSelector']+"textarea[id^="+settings['originPrefix']+"]").keyup(function() {
		copyAllInputs(); 
		//FYI I know I could copy over just the input being changed
		//but the reason I copy over all inputs every single time
		//is for auto complete functions built into the browser
	});
	$(settings['targetFormSelector']+" select[id^="+settings['originPrefix']+"]").change(function() {
		copyAllInputs(); 
	});
	
	
	function clearInputs(){
		//this function is called when a user unchecks the "copy to billing" checkbox
		//erase all of the information in the copied fields 
		
		$(settings['targetFormSelector']+" input[id^="+settings['destinationPrefix']+"],"+settings['targetFormSelector']+" select[id^="+settings['destinationPrefix']+"],"+settings['targetFormSelector']+" textarea[id^="+settings['destinationPrefix']+"]").each(function() {
			$(this).val("");;
		});
		
	}//function clearInputs
	
	
	function copyAllInputs(){
		//this function is called when a user checks the "copy to billing" checkbox
		//copy all of the data from each of the inputs over to the target inputs
		
		//first make sure copying is enabled
		if(enableCopying){
			$(settings['targetFormSelector']+" input[id^="+settings['originPrefix']+"],"+settings['targetFormSelector']+" select[id^="+settings['originPrefix']+"],"+settings['targetFormSelector']+" textarea[id^="+settings['originPrefix']+"]").each(function() {
				copyFormField(this);
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
		if(enableCopying){
			//get the value to be copied
			valueToCopy = $(fromField).val();
			
			//get the field to paste in
			var re = new RegExp(settings['originPrefix'],"g");
			destinationField = settings['destinationPrefix']+$(fromField).attr('id').replace(re, "");
			
			//copy the value to the new field
			$(settings['targetFormSelector']+" #"+destinationField).val(valueToCopy);
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
		if(settings['enableCopyingByDefault']){
			checkedByDefault="checked='checked'";
		}//if
		
		//set the checkbox HTML
		copyCheckboxHtml="<p><label class='checkbox'><input type='checkbox' name='"+settings['copyCheckboxId']+"' id='"+settings['copyCheckboxId']+"' "+checkedByDefault+" />"+settings['copyCheckboxLabelText']+"</label></p>";
		
		$(settings['targetFormSelector']+" "+settings['copyCheckboxWrapper']).html(copyCheckboxHtml);
		
	}//function insertCopyCheckbox
	
	
	function toggleCopyKeystrokes(){
		//this function is called when a user checks on the "copy to billing" checkbox
		//it will either copy all inputs, or clear them
		//it will also disable or enable the copy-to form fields
		
		//see current status and swap it
		if(enableCopying==true){
			enableCopying=false;	
		}//if
		else{
			enableCopying=true;
		}//else
		
		//modify the form accordingly
		if(enableCopying==true){
			copyAllInputs();
			toggleReadOnlyOnFormElements(enableCopying);
		}//if
		else{
			clearInputs();
			toggleReadOnlyOnFormElements(enableCopying);
		}//else
		
	}//function toggleCopyKeystrokes
	
	
	function toggleReadOnlyOnFormElements(toggleReadOnly){
		//this function disables or enables readonly all form elements with the copy-to prefix
		
		$(settings['targetFormSelector']+" input[id^="+settings['destinationPrefix']+"]").attr("readonly", toggleReadOnly);
		$(settings['targetFormSelector']+" select[id^="+settings['destinationPrefix']+"]").attr("readonly", toggleReadOnly);
		
	}//function toggleReadOnlyOnFormElements

};
})( jQuery );