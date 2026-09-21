import Game from "./components/Game";
import "./App.css";

function App() {
  return <main className="app-shell"><header className="site-header"><a className="brand" href="#adventure" aria-label="Chronicle home"><span className="brand-mark">C</span><span>Chronicle</span></a><p className="header-note">Interactive story / 01</p><button className="menu-button" type="button" aria-label="Open menu"><span /><span /></button></header><Game /><footer className="site-footer"><span>Choose carefully. Every path leaves a trace.</span><span>© 2026 Chronicle</span></footer></main>;
}

export default App;
