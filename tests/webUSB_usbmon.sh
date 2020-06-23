this is what I saw when I tried to coneect via browser

ffff8c41d221ad80 S Co:1:006:0 s 40 a4 ff9f 0000 0000 0
ffff8c41d221ad80 C Co:1:006:0 0 0
ffff8c41d221ad80 S Co:1:006:0 s 40 9a 1312 6483 0000 0
ffff8c41d221ad80 C Co:1:006:0 0 0
ffff8c41d221a300 S Co:1:006:0 s 40 9a 2518 00c3 0000 0
ffff8c41d221a300 C Co:1:006:0 0 0
ffff8c41d221a0c0 S Co:1:006:0 s 40 a4 ff9f 0000 0000 0
ffff8c41d221a0c0 C Co:1:006:0 0 0
ffff8c4324623000 S Co:1:006:0 s 40 9a 1312 6483 0000 0
ffff8c4324623000 C Co:1:006:0 0 0
ffff8c41d221a0c0 S Co:1:006:0 s 40 9a 2518 00c3 0000 0
ffff8c41d221a0c0 C Co:1:006:0 0 0
ffff8c41d221a3c0 S Co:1:006:0 s 40 9a 1312 6483 0000 0
ffff8c41d221a3c0 C Co:1:006:0 0 0
ffff8c41d221a900 S Co:1:006:0 s 40 9a 2518 00c3 0000 0
ffff8c41d221a900 C Co:1:006:0 0 0

this is my dmesg

usb 1-1.1: new full-speed USB device number 7 using ehci-pci
usb 1-1.1: New USB device found, idVendor=1a86, idProduct=7523
usb 1-1.1: New USB device strings: Mfr=0, Product=2, SerialNumber=0
usb 1-1.1: Product: USB2.0-Serial
ch341 1-1.1:1.0: ch341-uart converter detected
usb 1-1.1: ch341-uart converter now attached to ttyUSB0
usb 1-1.1: USB disconnect, device number 7
ch341-uart ttyUSB0: ch341-uart converter now disconnected from ttyUSB0
ch341 1-1.1:1.0: device disconnected

in webusb I can open but not claim interface.
