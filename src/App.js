import { ContentProvider, SideBar } from "./components";

import "./App.css";
import { AppContextProvider } from "./state-management/app-context";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <SideBar />
        <ContentProvider />
      </div>
    </AppContextProvider>
  );
}

export default App;
