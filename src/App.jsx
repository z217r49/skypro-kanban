import './App.css'
import { GlobalStyle } from './globalStyles';
import Header from './components/header/Header';
import Main from './components/main/Main';
import PopBrowse from './components/popups/PopBrowse';
import PopNewCard from './components/popups/PopNewCard';
import PopExit from './components/popups/PopExit';

function App() {
    return (
        <>
            <GlobalStyle />
            <div className="wrapper">
                <PopExit />
                <PopNewCard />
                <PopBrowse />
                <Header />
                <Main />
            </div>
        </>
    );
};

export default App;