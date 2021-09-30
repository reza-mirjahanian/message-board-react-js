import './App.css';
import HomePage from "./HomePage";
import {Provider} from 'react-redux';
import store from './redux/store';

function App() {
    return (
        <Provider store={store}>
            <HomePage/>
        </Provider>
    );
}

export default App;
