import { useState, useEffect, useCallback } from 'react';

const useDocumentDimension = () => {
    const [width, setWidth] = useState<number>(document.documentElement.scrollWidth);
    const [height, setHeight] = useState<number>(document.documentElement.scrollHeight);

    const handleResize = useCallback(() => {
        setWidth(document.documentElement.scrollWidth);
        setHeight(document.documentElement.scrollHeight);
    }, [])

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return { width, height };
}

export default useDocumentDimension;