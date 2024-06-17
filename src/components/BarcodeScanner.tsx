import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current, (result, err) => {
          if (result) {
            console.log(`Barcode read: ${result}`);
            codeReader.reset();  // Optionally reset the scanner after a successful read
          }

          if (err) {
            if (err instanceof NotFoundException) {
              // Ignore NotFoundException, no barcode found
            } else {
              console.error(err);
            }
          }
        });
      } catch (error) {
        console.error('Error starting the barcode scanner:', error);
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} />
      <p>Point the camera at a barcode.</p>
    </div>
  );
};

export default BarcodeScanner;
