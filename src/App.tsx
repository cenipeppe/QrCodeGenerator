import { useEffect, useState } from 'react'
import './App.css'
import QRCode from 'react-qr-code';
import { Modal } from './components/Modal';
import { usePDF } from 'react-to-pdf';

function App() {
  const [text, setText] = useState<string>("");
  const [number, setNumber] = useState<number>(0);

  const [qrCodeJson, setQrCodeJson] = useState<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    const json = JSON.stringify({
      text,
      number
    })
    setQrCodeJson(json)
  }

  useEffect(() => {
    if (qrCodeJson) setQrCodeJson(undefined);
  }, [text, number])

  const { toPDF, targetRef } = usePDF({ filename: 'qrCode.pdf' });

  const handleOpenPdf = () => {
    toPDF();
  }

  return (
    <div className='container'>
      <h1>Test qr code</h1>
      <form onSubmit={handleSubmit}>

        <div className='input-field'>
          <label htmlFor="text-field">Inserisci un testo</label>
          <br />
          <input id="text-field" type='text' name="text" value={text} onChange={e => setText(e.target.value)} />
        </div>
        <div className='input-field'>
          <label htmlFor="number-field">Inserisci un numero</label>
          <br />
          <input id="number-field" type='number' value={number} onChange={e => setNumber(parseInt(e.target.value))} />
        </div>
        <div className='input-field'>
          <button
            id="text-field"
            type='submit'
            value={number}
            onSubmit={(e) => handleSubmit(e)}
            disabled={!text || number === undefined}
          >
            Genera QR Code
          </button>
        </div>
      </form>

      {qrCodeJson && (
        <Modal title='Qr Code generato' onClose={() => setQrCodeJson(undefined)}>
          <div className='qrCodeContainer' ref={targetRef}>
            <QRCode
              size={256}
              style={{ height: "10rem", maxWidth: "10rem", width: "10rem" }}
              value={qrCodeJson}
              viewBox={`0 0 256 256`}
            />
            <br />
            <div style={{ marginTop: "2rem" }}>
              Contenuto del QR Code:
            </div>
            <pre>
              {qrCodeJson}
            </pre>
          </div>
          <br />
          <button style={{ width: "100%" }} type="button" onClick={handleOpenPdf}> Scarica PDF</button>
        </Modal>
      )}
    </div>
  )
}

export default App
