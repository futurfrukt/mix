import './index.css';
import {Header} from "../Header";
import {Player} from "../Player";
import {Footer} from "../Footer";

export function App() {
  const standalone = document.location.pathname !== "/embed";

  return (
    <div className="app">
      {standalone && <Header/> }
      <div className="main">
        <Player/>
      </div>
      <Footer/>
    </div>
  );
}

