import { ContentProvider, SideBar } from "./components";
import { AsymAuth } from "./asym-auth-client-sdk";

import "./App.css";

function App() {
  const asymAuth = new AsymAuth();

  return (
    <div className="App">
      <SideBar />
      <ContentProvider />
    </div>
  );
}

export default App;
