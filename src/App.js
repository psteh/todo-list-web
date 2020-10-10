import React from 'react';
import './App.css';
import Container from './components/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './redux/Todos';

function App() {
    return (
        <Provider store={store}>
            <Container />
        </Provider>
    );
}

export default App;
