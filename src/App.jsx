import { GlobalStyle } from './globalStyles';
import AppRoutes from './AppRoutes';

function App() {
    return (
        <>
            <GlobalStyle />
            <div className="wrapper">
                <AppRoutes />
            </div>
        </>
    );
}

export default App;