import React from "react";
import HookMqtt from "./components/Connection";
// Hook or Class
// import ClassMqtt from './components/Class/'
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Root } from "./root";
import { DataProvider } from "./context/DataContext";

function App() {
    return (
        <div className="App">
            <DataProvider>
                <BrowserRouter>
                    <Root />
                </BrowserRouter>
            </DataProvider>
        </div>
    );
}

export default App;
