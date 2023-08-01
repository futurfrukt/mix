import './index.css';
import {Header} from "../Header";
import {Player} from "../Player";
import {Footer} from "../Footer";

export function App() {
  return (
    <div className="app">
      <div className="main">
        <Player/>
      </div>
      <Footer/>
    </div>
  );
}

