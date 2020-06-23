followed other sites and WebUSB_help.html had same serial and added steps I found elsewhere put in the doc
still stuck new steps:

1. insert usb
1. [check](chrome://device-log/)
1. `lsusb #-t` 
    
    the next two steps took some searching to understand what is really happening. 

1. `grep 1a86 /sys/bus/usb/devices/*/idVendor # 1a86 was vender id found from lsusb`

    > use the above result to 

1. `echo "result" | sudo tee /sys/bus/usb/drivers/ch341/unbind # where result is something like 1-1.1 or 2-2:2.0`
1. `sudo udevadm control --reload-rules && udevadm trigger`
1. open blank browser window and run 
    ```javascript
    try {
        device = await navigator.usb.requestDevice({
            filters: [{
                vendorId: 0x1a86
            }]
        })

        console.log('open')
        await device.open()
        console.log('opened:', device)
    } catch (error) {
        console.log(error)
    }
    await device.close()
    ```
    you should see a device or error after open

[trying](http://renaun.com/blog/2013/05/using-the-chrome-serial-api-with-arduino/)
    dead links within needs app

[next](https://codelabs.developers.google.com/codelabs/web-serial)

