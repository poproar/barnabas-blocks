Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
  // wait
  {
    "type": "controls_wait",
    "message0": "WAIT %1 seconds %2",
    "args0": [
      {
        "type": "field_image",
        "src": "images/wait.png",
        "width": 32,
        "height": 32,
        "alt": "*",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "DELAY_TIME",
        "check": "Number",
        "align": "CENTRE"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "delay",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/time/delay/"
  },
  // repeat
  {
    "type": "controls_repeat_times",
    "message0": "%{BKY_CONTROLS_REPEAT_TITLE}",
    "args0": [{
      "type": "input_value",
      "name": "TIMES",
      "check": "Number"
    }],
    "message1": "%{BKY_CONTROLS_REPEAT_INPUT_DO} %1",
    "args1": [{
      "type": "input_statement",
      "name": "DO"
    }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 64,
    "tooltip": "%{BKY_CONTROLS_REPEAT_TOOLTIP}",
    "helpUrl": "%{BKY_CONTROLS_REPEAT_HELPURL}"
  },
  // program
  {
    "type": "controls_setup",
    "message0": "PROGRAM %1 void setup ( ) %2 void loop ( ) %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "SETUP"
      },
      {
        "type": "input_statement",
        "name": "LOOP"
      }
    ],
    "colour": 60,
    "tooltip": "",
    "helpUrl": "https://www.arduino.cc/reference/en/#stucture"
  },
  // loop do
  {
    "type": "controls_loop",
    "message0": "LOOP %1 do %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "LOOP"
      }
    ],
    "colour": 60,
    "tooltip": "",
    "helpUrl": "https://www.arduino.cc/reference/en/#stucture"
  },
  // led
  {
    "type": "lights_led",
    "message0": "LED %1 pin# %2 status %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/led.png",
        "width": 32,
        "height": 32,
        "alt": "Light Emitting Diode",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 7,
        "min": 0,
        "max": 13,
        "check": "Number",
      },
      {
        "type": "input_value",
        "name": "STATUS",
        "check": "Boolean",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": '#2dc32d',
    "tooltip": "digitalWrite",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/digital-io/digitalwrite/"
  },
  // tone
  {
    "type": "sounds_tone",
    "message0": "TONE %1 pin# %2 %3 freq %4",
    "args0": [
      {
        "type": "field_image",
        "src": "images/tone.png",
        "width": 32,
        "height": 32,
        "alt": "Buzzer",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 6,
        "min": 0,
        "max": 13
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "FREQ",
        "check": "Number",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 'ec792d',
    "tooltip": "tone",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/digital-io/tone/"
  },
  // noTone
  {
    "type": "sounds_noTone",
    "message0": "NO TONE %1 pin# %2",
    "args0": [
      {
        "type": "field_image",
        "src": "images/notone.png",
        "width": 32,
        "height": 32,
        "alt": "No Buzzer",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 6,
        "min": 0,
        "max": 13
      },
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": '#ec792d',
    "tooltip": "noTone",
    "helpUrl": "https://www.arduino.cc/reference/en/language/functions/digital-io/noTone/"
  },
  // servo
  {
    "type": "motors_servo",
    "message0": "SERVO %1 pin# %2 angle %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/servo.png",
        "width": 64,
        "height": 64,
        "alt": "Blue Motor",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 6,
        "min": 0,
        "max": 13
      },

      {
        "type": "input_value",
        "name": "DEGREE",
        "check": "Number",
        "align": "RIGHT",
        "min": 0,
        "max": 180
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230,
    "tooltip": "Move between 0~180 degree",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo"
  },
  // button
  {
    "type": "sensors_button",
    "message0": "BUTTON %1 pin# %2 status %3",
    "args0": [
      {
        "type": "field_image",
        "src": "https://www.gstatic.com/codesite/ph/images/star_on.gif",
        "width": 32,
        "height": 32,
        "alt": "Buzzer",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "PIN",
        "value": 2,
        "min": 0,
        "max": 13
      },
      {
        "type": "input_value",
        "name": "STATUS",
        "check": "Boolean",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "I am a button",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo"
  },
  // ultrasonic
  {
    "type": "sensors_sonic",
    "message0": "ULTRASONIC %1 trigger# %2 echo# %3",
    "args0": [
      {
        "type": "field_image",
        "src": "images/sonic.png",
        "width": 96,
        "height": 64,
        "alt": "Ultrasonic HS-401",
        "flipRtl": false
      },
      {
        "type": "input_value",
        "name": "ECHO",
        "value": 3,
        "min": 0,
        "max": 13
      },
      {
        "type": "input_value",
        "name": "TRIGGER",
        "value": 4,
        "min": 0,
        "max": 13,
        "align": "RIGHT"
      },
    ],
    "inputsInline": false,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 180,
    "tooltip": "Seeing with sound",
    "helpUrl": "http://www.arduino.cc/playground/ComponentLib/servo"
  },
]);

Blockly.Blocks['boolean_onoff'] = {
  init: function () {
      this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
      this.setColour('#c6a0ec');
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["On", "HIGH"], ["Off", "LOW"]]), 'BOOL')
      this.setOutput(true, 'Boolean');
      this.setTooltip('');
  }
};

Blockly.Blocks['controls_delay'] = {
  helpUrl: 'http://arduino.cc/en/Reference/delay',
  init: function () {
      this.setColour(60);
      this.appendValueInput("DELAY_TIME", 'Number')
          .appendField("delay")
          .setCheck('Number');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip('Pause instruction for specific time');
  }
};

Blockly.Blocks['boolean_hilo'] = {
  init: function () {
      this.setHelpUrl('http://arduino.cc/en/Reference/Constants');
      this.setColour('#c6a0ec');
      this.appendDummyInput()
          .appendField(new Blockly.FieldDropdown([["HIGH", "HIGH"], ["LOW", "LOW"]]), 'BOOL')
      this.setOutput(true, 'Boolean');
      this.setTooltip('');
  }
};

Blockly.Blocks['base_map'] = {
  helpUrl: 'http://arduino.cc/en/Reference/map',
  init: function () {
      this.setColour(230);
      this.appendValueInput("NUM", 'Number')
          .appendField("Map ")
          .setCheck('Number');
      this.appendValueInput("DMAX", 'Number')
          .appendField("value to [0-")
          .setCheck('Number');
      this.appendDummyInput()
          .appendField("]");
      this.setInputsInline(true);
      this.setOutput(true);
      this.setTooltip('Re-maps a number from [0-1024] to another.');
  }
};

Blockly.Blocks['serial_print'] = {
  init: function () {
      this.setHelpUrl(Blockly.Msg.SERIAL_PRINT_HELPURL);
      this.setColour(Blockly.Blocks.serial.HUE);
      this.appendValueInput("CONTENT")
          .setCheck(["Number", "String"])
          .appendField(Blockly.Msg.SERIAL_PRINT_APPENDTEXT);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setTooltip(Blockly.Msg.SERIAL_PRINT_TOOLTIP);
  }
};

Blockly.Blocks['serial_read'] = {
  init: function () {
      this.setHelpUrl(Blockly.Msg.SERIAL_READ_HELPURL);
      this.setColour(Blockly.Blocks.serial.HUE);
      this.appendDummyInput()
          .appendField(Blockly.Msg.SERIAL_READ_APPENDTEXT);
      this.setOutput(true, ["Number", "String"]);
      this.setTooltip(Blockly.Msg.SERIAL_READ_TOOLTIP);
  }
};

Blockly.Blocks['serial_byte_number'] = {
  init: function () {
      this.setHelpUrl(Blockly.Msg.SERIAL_READ_HELPURL);
      this.setColour(Blockly.Blocks.serial.HUE);
      this.appendDummyInput()
          .appendField(Blockly.Msg.SERIAL_BYTE_NUMBER_TEXT1)
          .appendField(new Blockly.FieldDropdown([["0", "48"], ["1", "49"], ["2", "50"], ["3", "51"], ["4", "52"], ["5", "53"], ["6", "54"], ["7", "55"], ["8", "56"], ["9", "57"]]), "NUM")
          .appendField(Blockly.Msg.SERIAL_BYTE_NUMBER_TEXT2);
      this.setOutput(true, "NUMBER");
      this.setTooltip(Blockly.Msg.SERIAL_READ_TOOLTIP);
  }
};

Blockly.Blocks['serial_available'] = {
  init: function () {
      this.setHelpUrl(Blockly.Msg.SERIAL_AVAILABLE_HELPURL);
      this.setColour(Blockly.Blocks.serial.HUE);
      this.appendDummyInput()
          .appendField(Blockly.Msg.SERIAL_AVAILABLE_APPENDTEXT);
      this.setOutput(true, "Number");
      this.setTooltip(Blockly.Msg.SERIAL_AVAILABLE_TOOLTIP);
  }
};

Blockly.Blocks['serial_println'] = {
  init: function () {
      this.setHelpUrl(Blockly.Msg.SERIAL_PRINTLN_HELPURL);
      this.setColour('#ccc');
      this.appendValueInput("CONTENT")
          .setCheck(["Number", "String"])
          .appendField('SERIAL print line');
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setTooltip('Blockly.Msg.SERIAL_PRINTLN_TOOLTIP');
  }
};
