/////////////////////////////////////
//
// Copy Keystrokes
//
/////////////////////////////////////


/////////////////////////////////////
// Description
/////////////////////////////////////

Copy Keystrokes is a small jQuery plugin that automatically copies keystrokes, on the fly, from one text field into another.


/////////////////////////////////////
// Credits
/////////////////////////////////////

Author: Patrick Rauland (@BFTrick)


/////////////////////////////////////
// Installion & Configuration
/////////////////////////////////////

To install you should include the script file into your html document. Something like this:
<script src="jquery.copy-keystrokes.js"></script>

Add a placeholder div in your form for the 'foo and bar are the same' checkbox:
<div id="copyKeyStrokesCheckboxWrapper"></div>

Now initialize it:
var options;
$("#formFoo").copyKeystrokes( options );

You can include any number of options to configure the plugin.

originPrefix : The ID prefix on elements that you wish to be copied. Default is 'billing',
destinationPrefix : The ID prefix on elements that you wish should have information duplicated. Default is 'shipping',
enableCopyingByDefault : The default state of the plugin. True means you want the plugin to copy by default. False means you don't want the plugin to copy by default. Default is true.
copyCheckboxWrapper : The selector of the checkbox wrapper. Default is '#copyKeyStrokesCheckboxWrapper',
copyCheckboxLabelText : The label text of the checkbox label. Default it 'Shipping and billing are the same',
copyCheckboxId : The ID of the checkbox. You probably only need to change this if you already have used this ID. Default is 'copyKeystrokeCheckbox',
targetFormSelector : The selector of the forms you wish to target. Default is '#formFoo'

ex.
options = { 
  	"enableCopyingByDefault" : false,
    "targetFormSelector" : "billingShippingForm"
};