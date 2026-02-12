import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./Browser.css";

const GameWindow = ({ onClose, registerProgram, unregisterProgram, bringToFront, gameSrc, gameTitle }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 1500, height: 1000 });
    const [position, setPosition] = useState({ x: 150, y: 100 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 500, height: 450, x: 150, y: 100 });

    const windowRef = useRef(null);

    useEffect(() => {
        registerProgram(gameTitle);
        return () => { unregisterProgram(gameTitle) };
    }, []);

    const handleMouseDown = (e, direction) => {
        setResizing(true);
        setResizeDirection(direction);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!resizing) return;

        let newWidth = size.width;
        let newHeight = size.height;

        if (resizeDirection.includes("right")) {
            newWidth = Math.max(400, e.clientX - position.x);
        }
        if (resizeDirection.includes("bottom")) {
            newHeight = Math.max(300, e.clientY - position.y);
        }

        setSize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
        setResizing(false);
        setResizeDirection(null);
    };

    const toggleFullScreen = () => {
        if (isFullScreen) {
            setSize({ width: prevSize.width, height: prevSize.height });
            setPosition({ x: prevSize.x, y: prevSize.y });
        } else {
            setPrevSize({ width: size.width, height: size.height, x: position.x, y: position.y });
            setSize({ width: window.innerWidth, height: window.innerHeight });
            setPosition({ x: 0, y: 0 });
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <Draggable
            handle=".game-header"
            position={position}
            onDrag={(e, data) => {
                setPosition({ x: data.x, y: data.y });
            }}
            bounds={{ left: 0, top: 0, right: window.innerWidth - size.width, bottom: window.innerHeight - size.height }}
            disabled={isFullScreen}
        >
            <div
                ref={windowRef}
                className={`browser-window ${isFullScreen ? "fullscreen" : ""}`}
                style={{ width: size.width, height: size.height }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={() => bringToFront(gameTitle)}
            >
                <div className="browser-header game-header">
                    <span>
                        <span className="browser-header-icon">🎮</span>
                        {gameTitle}
                    </span>
                    <div className="browser-controls">
                        <button className="control-btn-browser min-btn" title="Minimize">_</button>
                        <button 
                            className="control-btn-browser max-btn" 
                            title={isFullScreen ? "Restore" : "Maximize"} 
                            onClick={toggleFullScreen}
                        >
                            {isFullScreen ? "❐" : "□"}
                        </button>
                        <button className="control-btn-browser close-btn" title="Close" onClick={onClose}>×</button>
                    </div>
                </div>

                <div style={{ 
                    width: '100%', 
                    height: 'calc(100% - 30px)', 
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <iframe
                        src={gameSrc}
                        width="100%"
                        height="100%"
                        style={{ border: "none", display: "block" }}
                        title={gameTitle}
                        scrolling="no"
                    />
                </div>

                <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
            </div>
        </Draggable>
    );
};

export default GameWindow;