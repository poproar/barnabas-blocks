
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
  