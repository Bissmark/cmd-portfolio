import { useRef } from "react";

let globalZIndex = 100;

export const ZIndexManager = () => {
    const zIndexRef = useRef({});

    const getTopZIndex = () => ++globalZIndex;

    const bringToFront = (key) => {
        zIndexRef.current[key] = getTopZIndex();
    };

    const getZIndex = (key) => {
        return zIndexRef.current[key] || 0;
    };

    return {
        bringToFront,
        getZIndex,
    };
};
