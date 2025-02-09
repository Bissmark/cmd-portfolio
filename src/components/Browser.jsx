import { useState, useRef, useEffect } from "react";
import "./Browser.css";

const Browser = ({ onClose, registerProgram, unregisterProgram }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 800, height: 400 });
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 800, height: 400, x: 100, y: 100 });
    const [url, setUrl] = useState("about");
    const windowRef = useRef(null);

    useEffect(() => {
        registerProgram("Browser");
        return () => { unregisterProgram("Browser") };
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
            newWidth = Math.max(300, e.clientX - position.x);
        }
        if (resizeDirection.includes("bottom")) {
            newHeight = Math.max(200, e.clientY - position.y);
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

    const handleUrlChange = (e) => {
        setUrl(e.target.value.toLowerCase().trim());
    };

    const renderContent = () => {
        if (url === "about") {
            return (
                <div className="browser-content">
                    <p>I am a Sydney-based Junior Full-Stack Developer with a deep passion for technology and coding. I love learning different languages and frameworks. I thrive on problem-solving, working under pressure, and tackling challenges head-on. I enjoy collaborating with diverse teams, constantly learning, and bringing innovative ideas to life.</p>
                    <p>My journey in programming started in 2010 with game development, where I worked for two years before exploring different fields, including gardening and racehorse handling. These experiences taught me adaptability, perseverance, and the ability to take projects from concept to completion..</p>
                    <p>In my free time, I love playing a wide variety of video games—from platformers and RPGs to MMOs and soccer simulators. I'm also an avid reader of fantasy novels, enjoy cooking, and appreciate walking.</p>
                </div>
            );
        } else if (url === "contact") {
            return (
                <div className="browser-content">
                    <p>You can contact me at:</p>
                    <p>Email: holt.christopher1@gmail.com</p>
                    <p>Phone: 0423 123 456</p>
                    <p>Github: https://github.com/Bissmark</p>
                </div>
            );
        } else if (url === "skills") {
            return (
                <div className="browser-content">
                    <p>Here are some of my skills:</p>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>MongoDB</li>
                        <li>Python</li>
                        <li>Java</li>
                        <li>C#</li>
                        <li>Unity</li>
                        <li>Git</li>
                    </ul>
                </div>
            );
        }
    }


    return (
        <div
            ref={windowRef}
            className={`browser-window ${isFullScreen ? "fullscreen" : ""}`}
            style={{ width: size.width, height: size.height, left: position.x, top: position.y }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="browser-header">
                <span>My Browser</span>
                <div className="browser-controls">
                    <button className="control-btn min-btn">-</button>
                    <button className="control-btn max-btn" onClick={toggleFullScreen}>□</button>
                    <button className="control-btn close-btn" onClick={onClose}>X</button>
                </div>
            </div>

            <div className="browser-url-bar">
                <input type="text" value={url} onChange={handleUrlChange} on placeholder="" />
            </div>

            <div>
                {renderContent()}
            </div>

            <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
        </div>
    );
};

export default Browser;
