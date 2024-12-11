import WebSocketMessages from './Component/webSocket';
import SystemConfig from './Component/systemConfig';
import './App.css';

function App() {
  return (
    <div className="app">
        <WebSocketMessages /> {/* Use the WebSocketMessages component */}
      <div className="config">
        <SystemConfig /> {/* Use the SystemConfig component */}
      </div>
    </div>
  );
}

export default App;
