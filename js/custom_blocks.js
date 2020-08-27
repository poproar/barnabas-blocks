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
    Blockly.Arduino.loop_ = statements_loop;
   
    var code = ''; // statements_loop;
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