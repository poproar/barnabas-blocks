/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview JavaScript for Blockly's Code demo.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';


/**
 * Create a namespace for the application.
 */
var Code = {};

Code.COMPILE_URL = "https://compile.barnabasrobotics.com"
/**
 * Lookup for names of supported languages.  Keys should be in ISO 639 format.
 */
Code.LANGUAGE_NAME = {
  'en': 'English',
  // 'es': 'Español'
};

/**
 * List of RTL languages.
 */
Code.LANGUAGE_RTL = ['ar', 'fa', 'he', 'lki'];

/**
 * Blockly's main workspace.
 * @type {Blockly.WorkspaceSvg}
 */
Code.workspace = null;

/**
 * Extracts a parameter from the URL.
 * If the parameter is absent default_value is returned.
 * @param {string} name The name of the parameter.
 * @param {string} defaultValue Value to return if parameter not found.
 * @return {string} The parameter value or the default value if not found.
 */
Code.getStringParamFromUrl = function (name, defaultValue) {
  var val = location.search.match(new RegExp('[?&]' + name + '=([^&]+)'));
  return val ? decodeURIComponent(val[1].replace(/\+/g, '%20')) : defaultValue;
};

/**
 * Get the language of this user from the URL.
 * @return {string} User's language.
 */
Code.getLang = function () {
  var lang = Code.getStringParamFromUrl('lang', '');
  if (Code.LANGUAGE_NAME[lang] === undefined) {
    // Default to English.
    lang = 'en';
  }
  return lang;
};

/**
 * Get the board of this user from the URL.
 * @return {string} User's board.
 */
Code.getBoard = function () {
  var board = window.localStorage.board;
  if (board === undefined || board == null || board === "") {
    // Default to nano.
    board = 'nano';
    localStorage.setItem('board',board);
  }
  return board;
};

/**
 * Get the board of this user from the URL.
 * @return {string} User's board.
 */
Code.getLesson = function () {
  let lesson = localStorage.getItem('lesson');
  if (lesson === undefined || lesson == null || lesson === "") {
    // Default to bot.
    lesson = 'bot';
    localStorage.setItem('lesson', lesson);
  }
  return lesson;
};

/**
 * Is the current language (Code.LANG) an RTL language?
 * @return {boolean} True if RTL, false if LTR.
 */
Code.isRtl = function () {
  return Code.LANGUAGE_RTL.indexOf(Code.LANG) != -1;
};

/**
 * Load blocks saved on App Engine Storage or in session/local storage.
 * @param {string} defaultXml Text representation of default blocks.
 */
Code.loadBlocks = function (defaultXml) {
  try {
    var loadOnce = window.sessionStorage.loadOnceBlocks;
  } catch (e) {
    // Firefox sometimes throws a SecurityError when accessing sessionStorage.
    // Restarting Firefox fixes this, so it looks like a bug.
    var loadOnce = null;
  }
  if ('BlocklyStorage' in window && window.location.hash.length > 1) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    BlocklyStorage.retrieveXml(window.location.hash.substring(1));
  } else if (loadOnce) {
    // Language switching stores the blocks during the reload.
    delete window.sessionStorage.loadOnceBlocks;
    var xml = Blockly.Xml.textToDom(loadOnce);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if (defaultXml) {
    // Load the editor with default starting blocks.
    var xml = Blockly.Xml.textToDom(defaultXml);
    Blockly.Xml.domToWorkspace(xml, Code.workspace);
  } else if ('BlocklyStorage' in window) {
    // Restore saved blocks in a separate thread so that subsequent
    // initialization is not affected from a failed load.
    window.setTimeout(BlocklyStorage.restoreBlocks, 0);
  }
};

/**
 * Save the blocks and reload with a different language.
 */
Code.changeLanguage = function () {
  // Store the blocks for the duration of the reload.
  // MSIE 11 does not support sessionStorage on file:// URLs.
  if (window.sessionStorage) {
    var xml = Blockly.Xml.workspaceToDom(Code.workspace);
    var text = Blockly.Xml.domToText(xml);
    window.sessionStorage.loadOnceBlocks = text;
  }

  var languageMenu = document.getElementById('languageMenu');
  var newLang = encodeURIComponent(
    languageMenu.options[languageMenu.selectedIndex].value);
  var search = window.location.search;
  if (search.length <= 1) {
    search = '?lang=' + newLang;
  } else if (search.match(/[?&]lang=[^&]*/)) {
    search = search.replace(/([?&]lang=)[^&]*/, '$1' + newLang);
  } else {
    search = search.replace(/\?/, '?lang=' + newLang + '&');
  }

  window.location = window.location.protocol + '//' +
    window.location.host + window.location.pathname + search;
};

/**
 * Changes the output language by clicking the tab matching
 * the selected language in the codeMenu.
 */
Code.changeCodingLanguage = function () {
  var codeMenu = document.getElementById('code_menu');
  Code.tabClick(codeMenu.options[codeMenu.selectedIndex].value);
}

/**
 * Bind a function to a button's click event.
 * On touch enabled browsers, ontouchend is treated as equivalent to onclick.
 * @param {!Element|string} el Button element or ID thereof.
 * @param {!Function} func Event handler to bind.
 */
Code.bindClick = function (el, func) {
  if (typeof el == 'string') {
    el = document.getElementById(el);
  }
  el.addEventListener('click', func, true);
  el.addEventListener('touchend', func, true);
};

/**
 * Load the Prettify CSS and JavaScript.
 */
Code.importPrettify = function () {
  var script = document.createElement('script');
  script.setAttribute('src', 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js');
  document.head.appendChild(script);
};

/**
 * Compute the absolute coordinates and dimensions of an HTML element.
 * @param {!Element} element Element to match.
 * @return {!Object} Contains height, width, x, and y properties.
 * @private
 */
Code.getBBox_ = function (element) {
  var height = element.offsetHeight;
  var width = element.offsetWidth;
  var x = 0;
  var y = 0;
  do {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent;
  } while (element);
  return {
    height: height,
    width: width,
    x: x,
    y: y
  };
};

/**
 * User's language (e.g. "en").
 * @type {string}
 */
Code.LANG = Code.getLang();

/**
 * User's Board (e.g. "nano").
 * @type {string}
 */
Code.BOARD = Code.getBoard();

/**
 * User's Lesson (e.g. "Racer").
 * @type {string}
 */
Code.LESSON = Code.getLesson();

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'arduino', 'monitor', 'xml'];

/**
 * List of tab names with casing, for display in the UI.
 * @private
 */
Code.TABS_DISPLAY_ = [
  'Blocks', 'Arduino', 'Serial Monitor', 'XML'
];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function (clickedName) {
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').classList.contains('tabon')) {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
        window.confirm(MSG['badXml'].replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Code.workspace.clear();
      Blockly.Xml.domToWorkspace(xmlDom, Code.workspace);
    }
  }

  if (document.getElementById('tab_blocks').classList.contains('tabon')) {
    Code.workspace.setVisible(false);
  }
  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    var tab = document.getElementById('tab_' + name);
    tab.classList.add('taboff');
    tab.classList.remove('tabon');
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = clickedName;
  var selectedTab = document.getElementById('tab_' + clickedName);
  selectedTab.classList.remove('taboff');
  selectedTab.classList.add('tabon');
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
    'visible';
  Code.renderContent();
  // The code menu tab is on if the blocks tab is off.
  var codeMenuTab = document.getElementById('tab_code');
  if (clickedName == 'blocks') {
    Code.workspace.setVisible(true);
    codeMenuTab.className = 'taboff';
  } else {
    codeMenuTab.className = 'tabon';
  }
  // Sync the menu's value with the clicked tab value if needed.
  var codeMenu = document.getElementById('code_menu');
  for (var i = 0; i < codeMenu.options.length; i++) {
    if (codeMenu.options[i].value == clickedName) {
      codeMenu.selectedIndex = i;
      break;
    }
  }
  Blockly.svgResize(Code.workspace);
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function () {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Code.workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_arduino') {
    Code.attemptCodeGeneration(Blockly.Arduino);
  }
  if (typeof PR == 'object') {
    PR.prettyPrint();
  }
  var btnMonitor = document.getElementById('monitorButton');
  btnMonitor.style.display = (content.id == 'content_monitor') ? "":"none";
};

/**
 * Attempt to generate the code and display it in the UI, pretty printed.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.attemptCodeGeneration = function (generator) {
  var content = document.getElementById('content_' + Code.selected);
  content.textContent = '';
  if (Code.checkAllGeneratorFunctionsDefined(generator) && Code.checkRoots()) {
    var code = generator.workspaceToCode(Code.workspace);
    content.textContent = code;
    // Remove the 'prettyprinted' class, so that Prettify will recalculate.
    content.className = content.className.replace('prettyprinted', '');
  }
};

/**
 * Check whether all blocks in use have generator functions.
 * @param generator {!Blockly.Generator} The generator to use.
 */
Code.checkAllGeneratorFunctionsDefined = function (generator) {
  var blocks = Code.workspace.getAllBlocks(false);
  var missingBlockGenerators = [];
  for (var i = 0; i < blocks.length; i++) {
    var blockType = blocks[i].type;
    if (!generator[blockType]) {
      if (missingBlockGenerators.indexOf(blockType) == -1) {
        missingBlockGenerators.push(blockType);
      }
    }
  }

  var valid = missingBlockGenerators.length == 0;
  if (!valid) {
    var msg = 'The generator code for the following blocks not specified for ' +
      generator.name_ + ':\n - ' + missingBlockGenerators.join('\n - ');
    Blockly.alert(msg);  // Assuming synchronous. No callback.
  }
  return valid;
};

Code.checkRoots = function() {

  let lesson = Code.getLesson();
  let blocks = Code.workspace.getBlocksByType('controls_loop');
  if (lesson == 'racer') 
    blocks = Code.workspace.getBlocksByType('controls_setup');
  
  let roots = blocks.length;
  let singleRoot = roots == 1;

  if (roots > 1) {
    Blockly.alert(`You have more than one LOOP block!\n\nTry removing a block`);
    let smallest = 999;
    let identifier = 0;
    for (const [key, value] of Object.entries(blocks)) {
      let size = 0;
      if (value.childBlocks_.length) {
        size = value.childBlocks_[0].childBlocks_.length;
      }
      if (size < smallest) {
        smallest = size;
        identifier = key; 
      }
    }
    Code.tabClick('blocks');
    Blockly.alert(`This Block has the least amount of calls`);
    blocks[identifier].select();
    Code.workspace.centerOnBlock(blocks[identifier].id);
  } else if (roots < 1) {
    (Code.workspace.getToolbox().getFlyout().show(document.getElementById(lesson+'_controls')));
    Blockly.alert('YOU NEED A LOOP BLOCK');
  }
  // move this to own function
  if (!Code.workspace.allInputsFilled()) {
    Blockly.alert('Some blocks are missing...');
  }
  return singleRoot;
}

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function () {
  window.onclick = function (event) {
    let modal = document.getElementById("arduinoOutput");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  Code.initSerial();
  // // set up clipboard 
  // var clipboard = new Clipboard('#copy-button');
  // clipboard.on('success', function (e) {
  //   Materialize.toast(Blockly.Msg.COPY_DONE, 4000);
  // });

  Code.initLanguage();
  Code.initSelects();

  var rtl = Code.isRtl();
  var container = document.getElementById('content_area');
  var onresize = function (e) {
    var bBox = Code.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById('content_' + Code.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Code.workspace && Code.workspace.getToolbox().width) {
      document.getElementById('tab_blocks').style.minWidth =
        (Code.workspace.getToolbox().width - 56) + 'px';
      // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);

  // The toolbox XML specifies each category name using Blockly's messaging
  // format (eg. `<category name="%{BKY_CATLOGIC}">`).
  // These message keys need to be defined in `Blockly.Msg` in order to
  // be decoded by the library. Therefore, we'll use the `MSG` dictionary that's
  // been defined for each language to import each category name message
  // into `Blockly.Msg`.
  // TODO: Clean up the message files so this is done explicitly instead of
  // through this for-loop.
  for (var messageKey in MSG) {
    if (messageKey.indexOf('cat') == 0) {
      Blockly.Msg[messageKey.toUpperCase()] = MSG[messageKey];
    }
  } 

  let toolboxXml = Code.buildToolbox();

  Code.workspace = Blockly.inject('content_blocks',
    {
      grid:
      {
        spacing: 25,
        length: 3,
        colour: '#aaa',
        snap: true
      },
      media: './media/',
      rtl: rtl,
      toolbox: toolboxXml,
      renderer: 'zelos',
      theme: 'barnabas',
      zoom:
      {
        controls: true,
        wheel: false
      }
    });

  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
  // Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  Code.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload(Code.workspace);
  }

  // old init -->   
  auto_save_and_restore_blocks(); 
  // setCheckbox();

  Code.bindClick('boardSelect',
    function () { localStorage.setItem('board', this.value);
    document.getElementById('board').textContent = document.getElementById('boardSelect').value;//MSG['title'];
  });

  Code.bindClick('lessonSelect',
    function () {
      let prev = Code.getLesson();
      localStorage.setItem('lesson', this.value);
      if(prev != this.value) {
        document.getElementById('title').textContent = document.getElementById('lessonSelect').value;//MSG['title'];
        let newTree = Code.buildToolbox(this.value);
        Code.workspace.updateToolbox(newTree);
        if (prev === 'racer') {
          Code.discard();
        }
      }
    });


  Code.tabClick(Code.selected);

  // Code.bindClick('trashButton',
  //     function() {Code.discard(); Code.renderContent();});

  Code.bindClick('newButton',
    function () { Code.discard(); Code.renderContent(); });

  Code.bindClick('runButton', Code.flash);
  Code.bindClick('compileButton', Code.compile);
  Code.bindClick('saveButton', Code.save);
  Code.bindClick('monitorButton', Code.monitor);

  // Disable the link button if page isn't backed by App Engine storage.
  var linkButton = document.getElementById('linkButton');
  if ('BlocklyStorage' in window) {
    BlocklyStorage['HTTPREQUEST_ERROR'] = MSG['httpRequestError'];
    BlocklyStorage['LINK_ALERT'] = MSG['linkAlert'];
    BlocklyStorage['HASH_ERROR'] = MSG['hashError'];
    BlocklyStorage['XML_ERROR'] = MSG['xmlError'];
    Code.bindClick(linkButton,
      function () { BlocklyStorage.link(Code.workspace); });
  } else if (linkButton) {
    linkButton.className = 'disabled';
  }

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    Code.bindClick('tab_' + name,
      function (name_) { return function () { Code.tabClick(name_); }; }(name));
  }
  Code.bindClick('tab_code', function (e) {
    if (e.target !== document.getElementById('tab_code')) {
      // Prevent clicks on child codeMenu from triggering a tab click.
      return;
    }
    Code.changeCodingLanguage();
  });

  onresize();
  Blockly.svgResize(Code.workspace);

  // Lazy-load the syntax-highlighting.
  window.setTimeout(Code.importPrettify, 1);

  // old init loadxml();
};

Code.buildToolbox = function () {
  // Construct the toolbox XML, replacing translated variable names.
  // Bor or Racer ?? 
  let lesson = Code.getLesson();
  let toolboxText = document.getElementById(lesson + '_toolbox').outerHTML; // or ajax? ||
  toolboxText = toolboxText.replace(/(^|[^%]){(\w+)}/g,
    function (m, p1, p2) { return p1 + MSG[p2]; });
  let toolboxXml = Blockly.Xml.textToDom(toolboxText);
  return toolboxXml;
}

/**
 * Test for Serial Support
 */
Code.initSerial = function () {
  if (!('serial' in navigator)) {
    // Get the modal
    let modal = document.getElementById("notSupported");
    modal.style.display = "block";

    // Get the <span> element that closes the modal
    // let span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //   modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }
};

/**
 * Initialize the page language.
 */
Code.initLanguage = function () {
  // Set the HTML's language and direction.
  var rtl = Code.isRtl();
  document.dir = rtl ? 'rtl' : 'ltr';
  document.head.parentElement.setAttribute('lang', Code.LANG);

  // Sort languages alphabetically.
  var languages = [];
  for (var lang in Code.LANGUAGE_NAME) {
    languages.push([Code.LANGUAGE_NAME[lang], lang]);
  }
  var comp = function (a, b) {
    // Sort based on first argument ('English', 'Русский', '简体字', etc).
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    return 0;
  };
  languages.sort(comp);
  // Populate the language selection menu.
  var languageMenu = document.getElementById('languageMenu');
  languageMenu.options.length = 0;
  for (var i = 0; i < languages.length; i++) {
    var tuple = languages[i];
    var lang = tuple[tuple.length - 1];
    var option = new Option(tuple[0], lang);
    if (lang == Code.LANG) {
      option.selected = true;
    }
    languageMenu.options.add(option);
  }
  languageMenu.addEventListener('change', Code.changeLanguage, true);

  // Populate the coding language selection menu.
  var codeMenu = document.getElementById('code_menu');
  codeMenu.options.length = 0;
  for (var i = 1; i < Code.TABS_.length; i++) {
    codeMenu.options.add(new Option(Code.TABS_DISPLAY_[i], Code.TABS_[i]));
  }
  codeMenu.addEventListener('change', Code.changeCodingLanguage);

  // Inject language strings.
  document.title += ' ' + MSG['title'];
  document.getElementById('title').textContent = document.getElementById('lessonSelect').value;//MSG['title'];
  document.getElementById('board').textContent = document.getElementById('boardSelect').value;//MSG['title'];
  document.getElementById('tab_blocks').textContent = MSG['blocks'];

  document.getElementById('linkButton').title = MSG['linkTooltip']; //Blockly.Msg.LOAD_XML)
  document.getElementById('runButton').title = MSG['runTooltip'];
  // document.getElementById('trashButton').title = MSG['trashTooltip'];
  document.getElementById('newButton').title = MSG['trashTooltip'];
  // document.getElementById('monitorButton').title = MSG['trashTooltip'];

};

Code.initSelects = function () {
  if (localStorage.getItem('board')) {
    document.getElementById('boardSelect').value = Code.BOARD;
  }
  if (localStorage.getItem('lesson')) {
    document.getElementById('lessonSelect').value = Code.LESSON;
  }
};

// /**
//  * Execute the user's code.
//  * Just a quick and dirty eval.  Catch infinite loops.
//  */
// Code.runJS = function() {
//   Blockly.JavaScript.INFINITE_LOOP_TRAP = 'checkTimeout();\n';
//   var timeouts = 0;
//   var checkTimeout = function() {
//     if (timeouts++ > 1000000) {
//       throw MSG['timeout'];
//     }
//   };
//   var code = Blockly.JavaScript.workspaceToCode(Code.workspace);
//   Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
//   try {
//     eval(code);
//   } catch (e) {
//     alert(MSG['badCode'].replace('%1', e));
//   }
// };

/**
 * Send code to server for hex
 * 
 */
Code.getHex = function (flash = false) {

  let code = Code.getINO();
  
  let board = Code.BOARD;
  if (board == 'uno') {
    var avr = 'arduino:avr:uno';
  } else {
    var avr = 'arduino:avr:nano:cpu=atmega328';
  }

  let data = { sketch: code, board: avr };

  // console.log(JSON.stringify(data));
  fetch(Code.COMPILE_URL + "/compile", { 
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data)// body data type must match "Content-Type" header    // encodeURIComponent(JSON.stringify(data));
  })
  .then(response => response.json())
  .then(data => {
      // console.log(data);
      if (!data.success) {
        console.warn(0, data.msg, true);
        // // can only run below if arduino compile error I can still get response with garbage body
        if (data.stderr.length > 0) {
          let regex = /\/tmp\/chromeduino\-(.*?)\/chromeduino\-(.*?)\.ino\:/g;
          let message = data.stderr.replace(regex, "");
          console.error(message);
          upload_result(message, false)
        }
      } else {
        let hexstring = atob(data.hex);
        return {'data': hexstring, 'msg': data.stdout};
      }
    }
  )
  .then(hex => {
    if (hex && flash) {
      try {
        let avrgirl = new AvrgirlArduino({
          board: board,
          debug: true
        });
    
        avrgirl.flash(str2ab(hex.data), (error) => {
          // gear.classList.remove('spinning');
          // progress.textContent = "done!";
          if (error) {
            console.error("Flash ERROR:", error);
            upload_result(error +'\n'+ hex.msg, false);
          } else {
            console.info('done correctly.');
            upload_result(hex.msg)
          }
        });
      } catch (error) {
        console.error("AVR ERROR:", error);
        upload_result(error, false);
      }

    } else {
      console.log("HEX:", hex);
      upload_result(hex.msg);
    }
  })
  .catch(e => {
    console.error("Fetch Error:", e);
  });
};

Code.flash = function() {
  if (Code.getINO().includes('void loop'))
    Code.getHex(true);
}

Code.compile = function() {
  if (Code.getINO().includes('void loop'))
    Code.getHex();
}

Code.getINO = function() {
  if (Code.selected == 'blocks' && Code.checkRoots()) 
    return Blockly.Arduino.workspaceToCode() 
    return document.getElementById("content_arduino").value;
}
/**
 * 
 * @param {string} msg 
 * @param {boolean} success 
 */

function upload_result(msg, success = true){
  let icon = '';
  let output = '';
  if (success) {
    icon = '<i class="material-icons" style="font-size:48px;color:green">check_circle</i>';
  } else {
    icon = '<i class="material-icons" style="font-size:48px;color:red">error</i>';
  }
  output = `<pre>${msg}</pre>`;
  // document.getElementById("responseType").innerHTML = icon;
  document.getElementById("response").innerHTML = icon + output;
  let modal = document.getElementById('arduinoOutput');
  if (Code.selected == 'blocks') {
    modal.style.marginLeft = (Code.workspace.getToolbox().width) + 'px';
    modal.style.width = (Code.workspace.getToolbox().width - window.width) + 'px';
  } else {
    modal.style.marginLeft = '0px';
    modal.style.width = (window.width) + 'px';
  }
  document.getElementById("arduinoOutput").style.display = "block";
}

Code.monitor = connectUSB;

/**
 * Save blocks to local file.
 * better include Blob and FileSaver for browser compatibility
 */
Code.save = function() {
  var xml = Blockly.Xml.workspaceToDom(Code.workspace);
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
};

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function () {
  var count = Code.workspace.getAllBlocks(false).length;
  if (count < 2 ||
    window.confirm(Blockly.Msg['DELETE_ALL_BLOCKS'].replace('%1', count))) {
    Code.workspace.clear();
    if (window.location.hash) {
      window.location.hash = '';
    }
  }
};

// Load the Code demo's language strings.
// document.write('<script src="./js/lang/msg/' + Code.LANG + '.js"></script>\n');
// Load Blockly's language strings.
// document.write('<script src="./js/lang/' + Code.LANG + '.js"></script>\n');
document.write('<script src="./msg/js/' + Code.LANG + '.js"></script>\n');


window.addEventListener('load', Code.init);


const componentStyles =
{
  'workspaceBackgroundColour': '#aaa',
  'toolboxBackgroundColour': '#333',
  'toolboxForegroundColour': '#fff',
  'flyoutBackgroundColour': '#222',
  'flyoutForegroundColour': '#555',
  'flyoutOpacity': 0.2,
  'scrollbarColour': '#797979',
  'insertionMarkerColour': '#fff',
  'insertionMarkerOpacity': 0.3,
  'scrollbarOpacity': 0.4,
  'cursorColour': '#d0d0d0'
}

const fontStyle =
{
  // "family": "Georgia, serif",
  // "weight": "bold",
  "size": 12
}

const sampleColours =
{
  "colourPrimary": "#4a148c",
  "colourSecondary": "#AD7BE9",
  "colourTertiary": "#CDB6E9"
}

const blockStyles =
{
  "list_blocks": sampleColours,
  "logic_blocks": {
    "colourPrimary": "#01579b",
    "colourSecondary": "#64C7FF",
    "colourTertiary": "#C5EAFF"
  }
}

const categoryStyles =
{
  "controls": { "colour": "#ffff00" },
  "tests": { "colour": "#ffa555" },
  "math": { "colour": "#759749" },
  "variables": { "colour": "#fff" },
  "constants": { "colour": "#efa199" },
  "comm": { "colour": "#fff" },
  "lights": { "colour": "#00ce00" },
  "sounds": { "colour": "#ff6900" },
  "motors": { "colour": 240 },
  "sensors": { "colour": 180 },
}

Blockly.Themes.Barnabas = Blockly.Theme.defineTheme('barnabas', {
  'base': Blockly.Themes.Classic,
  'componentStyles': componentStyles,
  'blockStyles': blockStyles,
  'categoryStyles': categoryStyles,
  'fontStyle': fontStyle,
  'startHats': true
});

/* Interprets an ArrayBuffer as UTF-8 encoded string data. */
var ab2str = function (buf) {
  var bufView = new Uint8Array(buf);
  var encodedString = String.fromCharCode.apply(null, bufView);
  if (verbose_logging) console.log(encodedString);
  return decodeURIComponent(encodeURIComponent(encodedString));
};

/* Converts a string to UTF-8 encoding in a Uint8Array; returns the array buffer. */
var str2ab = function (str) {
  // var encodedString = unescape(encodeURIComponent(str));
  var encodedString = str;
  var bytes = new Uint8Array(encodedString.length);
  for (var i = 0; i < encodedString.length; ++i) {
      bytes[i] = encodedString.charCodeAt(i);
  }
  return bytes.buffer;
};

Code.close = function(parentModal) {
  document.getElementById(parentModal).style.display = "none";
}

const getMethods = (obj) => {
  let properties = new Set()
  let currentObj = obj
  do {
    Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
  } while ((currentObj = Object.getPrototypeOf(currentObj)))
  return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

// console.log(getMethods(Blockly.Variables))

var MSG = {
  title: "Code",
  blocks: "Blocks",
  linkTooltip: "Save and link to blocks.",
  runTooltip: "Run the program defined by the blocks in the workspace.",
  badCode: "Program error:\n%1",
  timeout: "Maximum execution iterations exceeded.",
  trashTooltip: "Discard all blocks.",
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  catLists: "Lists",
  catColour: "Colour",
  catVariables: "Variables",
  catFunctions: "Functions",
  listVariable: "list",
  textVariable: "text",
  httpRequestError: "There was a problem with the request.",
  linkAlert: "Share your blocks with this link:\n\n%1",
  hashError: "Sorry, '%1' doesn't correspond with any saved program.",
  xmlError: "Could not load your saved file. Perhaps it was created with a different version of Blockly?",
  badXml: "Error parsing XML:\n%1\n\nSelect 'OK' to abandon your changes or 'Cancel' to further edit the XML."
};
