var COMPILE_URL="https://compile.barnabasrobotics.com"
var OTHR_URL="http://chromeduino.3mr.fr"
/**
 * Execute the user's code.
 * Just a quick and dirty eval.  No checks for infinite loops, etc.
 */
function runJS() {
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  try {
    eval(code);
  } catch (e) {
    alert('Program error:\n' + e);
  }
}

/**
 * Backup code blocks to localStorage.
 */
function backup_blocks() {
  if ('localStorage' in window) {
    var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    window.localStorage.setItem('arduino', Blockly.Xml.domToText(xml));
  }
}

/**
 * Restore code blocks from localStorage.
 */
function restore_blocks() {
  if ('localStorage' in window && window.localStorage.arduino) {
    var xml = Blockly.Xml.textToDom(window.localStorage.arduino);
    Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
  }
}

/**
* Save Arduino generated code to local file.
*/
function saveCode() {
  var fileName = window.prompt('What would you like to name your file?', 'myBlocks')
  //doesn't save if the user quits the save prompt
  if(fileName){
    var blob = new Blob([Blockly.Arduino.workspaceToCode()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, fileName + '.ino');
  }
}

/**
 * Save blocks to local file.
 * better include Blob and FileSaver for browser compatibility
 */
function save() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  var data = Blockly.Xml.domToText(xml);
  var fileName = window.prompt('What would you like to name your file?', 'myBlocks');

  // Store data in blob.
  // var builder = new BlobBuilder();
  // builder.append(data);
  // saveAs(builder.getBlob('text/plain;charset=utf-8'), 'blockduino.xml');
  console.log("saving blob");
  if(fileName){
    var blob = new Blob([data], {type: 'text/xml'});
    saveAs(blob, fileName + ".xml");
  } 
}

/**
 * Load blocks from local file.
 */
function load(event) {
  var files = event.target.files;
  // Only allow uploading one file.
  if (files.length != 1) {
    return;
  }

  // FileReader
  var reader = new FileReader();
  reader.onloadend = function(event) {
    var target = event.target;
    // 2 == FileReader.DONE
    if (target.readyState == 2) {
      try {
        var xml = Blockly.Xml.textToDom(target.result);
      } catch (e) {
        alert('Error parsing XML:\n' + e);
        Materialize.toast(Blockly.Msg.ERROR_PARSING_XML + ':\n' + e);
        //alert('Error parsing XML:\n' + e);
        return;
      }
      var count = Blockly.mainWorkspace.getAllBlocks().length;
      if (count && confirm(Blockly.Msg.REPLACE_TEXT1 + '\n' +Blockly.Msg.REPLACE_TEXT2)) {
        Blockly.mainWorkspace.clear();
      }
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
    // Reset value of input after loading because Chrome will not fire
    // a 'change' event if the same file is loaded again.
    document.getElementById('load').value = '';
  };
  reader.readAsText(files[0]);
}

function flashHex() {
  let hex = `
  :100000000C9434000C9446000C9446000C9446006A
  :100010000C9446000C9446000C9446000C94460048
  :100020000C9446000C9446000C9446000C94460038
  :100030000C9446000C9446000C9446000C94460028
  :100040000C9448000C9446000C9446000C94460016
  :100050000C9446000C9446000C9446000C94460008
  :100060000C9446000C94460011241FBECFEFD8E03C
  :10007000DEBFCDBF21E0A0E0B1E001C01D92A930FC
  :10008000B207E1F70E9492000C94DC000C9400008F
  :100090001F920F920FB60F9211242F933F938F93BD
  :1000A0009F93AF93BF938091050190910601A0911A
  :1000B0000701B09108013091040123E0230F2D378F
  :1000C00020F40196A11DB11D05C026E8230F02965C
  :1000D000A11DB11D20930401809305019093060199
  :1000E000A0930701B0930801809100019091010154
  :1000F000A0910201B09103010196A11DB11D809351
  :10010000000190930101A0930201B0930301BF91FC
  :10011000AF919F918F913F912F910F900FBE0F90B4
  :100120001F901895789484B5826084BD84B58160F1
  :1001300084BD85B5826085BD85B5816085BD8091B2
  :100140006E00816080936E0010928100809181002A
  :100150008260809381008091810081608093810022
  :10016000809180008160809380008091B1008460E4
  :100170008093B1008091B00081608093B000809145
  :100180007A00846080937A0080917A008260809304
  :100190007A0080917A00816080937A0080917A0061
  :1001A000806880937A001092C100C0E0D0E0209770
  :0C01B000F1F30E940000FBCFF894FFCF99
  :00000001FF`;
  let hexstring = document.getElementById('content_hex').innerHTML;
  fixHex(hex);
}

/**
 * Discard all blocks from the workspace.
 */
function discard() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 || window.confirm(Blockly.Msg.DELETE_ALL1 + count + Blockly.Msg.DELETE_ALL2)) {
    Blockly.mainWorkspace.clear();
    renderContent();
  }
}

/*
 * auto save and restore blocks
 */
function auto_save_and_restore_blocks() {
  // Restore saved blocks in a separate thread so that subsequent
  // initialization is not affected from a failed load.
  window.setTimeout(restore_blocks, 0);
  // Hook a save function onto unload.
  bindEvent(window, 'unload', backup_blocks);
  tabClick(selected);

  // Init load event.
  var loadInput = document.getElementById('load');
  loadInput.addEventListener('change', load, false);
  document.getElementById('fakeload').onclick = function() {
    loadInput.click();
  };
}

/**
 * Bind an event to a function call.
 * @param {!Element} element Element upon which to listen.
 * @param {string} name Event name to listen to (e.g. 'mousedown').
 * @param {!Function} func Function to call when event is triggered.
 *     W3 browsers will call the function with the event object as a parameter,
 *     MSIE will not.
 */
function bindEvent(element, name, func) {
  if (element.addEventListener) {  // W3C
    element.addEventListener(name, func, false);
  } else if (element.attachEvent) {  // IE
    element.attachEvent('on' + name, func);
  }
}

//loading examples via ajax
var ajax;
function createAJAX() {
  if (window.ActiveXObject) { //IE
    try {
      return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        return new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
        return null;
      }
    }
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

function onSuccess() {
  if (ajax.readyState == 4) {
    if (ajax.status == 200) {
      try {
      var xml = Blockly.Xml.textToDom(ajax.responseText);
      } catch (e) {
        alert('Error parsing XML:\n' + e);
        return;
      }
      var count = Blockly.mainWorkspace.getAllBlocks().length;
      if (count && confirm('Replace existing blocks?\n"Cancel" will merge.')) {
        Blockly.mainWorkspace.clear();
      }
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    } else {
      alert("Server error");
    }
  }
}

function load_by_url(uri) {
  ajax = createAJAX();
  if (!ajax) {
    alert ('Not compatible with XMLHttpRequest');
    return 0;
  }
  if (ajax.overrideMimeType) {
    ajax.overrideMimeType('text/xml');
  }

  ajax.onreadystatechange = onSuccess;
  ajax.open ("GET", uri, true);
  ajax.send ("");
}

function uploadCode(code, callback) {
    var target = document.getElementById('content_arduino');
    var spinner = new Spinner().spin(target);

    var url = COMPILE_URL + "/compile";
    var method = "POST";

    // You REALLY want async = true.
    // Otherwise, it'll block ALL execution waiting for server response.
    var async = true;

    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if (request.readyState != 4) { 
            return; 
        }
        
        spinner.stop();

        var data=JSON.parse(request.responseText);
        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        var errorInfo = null;
        console.log("status: ",status);
        console.log(data);
        switch (status) {
        case 200:
            status = data.success ? 201 : 204;
            errorInfo = data.success ? data.stdout : data.stderr;
            // consider using axios and repairing the return data if an error we need the error.
            // document.getElementById('content_hex').innerHTML = atob(data.hex);
            
            // hexfile = "";
            // buffer = atob(data.hex).split("\n");
            // for(x = 0; x < buffer.length; x++) {
            //     size = parseInt(buffer[x].substr(1,2),16);
            //     console.log('size = '+size);
            //     if(size == 0) {
            //         console.info('size is 0');
            //         return;
            //     }
            //     for(y = 0; y < (size * 2); y = y + 2){
            //         // console.log(buffer[x].substr(y+9,2));
            //         hexfile += String.fromCharCode(parseInt(buffer[x].substr(y+9,2),16));
            //     }
            // }
            break;
        case 0:
            errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
            break;
        case 400:
            errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
            break;
        case 500:
            errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
            break;
        case 501:
            errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
            break;
        default:
            errorInfo = "code " + status + "\n\nUnknown error.";
            break;
        };
        
        callback(status, errorInfo);
    };

    request.open(method, url, async);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(encodeURI("sketch="+code+"&board=arduino:avr:nano:cpu=atmega328"));	     
}

function uploadClick() {
    // var code = Blockly.Arduino.workspaceToCode();
    var code = document.getElementById("content_arduino").value;
    // console.info(code);

    uploadCode(code, function(status, errorInfo) {
        if (status == 201) {
          let icon = '<i class="material-icons" style="font-size:48px;color:green">check_circle</i>';
          let output = `<pre>${errorInfo}</pre>`;
          document.getElementById("arduino-msg").innerHTML= icon + output;
          $('#arduino_return').openModal();

            // console.log('show upload button if hex code is not null');
        } else if (status == 204){
          let regex = /\/tmp\/chromeduino\-(.*?)\/chromeduino\-(.*?)\.ino\:/g;
          let icon = '<i class="material-icons" style="font-size:48px;color:red">error</i>';
          let message = errorInfo.replace(regex, "");
          let output = `<pre>${message}</pre>`;
          document.getElementById("arduino-msg").innerHTML= icon + output;
          $('#arduino_return').openModal();
        } else {
          alert("Error uploading program: " + errorInfo);
      }
    });
}

function editText() {
  var textarea = document.getElementById("content_arduino");
  var editBtn = document.getElementById("edit-button");

  if (textarea.readOnly)
  {
    editBtn.classList.toggle("red-text");
    textarea.readOnly = false;
  }
  else {
    editBtn.classList.toggle("red-text");
    textarea.readOnly = true;
  }
}

function resetClick() {
    var code = "void setup() {} void loop() {}";

    uploadCode(code, function(status, errorInfo) {
        if (status != 200) {
            alert("Error resetting program: " + errorInfo);
        }
    });
}

Blockly.Blocks['arduino_setup'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('void setup()');
    this.appendStatementInput("voidSetup");
    this.appendDummyInput()
        .appendField('void loop()');
    this.appendStatementInput("voidLoop");
    this.setTooltip('');
    this.setHelpUrl('https://www.arduino.cc/reference/en/#stucture');
    this.setDeletable(true);
  }
};

Blockly.Arduino['arduino_setup'] = function(block) {
  var statements_setup = Blockly.Arduino.statementToCode(block, 'voidSetup');
  var statements_loop = Blockly.Arduino.statementToCode(block, 'voidLoop');
 
  Blockly.Arduino.setups_['setup'] = statements_setup;
 
  var code = statements_loop;
  return code;
};

Blockly.Blocks['servo_move'] = {
  helpUrl: 'http://www.arduino.cc/playground/ComponentLib/servo',
  init: function() {
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.SERVO_Servo)
        .appendField(new Blockly.FieldImage(Blockly.Blocks.servo.image, 64, 64))
        .appendField(Blockly.Msg.PIN)
        .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.appendValueInput('DEGREE', 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.SERVO_ANGLE_TEXT1);
    this.appendValueInput('DELAY_TIME', 'Number')
        .setCheck('Number')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.TIMES_DELAY_APPENDTEXT);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Move between 0~180 degree');
  }
};

Blockly.Arduino['servo_move'] = function(block) {
  var dropdown_pin = this.getFieldValue('PIN');
  var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
  //value_degree = value_degree.replace('(','').replace(')','')
  var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
  //delay_time = delay_time.replace('(','').replace(')','');

  Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
  Blockly.Arduino.definitions_['var_servo'+dropdown_pin] = 'Servo servo_'+dropdown_pin+';\n';
  Blockly.Arduino.setups_['setup_servo_'+dropdown_pin] = 'servo_'+dropdown_pin+'.attach('+dropdown_pin+');\n';

  var code = 'servo_'+dropdown_pin+'.write('+value_degree+');\n'+'delay(' + delay_time + ');\n';
  return code;
};

Blockly.Blocks['noTone'] = {
  init: function() {
    this.setHelpUrl(Blockly.Msg.INOUT_TONE_HELPURL);
    this.setColour(Blockly.Blocks.inout.HUE);
    this.appendDummyInput()
      .appendField("noTone")
      .appendField(new Blockly.FieldDropdown(profile.default.digital), "PIN");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip("set tone off for pin");
  }
};

Blockly.Arduino.noTone = function() {
  var value_pin = this.getFieldValue('PIN');
  var code = 'noTone(' + value_pin + ');\n';
  return code;
};

Blockly.Blocks['forever'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Forever ∞');
    this.appendStatementInput("voidLoop");
    this.setTooltip('');
    this.setHelpUrl('https://www.arduino.cc/reference/en/#stucture');
    this.setDeletable(true);
  }
};

Blockly.Arduino['forever'] = function(block) {
  var statements_loop = Blockly.Arduino.statementToCode(block, 'voidLoop');
  
  var code = statements_loop;
  return code;
};