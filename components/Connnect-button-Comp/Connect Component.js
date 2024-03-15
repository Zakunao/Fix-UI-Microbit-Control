class CustomSerial {

    static async connectUSB() {
        const usbVendorId = 0x0d28; // BBC Micro:bit

        try {
            const connectedPort = await navigator.serial.requestPort({ filters: [{ usbVendorId }] });

            const baudRateSelect = 9600; // Set your preferred baud rate here

            await connectedPort.open({ baudRate: baudRateSelect });

            console.log('USB connected successfully.');

            // Add any additional logic or handling for the connected port if needed

        } catch (error) {
            console.error(`Error connecting to USB: ${error}`);
            throw error; // Propagate the error to the caller if needed
        }
    }
}

// Example usage:
CustomSerial.connectUSB()
    .then(() => {
        console.log('USB Connected successfully.');
    })
    .catch((error) => {
        console.error(`Error connecting to USB: ${error}`);
    });
