import logo from './logo.svg';
import './App.css';
import { ContentProvider, SideBar } from './components';

function App() {
  return (
    <div className="App">
      <SideBar />
      <ContentProvider />
    </div>
  );
}

export default App;
