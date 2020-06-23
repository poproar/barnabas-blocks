Barnabas Blocks
===============

Introduction
------------

Barnabas Blocks is derived from several open source projects based on Blockly, the web-based, graphical programming editor.
The core was started as a fork from [BlocklyDuino](https://github.com/makewitharduino/Online-BlocklyDuinoEditor) to provide language blocks and code generators for arduino programming and other elements have been added from [Chromeduino2](https://github.com/spaceneedle/Chromeduino/)

[Reference Document](https://docs.google.com/document/d/1Wo0LuB8NIk4ksWTbLzph6lmJyBPKhafwQRXbVBngGmY) about using this project with Chromeduino

### Features

* Programming Arduino with visually drag and drop code blocks
* Generate fully compatible Arduino source code
* Interactive Arduino board with 10+ predefined Grove sensor blocks
* Load different on-site examples with url parameters
* Theme choice

### Demo

This is a web tool. You can give it a try at https://code.barnabasrobotics.com.

If you want to install it locally:

git clone https://github.com/BarnabasRobotics/Online-BlocklyDuinoEditor.git

You can then use a local server in your IDE or an extension with your browser and going to a url like localhost/public/blockly/demos/blocklyduino/index.html for use.

### Run locally on your web browser

1. Open browser to BlocklyDuino, Drag and Drop blocks to make arduino program.
2. Select 'Arduino' tab to copy source code to Arduino IDE

Uploading the code to an arduino is currently a work in progress with eyes on [WebUSB](https://wicg.github.io/webusb/) or [WebSerial](https://github.com/WICG/serial)


### Integrated Arduino upload

To avoid the tedious step of manually pasting code to the Arduino IDE, you can run a mini webserver that uses
the [Arduino IDE](https://www.arduino.cc/en/Main/Software) to upload the code to a connected Arduino board on Windows, Mac OS X and Linux systems.
Invoke this command from the BlocklyDuino root folder:

```
python arduino_web_server.py
```

You can optionally specify the port with `--port=COM3` (or `--port=/dev/tty.foo` on Linux and Mac); if you don't, it will try and guess which port to use.

When the webserver is running, you can access BlocklyDuino itself on [http://127.0.0.1:8080/](http://127.0.0.1:8080/).

### Usage

1. Open browser to BlocklyDuino, drag and drop blocks to make an Arduino program
2. Select the 'Arduino' tab and copy all of the source code into an existing or new project in the Arduino IDE
3. Press the 'Upload' button in the Arduino IDE to burn the code into a connected Arduino board

OR (if running `ino_web_server.py`):

1. Open browser to BlocklyDuino, drag and drop blocks to make an Arduino program.
2. Select the 'Arduino' tab and press the 'Upload' button. (press the 'Reset' button to upload an empty program)

### ChangeLog

Check changelog [here](https://github.com/BlocklyDuino/BlocklyDuino/blob/master/CHANGELOG.txt)

### Authors and Contributors
Fred Lin @gasolin is the creator of BlocklyDuino.

BlocklyDuino is a **web-based visual programming editor for [Arduino](http://www.arduino.cc/)**.

BlocklyDuino is based on [Blockly](https://developers.google.com/blockly/), the web-based, graphical programming editor. Provide static type language blocks and code generators for Arduino programming.

Thanks Neil Fraser, Q.Neutron from [Blockly](https://developers.google.com/blockly/)

The project is also inspired by [ardublock](https://github.com/taweili/ardublock) and [modkit](http://www.modk.it/)
Thanks Dale Low (gumbypp) for contribute the python server to pipe BlocklyDuino source to arduino board.

Thanks Arduino and Seeeduino guys for Arduino and [Grove](http://www.seeedstudio.com/wiki/GROVE_System) blocks.

[makewitharduino](https://github.com/makewitharduino/Online-BlocklyDuinoEditor) is work by @okhiroyuki

There has been some interesting [chatter on Chromeduino](https://github.com/spaceneedle/Chromeduino/issues/12) perhaps some of these projects find a way to merge together.

### License

Copyright (C) 2012~2015 Fred Lin gasolin+blockly@gmail.com

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0


# Blockly [![Build Status]( https://travis-ci.org/google/blockly.svg?branch=master)](https://travis-ci.org/google/blockly)


Google's Blockly is a web-based, visual programming editor.  Users can drag
blocks together to build programs.  All code is free and open source.

**The project page is https://developers.google.com/blockly/**

![](https://developers.google.com/blockly/images/sample.png)

Blockly has an active [developer forum](https://groups.google.com/forum/#!forum/blockly). Please drop by and say hello. Show us your prototypes early; collectively we have a lot of experience and can offer hints which will save you time.

Help us focus our development efforts by telling us [what you are doing with
Blockly](https://developers.google.com/blockly/registration). The questionnaire only takes
a few minutes and will help us better support the Blockly community.

Want to contribute? Great! First, read [our guidelines for contributors](https://developers.google.com/blockly/guides/modify/contributing).
