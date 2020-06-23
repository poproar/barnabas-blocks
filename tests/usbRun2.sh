>> empty adruino file with following code:

void setup() {}
void loop() {}

>> output avrdude:

Sketch uses 444 bytes (1%) of program storage space. Maximum is 32256 bytes.
Global variables use 9 bytes (0%) of dynamic memory, leaving 2039 bytes for local variables. Maximum is 2048 bytes.
/home/poproar/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/bin/avrdude -C/home/poproar/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/etc/avrdude.conf -v -patmega328p -carduino -P/dev/ttyUSB0 -b115200 -D -Uflash:w:/tmp/arduino_build_203381/empty.ino.hex:i 

avrdude: Version 6.3-20190619
         Copyright (c) 2000-2005 Brian Dean, http://www.bdmicro.com/
         Copyright (c) 2007-2014 Joerg Wunsch

         System wide configuration file is "/home/poproar/.arduino15/packages/arduino/tools/avrdude/6.3.0-arduino17/etc/avrdude.conf"
         User configuration file is "/home/poproar/.avrduderc"
         User configuration file does not exist or is not a regular file, skipping

         Using Port                    : /dev/ttyUSB0
         Using Programmer              : arduino
         Overriding Baud Rate          : 115200
         AVR Part                      : ATmega328P
         Chip Erase delay              : 9000 us
         PAGEL                         : PD7
         BS2                           : PC2
         RESET disposition             : dedicated
         RETRY pulse                   : SCK
         serial program mode           : yes
         parallel program mode         : yes
         Timeout                       : 200
         StabDelay                     : 100
         CmdexeDelay                   : 25
         SyncLoops                     : 32
         ByteDelay                     : 0
         PollIndex                     : 3
         PollValue                     : 0x53
         Memory Detail                 :

                                  Block Poll               Page                       Polled
           Memory Type Mode Delay Size  Indx Paged  Size   Size #Pages MinW  MaxW   ReadBack
           ----------- ---- ----- ----- ---- ------ ------ ---- ------ ----- ----- ---------
           eeprom        65    20     4    0 no       1024    4      0  3600  3600 0xff 0xff
           flash         65     6   128    0 yes     32768  128    256  4500  4500 0xff 0xff
           lfuse          0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           hfuse          0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           efuse          0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           lock           0     0     0    0 no          1    0      0  4500  4500 0x00 0x00
           calibration    0     0     0    0 no          1    0      0     0     0 0x00 0x00
           signature      0     0     0    0 no          3    0      0     0     0 0x00 0x00

         Programmer Type : Arduino
         Description     : Arduino
         Hardware Version: 3
         Firmware Version: 4.4
         Vtarget         : 0.3 V
         Varef           : 0.3 V
         Oscillator      : 28.800 kHz
         SCK period      : 3.3 us

avrdude: AVR device initialized and ready to accept instructions

Reading | ################################################## | 100% 0.00s

avrdude: Device signature = 0x1e950f (probably m328p)
avrdude: reading input file "/tmp/arduino_build_203381/empty.ino.hex"
avrdude: writing flash (444 bytes):

Writing | ################################################## | 100% 0.08s

avrdude: 444 bytes of flash written
avrdude: verifying flash memory against /tmp/arduino_build_203381/empty.ino.hex:
avrdude: load data flash data from input file /tmp/arduino_build_203381/empty.ino.hex:
avrdude: input file /tmp/arduino_build_203381/empty.ino.hex contains 444 bytes
avrdude: reading on-chip flash data:

Reading | ################################################## | 100% 0.07s

avrdude: verifying ...
avrdude: 444 bytes of flash verified

avrdude done.  Thank you.

>> AND usbmon output:

ffff8c412c3fc3c0 S Co:1:006:0 s 40 9a 1312 b282 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 9a 2518 00c3 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 a4 ffff 0000 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c434b89e240 S Ii:1:006:1 -115:1 8 <
ffff8c412c3fc3c0 S Ci:1:006:0 s c0 95 0706 0000 0002 2 <
ffff8c412c3fc3c0 C Ci:1:006:0 0 2 = ffee
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c412c3fc3c0 S Co:1:006:0 s 40 a4 ff9f 0000 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 9a 1312 cc83 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 9a 2518 00c3 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 a4 ff9f 0000 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 a4 ffff 0000 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c412c3fc3c0 S Co:1:006:0 s 40 a4 ff9f 0000 0000 0
ffff8c412c3fc3c0 C Co:1:006:0 0 0
ffff8c4343a63900 S Bo:1:006:2 -115 2 = 3020
ffff8c4343a63900 C Bo:1:006:2 0 2 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 2 = 3020
ffff8c4343a63900 C Bo:1:006:2 0 2 >
ffff8c434a962240 C Bi:1:006:2 0 2 = 1410
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 2 = 3020
ffff8c4343a63900 C Bo:1:006:2 0 2 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418020
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962240 C Bi:1:006:2 0 3 = 140310
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418120
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962cc0 C Bi:1:006:2 0 3 = 140410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418220
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962240 C Bi:1:006:2 0 3 = 140410
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 419820
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962cc0 C Bi:1:006:2 0 3 = 140310
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418420
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962240 C Bi:1:006:2 0 3 = 140310
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418520
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962cc0 C Bi:1:006:2 0 3 = 140310
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418620
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962240 C Bi:1:006:2 0 3 = 140310
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418720
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962cc0 C Bi:1:006:2 0 3 = 140310
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418920
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962240 C Bi:1:006:2 0 3 = 140310
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418120
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962cc0 C Bi:1:006:2 0 3 = 140410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 3 = 418220
ffff8c4343a63900 C Bo:1:006:2 0 3 >
ffff8c434a962240 C Bi:1:006:2 0 3 = 140410
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 22 = 42860000 01010101 03ffffff ff008004 00000080 0020
ffff8c4343a63900 C Bo:1:006:2 0 22 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 7 = 450504d7 c20020
ffff8c4343a63900 C Bo:1:006:2 0 7 >
ffff8c434a962240 C Bi:1:006:2 0 2 = 1410
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 2 = 5020
ffff8c4343a63900 C Bo:1:006:2 0 2 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 2 = 7520
ffff8c4343a63900 C Bo:1:006:2 0 2 >
ffff8c434a962240 C Bi:1:006:2 0 5 = 141e950f 10
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55000020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 64008046 0c943400 0c944600 0c944600 0c944600 0c944600 0c944600 0c944600
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 0c944600 0c944600 0c944600 0c944600 0c944600 0c944600 0c944600 0c944600
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 0c944600 0c944800 0c944600 0c944600 0c944600 0c944600 0c944600 0c944600
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 0c944600 0c944600 0c944600 11241fbe cfefd8e0 debfcdbf 21e0a0e0 b1e001c0
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 5 = 1d92a930 20
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962240 C Bi:1:006:2 0 1 = 14
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 1 = 10
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55400020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962240 C Bi:1:006:2 0 2 = 1410
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 64008046 b207e1f7 0e949200 0c94dc00 0c940000 1f920f92 0fb60f92 11242f93
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 3f938f93 9f93af93 bf938091 05019091 0601a091 0701b091 08013091 040123e0
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 230f2d37 58f50196 a11db11d 20930401 80930501 90930601 a0930701 b0930801
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 80910001 90910101 a0910201 b0910301 0196a11d b11d8093 00019093 0101a093
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 5 = 0201b093 20
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962cc0 C Bi:1:006:2 0 1 = 14
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 1 = 10
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55800020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 64008046 0301bf91 af919f91 8f913f91 2f910f90 0fbe0f90 1f901895 26e8230f
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 0296a11d b11dd2cf 789484b5 826084bd 84b58160 84bd85b5 826085bd 85b58160
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 85bd8091 6e008160 80936e00 10928100 80918100 82608093 81008091 81008160
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 80938100 80918000 81608093 80008091 b1008460 8093b100 8091b000 81608093
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 5 = b0008091 20
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962240 C Bi:1:006:2 0 1 = 14
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 1 = 10
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55c00020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962240 C Bi:1:006:2 0 2 = 1410
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 32 = 64008046 7a008460 80937a00 80917a00 82608093 7a008091 7a008160 80937a00
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = 80917a00 80688093 7a001092 c100c0e0 d0e02097 f1f30e94 0000fbcf f894ffcf
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 32 = ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4344ede6c0 S Bo:1:006:2 -115 32 = ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
ffff8c4343a63900 C Bo:1:006:2 0 32 >
ffff8c4343a63900 S Bo:1:006:2 -115 5 = ffffffff 20
ffff8c4344ede6c0 C Bo:1:006:2 0 32 >
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962cc0 C Bi:1:006:2 0 1 = 14
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 1 = 10
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55000020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 5 = 74008046 20
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962240 C Bi:1:006:2 0 32 = 140c9434 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 32 = 000c9448 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446 000c9446
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 000c9446 000c9446 0011241f becfefd8 e0debfcd bf21e0a0 e0b1e001 c01d92a9
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 2 = 3010
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55400020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 5 = 74008046 20
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962240 C Bi:1:006:2 0 32 = 14b207e1 f70e9492 000c94dc 000c9400 001f920f 920fb60f 9211242f 933f938f
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 939f93af 93bf9380 91050190 910601a0 910701b0 91080130 91040123 e0230f2d
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 32 = 3758f501 96a11db1 1d209304 01809305 01909306 01a09307 01b09308 01809100
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 01909101 01a09102 01b09103 010196a1 1db11d80 93000190 930101a0 930201b0
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 2 = 9310
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55800020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 5 = 74008046 20
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962240 C Bi:1:006:2 0 32 = 140301bf 91af919f 918f913f 912f910f 900fbe0f 901f9018 9526e823 0f0296a1
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 1db11dd2 cf789484 b5826084 bd84b581 6084bd85 b5826085 bd85b581 6085bd80
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 32 = 916e0081 6080936e 00109281 00809181 00826080 93810080 91810081 60809381
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 00809180 00816080 93800080 91b10084 608093b1 008091b0 00816080 93b00080
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 2 = 9110
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 4 = 55c00020
ffff8c4343a63900 C Bo:1:006:2 0 4 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 5 = 74008046 20
ffff8c4343a63900 C Bo:1:006:2 0 5 >
ffff8c434a962240 C Bi:1:006:2 0 32 = 147a0084 6080937a 0080917a 00826080 937a0080 917a0081 6080937a 0080917a
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = 00806880 937a0010 92c100c0 e0d0e020 97f1f30e 940000fb cff894ff cfffffff
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 32 = ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c434a962cc0 C Bi:1:006:2 0 32 = ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c434a962240 C Bi:1:006:2 0 2 = ff10
ffff8c434a962240 S Bi:1:006:2 -115 32 <
ffff8c4343a63900 S Bo:1:006:2 -115 2 = 5120
ffff8c4343a63900 C Bo:1:006:2 0 2 >
ffff8c434a962cc0 C Bi:1:006:2 0 2 = 1410
ffff8c434a962cc0 S Bi:1:006:2 -115 32 <
ffff8c412ccc3b40 S Co:1:006:0 s 40 a4 ffff 0000 0000 0
ffff8c412ccc3b40 C Co:1:006:0 0 0
ffff8c412ccc3b40 S Co:1:006:0 s 40 9a 1312 b282 0000 0
ffff8c412ccc3b40 C Co:1:006:0 0 0
ffff8c412ccc3b40 S Co:1:006:0 s 40 9a 2518 00c3 0000 0
ffff8c412ccc3b40 C Co:1:006:0 0 0
ffff8c412ccc3b40 S Co:1:006:0 s 40 a4 ffff 0000 0000 0
ffff8c412ccc3b40 C Co:1:006:0 0 0
ffff8c412ccc3b40 S Co:1:006:0 s 40 a4 ffff 0000 0000 0
ffff8c412ccc3b40 C Co:1:006:0 0 0
ffff8c434a962cc0 C Bi:1:006:2 -2 0
ffff8c434a962240 C Bi:1:006:2 -2 0
ffff8c412ccc3b40 S Co:1:002:0 s 23 08 9062 0001 0000 0
ffff8c412ccc3b40 C Co:1:002:0 0 0
ffff8c434b89e240 C Ii:1:006:1 -2:1 0
