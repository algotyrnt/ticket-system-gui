import WebSocketMessages from './Component/webSocket';
import System from './Component/systemConfig';
import CustomerManagement from './Component/customerComp';
import VendorManagement from './Component/vendorComp';
import './App.css';

function App() {
  return (
    <div>
      <div className='App-websocket'>
        <WebSocketMessages />
        </div>
      <div className='App-system'>
        <CustomerManagement />
        <VendorManagement />
        <System />
      </div>
    </div>
  );
}

export default App;
