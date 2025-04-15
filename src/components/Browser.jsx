import { useState, useRef, useEffect } from "react";
import CryptoImage from "../assets/images/Crypto-Image.png";
import GeoWhereImage from "../assets/images/GeoWhere.png";
import TrelloImage from "../assets/images/Trello.png";
import ToDoImage from "../assets/images/To-Do-List.png";
import MeImage from "../assets/images/Me.png";
import CplusplusIcon from "../assets/icons/C++.png";
import PythonIcon from "../assets/icons/Python.png";
import ReactIcon from "../assets/icons/React.png";
import CSSIcon from "../assets/icons/CSS.png";
import HTMLIcon from "../assets/icons/HTML.png";
import MongoDBIcon from "../assets/icons/MongoDB.png";
import JavascriptIcon from "../assets/icons/JavaScript.png";
import CSharpIcon from "../assets/icons/Csharp.webp";
import ExpressIcon from "../assets/icons/Express.webp";
import Draggable from "react-draggable";
import "./Browser.css";

const projectData = {
    "project-crypto": {
        name: "Ceege Crypto",
        description: "A cryptocurrency tracker that allows users to view the latest prices, market caps, and trends.",
        tech: "React, Chart.js, CoinGecko API",
        img: CryptoImage,
        link: "https://github.com/Bissmark/Crypto-Page",
        live: "https://ceegecrypto.firebaseapp.com/"
    },
    "project-geowhere": {
        name: "GeoWhere",
        description: "A Streetview location guessing game where players place a marker and earn points based on proximity.",
        tech: "React, CSS, HTML, Supabase",
        img: GeoWhereImage,
        link: "https://github.com/Bissmark/GeoWhere-Testing",
        live: "https://geowhere.netlify.app/"
    },
    "project-trello": {
        name: "Trello Clone",
        description: "A clone of the popular project management tool with draggable boards and cards.",
        tech: "React, HTML, CSS, Express, MongoDB, Node",
        img: TrelloImage,
        link: "https://github.com/Bissmark/trello",
        live: "https://trello-frontend-q3pp.onrender.com/"
    },
    "project-todo": {
        name: "To-Do List",
        description: "A simple task management application.",
        tech: "React, HTML, CSS",
        img: ToDoImage,
        link: "https://github.com/Bissmark/School-Notes-V2",
        live: "https://school-notes-backend.onrender.com/"
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


const Browser = ({ onClose, registerProgram, unregisterProgram, bringToFront }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 1200, height: 800 });
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
            setPreviousUrl(url);
            setUrl(inputValue);
        }
    };

    const navigateUrl = (newUrl) => {
        setPreviousUrl(url);
        setUrl(newUrl);
        setInputValue(newUrl);
    };

    const _handleBack = () => {
        if (previousUrl) {
            setUrl(previousUrl);
            setInputValue(previousUrl);
            setPreviousUrl(null);
        }
    };

    const renderContent = () => {
        if (url === "projects") {
            return (
                <div className="browser-content">
                    <h1>Projects</h1>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="projects-list">
                            {Object.keys(projectData).map((projectKey) => (
                                <p key={projectKey}>
                                    <button onClick={() => setUrl(projectKey)}>{projectData[projectKey].name}</button>
                                </p>
                            ))}
                        </div>
                    </div>
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
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <img src={project.img} alt={project.name} className="project-image" />
                    </a>
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
                    <h1 style={{ marginBottom: "20px" }}>Welcome to the Browser portion of my portfolio!</h1>
                    <div style={{ display: "flex", flexDirection: "row", flexGrow: 1 }}>
                        <div style={{ width: "50%", paddingRight: "10px", display: "flex", flexDirection: "column" }}>
                            <p>There are multiple ways to view my portfolio, you can view my projects, about me, contact me and my resume using the start menu, the powershell (command prompt), My Computer or the Browser.</p>
                            <p>Feel free to explore the different sections of my website.</p>
                            <p>To navigate to the different pages you can type into the address bar similar to a normal browser, you can get to the about page, contact me page, projects page and skills page</p>
                            <p>If you type the links into the address bar you need to either type: projects, skills, about or contact and then press enter</p>
                        </div>
                        <div className="home-buttons" style={{ width: "50%" }}>
                            <button onClick={() => navigateUrl("about")}>About Me</button>
                            <button onClick={() => navigateUrl("skills")}>My Skills</button>
                            <button onClick={() => navigateUrl("projects")}>View Projects</button>
                            <button onClick={() => navigateUrl("contact")}>Contact Me</button>
                        </div>
                    </div>
                </div>
            );
        } else if (url === "about") {
            return (
                <div className="browser-content">
                    <h1 style={{marginBottom: '20px'}}>About Me</h1>
                    <p>I am a Sydney-based Junior Full-Stack Developer with a deep passion for technology and coding. I love learning different languages and frameworks. I thrive on problem-solving, working under pressure, and tackling challenges head-on. I enjoy collaborating with diverse teams, constantly learning, and bringing innovative ideas to life.</p>
                    <p>My journey in programming started in 2010 with game development, where I worked for two years before exploring different fields, including gardening and racehorse handling. These experiences taught me adaptability, perseverance, and the ability to take projects from concept to completion..</p>
                    <p>In my free time, I love playing a wide variety of video games—from platformers and RPGs to MMOs and soccer simulators. I'm also an avid reader of fantasy novels, enjoy cooking, and appreciate walking.</p>

                    <div className="about-me-skills">
                        <div className="about-me-games">
                            <img src="" alt="" />
                            <p>Games Programmer</p>
                        </div>
                        <div className="about-me-fullstack">
                            <img src="" alt="" />
                            <p>Fullstack Programmer</p>
                        </div>
                        <div className="about-me-husband">
                            <img src="" alt="" />
                            <p style={{width: '20px'}}>Loving Husband and Father</p>
                        </div>
                    </div>
                </div>
            );
        } else if (url === "contact") {
            return (
                <div className="browser-content-contact">
                    <div className="contact">
                        <p>You can contact me at:</p>
                        <p>Email: holt.christopher1@gmail.com</p>
                        <p>Phone: 0408 469 577</p>
                        <p>Github: <a href="https://github.com/Bissmark" target="_blank">https://github.com/Bissmark</a></p>
                    </div>
                    <img className="" src={MeImage} alt="Picture of Me" />
                </div>
            );
        } else if (url === "skills") {
            return (
                <div className="browser-content">
                    <h1 style={{marginBottom: '20px'}}>Here are some of my skills:</h1>
                    <div className="skills-list">
                        <p>HTML <img src={HTMLIcon} alt="HTML Icon" /></p>
                        <p>CSS<img src={CSSIcon} alt="CSS Icone" /></p>
                        <p>JavaScript<img src={JavascriptIcon} alt="Javascript Icon" /></p>
                        <p>Tailwind<img src={HTMLIcon} alt="Tailwind Icon" /></p>
                        <p>Firebase<img src={HTMLIcon} alt="Firebase Icon" /></p>
                        <p>Supabase<img src={HTMLIcon} alt="Supabase Icon" /></p>
                        <p>React<img src={ReactIcon} alt="React Icon" /></p>
                        <p>Express<img src={ExpressIcon} alt="Express Icon" /></p>
                        <p>MongoDB<img src={MongoDBIcon} alt="MongoDB Icon" /></p>
                        <p>Python<img src={PythonIcon} alt="Python Icon" /></p>
                        <p>C#<img src={CSharpIcon} alt="C# Icon" /></p>
                        <p>Unity<img src={HTMLIcon} alt="Unity Icon" /></p>
                        <p>Git<img src={HTMLIcon} alt="Git Icon" /></p>
                        <p>C++<img src={CplusplusIcon} alt="C++ Icon" /></p>
                        <p>Raylib<img src={HTMLIcon} alt="Raylib Icon" /></p>
                        <p>OpenGL<img src={HTMLIcon} alt="OpenGL Icon" /></p>
                    </div>
                </div>
            );
        }
    }

    return (
        <Draggable
            handle=".browser-header"
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
        >
            <div className="browser-header" onMouseDown={bringToFront}>
                <span>My Browser</span>
                <div className="browser-controls">
                    <button className="control-btn-browser min-btn">-</button>
                    <button className="control-btn-browser max-btn" style={{marginBottom: '5px'}} onClick={toggleFullScreen}>□</button>
                    <button className="control-btn-browser close-btn" onClick={onClose}>X</button>
                </div>
            </div>

            <div className="browser-url-bar">
                <button onClick={_handleBack}className={`back-button ${previousUrl ? "" : "disabled"}`} disabled={!previousUrl}>←</button>
                <input type="text" value={inputValue} onChange={handleInputChange} onKeyDown={handleInputKeyDown} placeholder="Type a URL and press enter" />
            </div>

            <div className="browser-box">
                {renderContent()}
            </div>

            <div className="browser-footer">
                <p>Powered by React</p>
            </div>

            <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
        </div>
        </Draggable>
    );
};

export default Browser;
