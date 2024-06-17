import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const codeReader = new BrowserMultiFormatReader();

  useEffect(() => {
    if (!isActive) return;

    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current, (result, err) => {
          if (result) {
            console.log(`Barcode read: ${result.getText()}`);
            setIsActive(false);
            codeReader.reset(); 
          }

          if (err) {
            if (!(err instanceof NotFoundException)) {
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
  }, [isActive]);

  return (
    <Container>
      {!isActive && (
        <ScanButton onClick={() => setIsActive(true)}>Activate Scanner</ScanButton>
      )}
      {isActive && (
        <>
          <StyledVideo ref={videoRef} />
          <InfoText>Point the camera at a barcode.</InfoText>
        </>
      )}
    </Container>
  );
};

export default BarcodeScanner;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--background, #36393f);
  color: white;
  padding: 20px;
  box-sizing: border-box;
`;

const StyledVideo = styled.video`
  width: 100%;
  border: 3px solid var(--accent, rgb(244, 154, 115));
`;

const InfoText = styled.p`
  color: var(--overlay, #838383);
`;

const ScanButton = styled.button`
  background-color: var(--accent, rgb(244, 154, 115));
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--header, #23272a);
  }
`;