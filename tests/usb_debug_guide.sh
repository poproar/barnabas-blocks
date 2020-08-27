cd snap/arduino-1.8.9
source ./install.sh
sudo apt install arduino
arduino --help
python arduino_web_server.py
find USBCore.h / | grep USBC
which arduino
cd /etc/udev/rules.d
sudo nano /etc/udev/rules.d/50-arduino_nano.rules
sudo udevadm control --reload-rules
cat /sys/bus/usb/drivers/ch341
ls /sys/bus/usb/drivers/ch341
ls /sys/bus/usb/drivers/ch341/unbind
cat /sys/bus/usb/drivers/ch341/unbind
sudo cat /sys/bus/usb/drivers/ch341/unbind
sudo nano /sys/bus/usb/drivers/ch341/unbind
ls /sys/bus/usb/drivers/ch341
echo "2-2:1.0" > /sys/bus/usb/drivers/ch341/unbind
ls /sys/bus/usb/drivers/ch341
ls /sys/bus/usb/devices
grep 1a86 /sys/bus/usb/devices/*/idVendor
echo "1-1:6.0" | sudo tee /sys/bus/usb/drivers/ch341/unbind
echo "1-1.6" | sudo tee /sys/bus/usb/drivers/ch341/unbind
echo "1-1.6:1.0" | sudo tee /sys/bus/usb/drivers/ch341/unbind
echo "1-1.6:1.1" | sudo tee /sys/bus/usb/drivers/ch341/unbind
lsusb -t
ls /sys/bus/usb/devices
ls /sys/bus/usb/devices/1-1.6
ls /sys/bus/usb/devices/1-1.6/idVendor
cat /sys/bus/usb/devices/1-1.6/idVendor
cat /sys/bus/usb/devices/1-1.6:1.0/idVendor
grep 1a86 /sys/bus/usb/devices/*/idVendor
echo "1-1.1" | sudo tee /sys/bus/usb/drivers/ch341/unbind
sudo nano /etc/udev/rules.d/50-arduino_nano.rules
sudo udevadm control --reload-rules && udevadm trigger
sudo nano /etc/udev/rules.d/50-arduino_nano.rules
sudo udevadm control --reload-rules && udevadm trigger
git clone http://git.main.lv/cgit.cgi/webusb.git
mount -t debugfs none_debugs /sys/kernel/debug
sudo mount -t debugfs none_debugs /sys/kernel/debug # already busy
sudo modprobe usbmon
sudo ls /sys/kernel/debug/usb/usbmon
sudo cat /sys/kernel/debug/usb/devices # lsusb -t
sudo cat /sys/kernel/debug/usb/usbmon/1u > /tmp/1.mon.out
code /tmp/1.mon.out
