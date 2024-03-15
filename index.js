// This will let you send a string from your web interface back to the microbit
// It adds a "newline" character at the end of the string, so that the microbit
// program can tell the command is complete
function sendStringToMicrobit(str) {
  const serialComponent = document.querySelector('custom-serial');
  if (serialComponent) {
    serialComponent.writeToSerial(`${str}\n`);
  }
}

// put any javascript you need for your interface here
let heartButton = document.getElementById("heartButton");
let squareButton = document.getElementById("squareButton");
let diamondButton = document.getElementById("diamondButton");
let sensitivitySlider = document.getElementById("sensitivitySlider");

// Add event listeners to the buttons and slider
heartButton.addEventListener("click", function() {
	sendStringToMicrobit('heart');
});

squareButton.addEventListener("click", function() {
	sendStringToMicrobit('square');
});

diamondButton.addEventListener("click", function() {
	sendStringToMicrobit('diamond');
});

sensitivitySlider.addEventListener("input", function() {
  let value = parseInt(sensitivitySlider.value);  
  if (!isNaN(value)) {
    sendStringToMicrobit("sensitivity " + value);
  } else {
    console.log(`Unexpected slider value: ${sensitivitySlider.value}`)
  }
});

let connected = false; // Variable to track the connection state

    async function toggleSerialConnection() {
        if (connected) {
            await disconnectFromSerial();
            connected = false;
            document.getElementById('connectButton').innerText = 'Connect Serial';
        } else {
            await connectToSerial();
            connected = true;
            document.getElementById('connectButton').innerText = 'Disconnect Serial';
        }
    }

    async function connectToSerial() {
        if (!this.connectedPort) { 
            const usbVendorId = 0x0d28; // BBC Micro:bit
            try {
                this.connectedPort = await navigator.serial.requestPort({ filters: [{ usbVendorId }]});
                const baud = parseInt(this.connectBaudRate.value);
                if (!baud) {
                    console.warn(`Invalid baud rate ${this.connectBaudRate.value}`);
                } else {
                    await this.connectedPort.open({ baudRate: baud });
                    this.btConnectButton.classList.add('disabled');
                    this.keepReading = true;
                    this.finishedReadingPromise = this.readSerialInput();
                }
            } catch(e) {
                console.warn(`Couldn't find any microbits: ${e}`);
            };
        }
    }

    async function disconnectFromSerial() {
        if (this.connectedPort) {
            try {
                this.btConnectButton.classList.remove('disabled');
                this.keepReading = false;
                this.reader.cancel();
                await this.finishedReadingPromise;
                this.connectedPort = null;
            } catch (e) {
                console.warn(`Error disconnecting from microbit: ${e}`);
            }
        }
    }

let mySeperateConnectFunction = function() {
  if (theSerialComponent) {
    theSerialComponent.ConnectButtonOnclick();
  }
}

myConnectButton.addEventListener('click', mySeperateConnectFunction)

 // In order to do custom message handling, uncomment this code, and replace console.log with your own handling code
const theSerialComponent = document.querySelector('custom-serial');
if (theSerialComponent) {
  theSerialComponent.customHandler = function(message) {
    // do whatever you want with the 'message'
    console.log(message);  
  }
}
