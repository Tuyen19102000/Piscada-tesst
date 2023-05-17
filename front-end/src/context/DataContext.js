/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [client, setClient] = useState(null);
    const [payload, setPayload] = useState({});
    return (
        <DataContext.Provider
            value={{
                client,
                setClient,
                payload,
                setPayload,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
