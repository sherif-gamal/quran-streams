// create an application context and code to manage it

import React, { createContext, useState } from 'react';
import { useLocalStorage } from 'react-use';
import streams from './common/streams.json';

export const ApplicationContext = createContext();

export const ApplicationContextProvider = (props) => {
    const [stream, setStream, removeStreamFromLocalStorage] = useLocalStorage('stream', streams[0]);

    const [applicationState, setApplicationState] = useState({
        stream
    });

    return (
        <ApplicationContext.Provider value={[applicationState, setApplicationState]}>
            {props.children}
        </ApplicationContext.Provider>
    );
}
