import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';
import { fetchBeverage } from '../api/beverageApi';
import NewBeverageForm from './NewBeverageForm';
import { useAuth } from '../context/AuthContext';

const BarcodeScanner = ({ setBeverageData, beverageData, setDisplayScanner, setFormData}) => {
  const videoRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const codeReader = new BrowserMultiFormatReader();
  const [ formType, setFormType ] = useState(null);
  const { auth } = useAuth();



  useEffect(() => {
    if (!isActive) return;

    const startScanner = async () => {
      try {
        const videoInputDevices = await codeReader.listVideoInputDevices();
        codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, videoRef.current, (result, err) => {
          if (result) {
            (async () => {
              setIsActive(false);
              const upcCode = result.getText();
              console.log(`Barcode read: ${upcCode}`);
              try {
                console.log("Fetching beverage data");
                const data = await fetchBeverage(upcCode);
                setBeverageData(data);
                return true;
              } catch (error) {
                console.error('Error fetching beverage:', error);
                setBeverageData(prevData => ({...prevData, "upc_code": upcCode, "creator_id": auth.user._id}));
                setFormType("new");
              }

              codeReader.reset(); 
            })();
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

  // useEffect(() => {
  //   console.log(beverageData)
  //   if(!beverageData){
  //     console.log("No beverage data");
  //     setVersion("barcode")
  //   } else if (beverageData?.verified) {
  //     setVersion("unverified-form"); //TODO: Remove this to conditionally make some inputs immulatble
  //   } else {
  //     setVersion("verified-form");
  //   }
  // }, [beverageData]);

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
      {formType === "new" && 
      <Modal>
        <NewBeverageForm beverageData={beverageData} setBeverageData={setBeverageData} setFormType={setFormType} setDisplayScanner={setDisplayScanner} setFormData={setFormData}/>
      </Modal>}
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


const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px 50px;
    background: var(--background);
    border: 1px solid var(--accent);
    z-index: 10;
    overflow-y: scroll;
    height: 80vh;
    

    > button {
        margin: 10px;
        padding: 5px 10px;
        background-color: var(--accent);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
            background-color: darken(var(--accent), 10%);
        }
    }
`;