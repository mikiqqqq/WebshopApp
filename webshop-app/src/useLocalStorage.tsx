import React from 'react';

const useLocalStorage = (key: string) => {
    const [localState, setLocalState] = React.useState<number>(JSON.parse(localStorage.getItem(key) || '0'));

    React.useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(localState));
    }, [localState, key]);

    return [localState, setLocalState] as const;
}

export default useLocalStorage;