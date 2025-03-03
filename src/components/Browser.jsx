import { useState, useRef, useEffect } from "react";
import CryptoImage from "../assets/images/Crypto-Image.png";
import GeoWhereImage from "../assets/images/GeoWhere.png";
import TrelloImage from "../assets/images/Trello.png";
import ToDoImage from "../assets/images/To-Do-List.png";
import "./Browser.css";

const projectData = {
    "project-crypto": {
        name: "Ceege Crypto",
        description: "A cryptocurrency tracker that allows users to view the latest prices, market caps, and trends.",
        tech: "React, Chart.js, CoinGecko API",
        img: CryptoImage,
        link: "https://github.com/Bissmark/Crypto-Page"
    },
    "project-geowhere": {
        name: "GeoWhere",
        description: "A Streetview location guessing game where players place a marker and earn points based on proximity.",
        tech: "React, CSS, HTML, Supabase",
        img: GeoWhereImage,
        link: "https://github.com/Bissmark/GeoWhere-Testing"
    },
    "project-trello": {
        name: "Trello Clone",
        description: "A clone of the popular project management tool with draggable boards and cards.",
        tech: "React, HTML, CSS, Express, MongoDB, Node",
        img: TrelloImage,
        link: "https://github.com/Bissmark/trello"
    },
    "project-todo": {
        name: "To-Do List",
        description: "A simple task management application.",
        tech: "React, HTML, CSS",
        img: ToDoImage,
        link: "https://github.com/Bissmark/School-Notes-V2"
    },
    "project-snakeraylib": {
        name: "Snake Game",
        description: "A simple snake game built using the Raylib library.",
        tech: "C++, Raylib, WebAssembly",
        img: GeoWhereImage,
        link: "/snakeraylib"
    },
    "project-bulletfun": {
        name: "Bullet Fun",
        description: "A simple bullet hell game built using the Raylib library.",
        tech: "C++, Raylib, CMake",
        img: GeoWhereImage,
        link: "/bulletFun"
    }
};


const Browser = ({ onClose, registerProgram, unregisterProgram }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 800, height: 400 });
    const [position, setPosition] = useState({ x: 100, y: 100 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 800, height: 400, x: 100, y: 100 });
    const [inputValue, setInputValue] = useState("home");
    const [url, setUrl] = useState("home");
    const [previousUrl, setPreviousUrl] = useState(null);

    const windowRef = useRef(null);
    const canvasRef = useRef(null);

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

    const handleInputChange = (e) => {
        setInputValue(e.target.value.toLowerCase().trim());
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            setPreviousUrl(url); // Save the current URL before navigating
            setUrl(inputValue); // Navigate to the new URL
        }
    };

    const navigateUrl = (newUrl) => {
        setPreviousUrl(url);
        setUrl(newUrl);
        setInputValue(newUrl); // Sync input with the actual URL
    };

    const _handleBack = () => {
        if (previousUrl) {
            setUrl(previousUrl);
            setInputValue(previousUrl); // Sync input when going back
            setPreviousUrl(null);
        }
    };

    const renderContent = () => {
        if (url === "projects") {
            return (
                <div>
                    <h2>Projects</h2>
                    <ul>
                        {Object.keys(projectData).map((projectKey) => (
                            <li key={projectKey}>
                                <button onClick={() => setUrl(projectKey)}>{projectData[projectKey].name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (url === "project-snakeraylib") {
            return (
                <div className="browser-content">
                    <h1>Snake Game</h1>
                    <p>A simple snake game built using the Raylib library.</p>
                    <p><strong>Technologies used:</strong> C++, Raylib, CMake</p>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <iframe
                            src="/snakeraylib/index.html"
                            width="400"
                            height="300"
                            style={{ border: "none" }}
                            title="Snake Game"
                        ></iframe>
                    </div>
                </div>
            );
        }
        
        if (url === "project-bulletfun") {
            return (
                <div className="browser-content">
                    <h1>Bullet Fun</h1>
                    <p>A simple bullet hell game built using the Raylib library.</p>
                    <p><strong>Technologies used:</strong> C++, Raylib, WebAssembly</p>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <iframe
                            src="/bulletFun/BulletFun.html"
                            width="400"
                            height="300"
                            style={{ border: "none" }}
                            title="Bullet Fun"
                        ></iframe>
                    </div>
                </div>
            );
        }

        if (projectData[url]) {
            const project = projectData[url];
            return (
                <div className="browser-content">
                <div style={{ textAlign: "center" }}>
                    <img src={project.img} alt={project.name} />
                </div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
                <p><strong>Technologies used:</strong> {project.tech}</p>
                <p><a href={project.link} target="_blank" rel="noopener noreferrer">GitHub Repository</a></p>
            </div>
            );
        }
        if (url === "home") {
            return (
                <div className="browser-content">
                    <h1>Welcome to my portfolio!</h1>
                    <p>Feel free to explore the different sections of my website.</p>
                    <p>To navigate to the different pages you can type into the address bar similar to a normal browser, you can get to the about page, contact me page, projects page and skills page</p>
                    <button onClick={() => navigateUrl("about")}>About Me</button>
                    <button onClick={() => navigateUrl("skills")}>My Skills</button>
                    <button onClick={() => navigateUrl("projects")}>View Projects</button>
                    <button onClick={() => navigateUrl("contact")}>Contact Me</button>
                </div>
            );
        } else if (url === "about") {
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
                    <p>Github: <a href="https://github.com/Bissmark" target="_blank">https://github.com/Bissmark</a></p>
                    
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
                <button onClick={_handleBack}className={`back-button ${previousUrl ? "" : "disabled"}`} disabled={!previousUrl}>←</button>
                <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} placeholder="Type a URL and press enter" />
            </div>

            <div>
                {renderContent()}
            </div>

            <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
        </div>
    );
};

export default Browser;
