import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./Browser.css";

// Set these to your image imports or null to use emoji fallbacks
// Example: import CryptoImage from "../assets/images/Crypto-Image.png";
const CryptoImage = null;
const GeoWhereImage = null;
const TrelloImage = null;
const ToDoImage = null;
const MeImage = null;

// Skill icons - set to null to use emojis
const CplusplusIcon = null;
const PythonIcon = null;
const ReactIcon = null;
const CSSIcon = null;
const HTMLIcon = null;
const MongoDBIcon = null;
const JavascriptIcon = null;
const CSharpIcon = null;
const ExpressIcon = null;

const projectData = {
    "project-crypto": {
        name: "Ceege Crypto",
        description: "A cryptocurrency tracker that allows users to view the latest prices, market caps, and trends.",
        tech: "React, Chart.js, CoinGecko API",
        img: CryptoImage,
        icon: "📈",
        link: "https://github.com/Bissmark/Crypto-Page",
        live: "https://ceegecrypto.firebaseapp.com/"
    },
    "project-geowhere": {
        name: "GeoWhere",
        description: "A Streetview location guessing game where players place a marker and earn points based on proximity.",
        tech: "React, CSS, HTML, Supabase",
        img: GeoWhereImage,
        icon: "🌍",
        link: "https://github.com/Bissmark/GeoWhere-Testing",
        live: "https://geowhere.netlify.app/"
    },
    "project-trello": {
        name: "Trello Clone",
        description: "A clone of the popular project management tool with draggable boards and cards.",
        tech: "React, HTML, CSS, Express, MongoDB, Node",
        img: TrelloImage,
        icon: "📋",
        link: "https://github.com/Bissmark/trello",
        live: "https://trello-frontend-q3pp.onrender.com/"
    },
    "project-todo": {
        name: "To-Do List",
        description: "A simple task management application.",
        tech: "React, HTML, CSS",
        img: ToDoImage,
        icon: "✅",
        link: "https://github.com/Bissmark/School-Notes-V2",
        live: "https://school-notes-backend.onrender.com/"
    },
    "project-snakeraylib": {
        name: "Snake Game",
        description: "A simple snake game built using the Raylib library.",
        tech: "C++, Raylib, WebAssembly",
        img: null,
        icon: "🐍",
        link: "/snakeraylib",
        isGame: true
    },
    "project-bulletfun": {
        name: "Bullet Fun",
        description: "A simple bullet hell game built using the Raylib library.",
        tech: "C++, Raylib, CMake",
        img: null,
        icon: "🎮",
        link: "https://github.com/Bissmark/bulletFun",
        isGame: true
    },
    "project-hudEngine": {

    },
    "project-colonySimulator": {
        name: "Colony Simulator",
        description: "A Rimworld / Kenshi inspired high fantasy colony simulator",
        tech: 'Unity, C#',
        img: null,
        icon: "",
        link: 'colonySimulator'
    }
};

const skillsData = [
    { name: "HTML", icon: HTMLIcon, emoji: "🌐" },
    { name: "CSS", icon: CSSIcon, emoji: "🎨" },
    { name: "JavaScript", icon: JavascriptIcon, emoji: "⚡" },
    { name: "React", icon: ReactIcon, emoji: "⚛️" },
    { name: "Express", icon: ExpressIcon, emoji: "🚂" },
    { name: "MongoDB", icon: MongoDBIcon, emoji: "🍃" },
    { name: "Python", icon: PythonIcon, emoji: "🐍" },
    { name: "C#", icon: CSharpIcon, emoji: "🎯" },
    { name: "C++", icon: CplusplusIcon, emoji: "⚙️" },
    { name: "Unity", icon: null, emoji: "🎮" },
    { name: "Git", icon: null, emoji: "📦" },
    { name: "Raylib", icon: null, emoji: "🕹️" },
];

const Browser = ({ onClose, registerProgram, unregisterProgram, bringToFront, openGameWindow }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 900, height: 650 });
    const [position, setPosition] = useState({ x: 80, y: 40 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 900, height: 650, x: 80, y: 40 });
    const [inputValue, setInputValue] = useState("home");
    const [url, setUrl] = useState("home");
    const [history, setHistory] = useState(["home"]);
    const [historyIndex, setHistoryIndex] = useState(0);

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

    const handleInputChange = (e) => {
        setInputValue(e.target.value.toLowerCase().trim());
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter") {
            navigateUrl(inputValue);
        }
    };

    const navigateUrl = (newUrl) => {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newUrl);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
        setUrl(newUrl);
        setInputValue(newUrl);
    };

    const handleBack = () => {
        if (historyIndex > 0) {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setUrl(history[newIndex]);
            setInputValue(history[newIndex]);
        }
    };

    const handleForward = () => {
        if (historyIndex < history.length - 1) {
            const newIndex = historyIndex + 1;
            setHistoryIndex(newIndex);
            setUrl(history[newIndex]);
            setInputValue(history[newIndex]);
        }
    };

    const handleHome = () => {
        navigateUrl("home");
    };

    const handleRefresh = () => {
        // Just re-render
        setUrl(url);
    };

    const getPageTitle = () => {
        if (projectData[url]) return projectData[url].name + " - Internet Explorer";
        switch (url) {
            case "home": return "Welcome - Internet Explorer";
            case "about": return "About Me - Internet Explorer";
            case "projects": return "Projects - Internet Explorer";
            case "skills": return "Skills - Internet Explorer";
            case "contact": return "Contact - Internet Explorer";
            default: return "Internet Explorer";
        }
    };

    const renderContent = () => {
        // Projects list
        if (url === "projects") {
            return (
                <div className="browser-content">
                    <h1>📁 My Projects</h1>
                    <p>Click on a project to learn more about it.</p>
                    <div className="projects-list">
                        {Object.keys(projectData).map((projectKey) => (
                            <div 
                                key={projectKey} 
                                className="project-card"
                                onClick={() => navigateUrl(projectKey)}
                            >
                                <h3>{projectData[projectKey].icon} {projectData[projectKey].name}</h3>
                                <p>{projectData[projectKey].tech}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Colony Simulator page
        if (url === "project-colonySimulator") {
            return (
                <div className="browser-content">
                    <h1>Colony Simulator (Name subject to change)</h1>
                    <p>A Rimworld and Kenshi Inspired colony simulator</p>
                    <p><strong>Technologies:</strong> C#, Unity</p>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <p style={{ marginBottom: '10px' }}>Colony Simulator demo coming soon!</p>
                    </div>
                </div>
            );
        }
        
        // Bullet fun embed
        if (url === "project-bulletfun") {
            return (
                <div className="browser-content">
                    <h1>🎮 Bullet Fun</h1>
                    <p>A bullet hell style game built using C++ and the Raylib library.</p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/Bissmark/bulletFun" target="_blank" rel="noopener noreferrer" style={{ color: '#0000ee', textDecoration: 'underline', cursor: 'pointer' }}>View Repository</a></p>
                    <p><strong>Technologies:</strong> C++, Raylib, CMake, WebAssembly</p>
                    <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <button 
                            onClick={() => openGameWindow && openGameWindow("/bulletFun/BulletFun.html", "Bullet Fun")}
                            style={{ 
                                padding: '12px 24px', 
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: '#0078d7',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                        >
                            🎮 Launch Bullet Fun
                        </button>
                    </div>
                </div>
            );
        }
        if (url === "project-hudEngine") {
            return (
                <div className="browser-content">
                    <h1>Hud Engine (Name subject to change)</h1>
                    <p>A hobby Game Engine to learn about OpenGL better</p>
                    <p><strong>Technologies:</strong> C++, OpenGL, CMake, SDL3</p>
                    {/* <div style={{ textAlign: "center", margin: "20px 0" }}>
                        <iframe
                            src="/bulletFun/BulletFun.html"
                            width="450"
                            height="350"
                            style={{ border: "2px solid #c0c0c0", borderRadius: "5px" }}
                            title="Bullet Fun"
                        />
                    </div> */}
                </div>
            );
        }


        // Individual project page
        if (projectData[url]) {
            const project = projectData[url];
            return (
                <div className="browser-content project-detail">
                    <h1>{project.icon} {project.name}</h1>
                    {project.img ? (
                        <a href={project.live || project.link} target="_blank" rel="noopener noreferrer">
                            <img src={project.img} alt={project.name} className="project-image" />
                        </a>
                    ) : (
                        <div style={{ fontSize: '80px', margin: '20px 0' }}>{project.icon}</div>
                    )}
                    <p>{project.description}</p>
                    <p><strong>Technologies:</strong> {project.tech}</p>
                    
                    {/* Launch button for games */}
                    {project.isGame && url === "project-snakeraylib" && openGameWindow && (
                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                            <button 
                                onClick={() => openGameWindow("/snakeraylib/index.html", "Snake Game")}
                                style={{ 
                                    padding: '12px 24px', 
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    backgroundColor: '#0078d7',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    marginBottom: '15px'
                                }}
                            >
                                🎮 Launch Game
                            </button>
                        </div>
                    )}
                    
                    <div className="project-links">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            📂 GitHub Repository
                        </a>
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer">
                                🌐 Live Demo
                            </a>
                        )}
                    </div>
                </div>
            );
        }

        // Home page
        if (url === "home") {
            return (
                <div className="browser-content">
                    <div className="welcome-header">
                        <h1>🌐 Welcome to My Portfolio</h1>
                    </div>
                    <div className="welcome-section">
                        <div className="welcome-text">
                            <p>Welcome to the browser portion of my portfolio! There are multiple ways to explore my work:</p>
                            <ul>
                                <li>Use the <strong>Start Menu</strong></li>
                                <li>Use the <strong>Command Prompt</strong> (PowerShell)</li>
                                <li>Use <strong>My Computer</strong></li>
                                <li>Or navigate using this <strong>Browser</strong></li>
                            </ul>
                            <p>Type in the address bar: <code>projects</code>, <code>skills</code>, <code>about</code>, or <code>contact</code> and press Enter.</p>
                        </div>
                        <div className="welcome-nav">
                            <div className="home-buttons">
                                <button onClick={() => navigateUrl("about")}>
                                    <span className="btn-icon">👤</span>
                                    About Me
                                </button>
                                <button onClick={() => navigateUrl("skills")}>
                                    <span className="btn-icon">⚡</span>
                                    My Skills
                                </button>
                                <button onClick={() => navigateUrl("projects")}>
                                    <span className="btn-icon">📁</span>
                                    View Projects
                                </button>
                                <button onClick={() => navigateUrl("contact")}>
                                    <span className="btn-icon">📧</span>
                                    Contact Me
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // About page
        if (url === "about") {
            return (
                <div className="browser-content">
                    <h1>👤 About Me</h1>
                    <p>I am a Sydney-based Junior Full-Stack Developer with a deep passion for technology and coding. I love learning different languages and frameworks. I thrive on problem-solving, working under pressure, and tackling challenges head-on.</p>
                    <p>My journey in programming started in 2010 with game development, where I worked for two years before exploring different fields, including gardening and racehorse handling. These experiences taught me adaptability, perseverance, and the ability to take projects from concept to completion.</p>
                    <p>In my free time, I love playing a wide variety of video games—from platformers and RPGs to MMOs and soccer simulators. I'm also an avid reader of fantasy novels, enjoy cooking, and appreciate walking.</p>
                    
                    <div className="about-me-skills">
                        <div className="about-card">
                            <div className="about-card-icon">🎮</div>
                            <p>Games Programmer</p>
                        </div>
                        <div className="about-card">
                            <div className="about-card-icon">💻</div>
                            <p>Fullstack Developer</p>
                        </div>
                        <div className="about-card">
                            <div className="about-card-icon">👨‍👩‍👧</div>
                            <p>Loving Husband & Father</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Contact page
        if (url === "contact") {
            return (
                <div className="browser-content-contact">
                    <div className="contact-card">
                        <h2>📧 Contact Me</h2>
                        <p><strong>Email:</strong> holt.christopher1@gmail.com</p>
                        <p><strong>Phone:</strong> 0408 469 577</p>
                        <p><strong>GitHub:</strong> <a href="https://github.com/Bissmark" target="_blank" rel="noopener noreferrer">github.com/Bissmark</a></p>
                        <p><strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Connect with me</a></p>
                    </div>
                    {MeImage ? (
                        <img src={MeImage} alt="Christopher Holt" className="contact-image" />
                    ) : (
                        <div style={{ fontSize: '100px' }}>👨‍💻</div>
                    )}
                </div>
            );
        }

        // Skills page
        if (url === "skills") {
            return (
                <div className="browser-content">
                    <h1>⚡ My Skills</h1>
                    <p>Here are the technologies and tools I work with:</p>
                    <div className="skills-list">
                        {skillsData.map((skill, index) => (
                            <div key={index} className="skill-item">
                                {skill.icon ? (
                                    <img src={skill.icon} alt={skill.name} />
                                ) : (
                                    <span className="skill-icon">{skill.emoji}</span>
                                )}
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // 404
        return (
            <div className="browser-content">
                <h1>❌ Page Not Found</h1>
                <p>The page "{url}" could not be found.</p>
                <p>Try typing: <code>home</code>, <code>projects</code>, <code>about</code>, <code>skills</code>, or <code>contact</code></p>
                <button onClick={handleHome} style={{ marginTop: '15px', padding: '8px 16px', cursor: 'pointer' }}>
                    🏠 Go Home
                </button>
            </div>
        );
    };

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
                onMouseLeave={handleMouseUp}
                onClick={() => bringToFront("Browser")}
            >
                {/* Title Bar */}
                <div className="browser-header">
                    <span>
                        <span className="browser-header-icon">🌐</span>
                        {getPageTitle()}
                    </span>
                    <div className="browser-controls">
                        <button className="control-btn-browser min-btn" title="Minimize">_</button>
                        <button className="control-btn-browser max-btn" title={isFullScreen ? "Restore" : "Maximize"} onClick={toggleFullScreen}>
                            {isFullScreen ? "❐" : "□"}
                        </button>
                        <button className="control-btn-browser close-btn" title="Close" onClick={onClose}>×</button>
                    </div>
                </div>

                {/* Menu Bar */}
                <div className="browser-menu-bar">
                    <span className="menu-item">File</span>
                    <span className="menu-item">Edit</span>
                    <span className="menu-item">View</span>
                    <span className="menu-item">Favorites</span>
                    <span className="menu-item">Tools</span>
                    <span className="menu-item">Help</span>
                </div>

                {/* Toolbar */}
                <div className="browser-toolbar">
                    <button 
                        className="toolbar-btn" 
                        onClick={handleBack}
                        disabled={historyIndex <= 0}
                        title="Back"
                    >
                        <span className="toolbar-btn-icon">⬅️</span>
                        Back
                    </button>
                    <button 
                        className="toolbar-btn" 
                        onClick={handleForward}
                        disabled={historyIndex >= history.length - 1}
                        title="Forward"
                    >
                        <span className="toolbar-btn-icon">➡️</span>
                        Forward
                    </button>
                    <button className="toolbar-btn" onClick={handleRefresh} title="Refresh">
                        <span className="toolbar-btn-icon">🔄</span>
                        Refresh
                    </button>
                    <button className="toolbar-btn" onClick={handleHome} title="Home">
                        <span className="toolbar-btn-icon">🏠</span>
                        Home
                    </button>
                    <div className="toolbar-separator" />
                    <button className="toolbar-btn" title="Search">
                        <span className="toolbar-btn-icon">🔍</span>
                        Search
                    </button>
                    <button className="toolbar-btn" title="Favorites">
                        <span className="toolbar-btn-icon">⭐</span>
                        Favorites
                    </button>
                    <button className="toolbar-btn" title="History">
                        <span className="toolbar-btn-icon">📜</span>
                        History
                    </button>
                </div>

                {/* Address Bar */}
                <div className="browser-url-bar">
                    <span className="address-label">Address</span>
                    <div className="address-bar-container">
                        <span className="address-bar-icon">📄</span>
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={handleInputChange} 
                            onKeyDown={handleInputKeyDown} 
                            placeholder="Type a page name and press Enter" 
                        />
                    </div>
                    <button className="go-btn" onClick={() => navigateUrl(inputValue)}>
                        Go →
                    </button>
                    <span className="links-label">Links</span>
                </div>

                {/* Content */}
                <div className="browser-box">
                    {renderContent()}
                </div>

                {/* Status Bar */}
                <div className="browser-footer">
                    <div className="footer-left">
                        <span className="footer-icon">✅</span>
                        <p>Done</p>
                    </div>
                    <p>🌐 Internet</p>
                </div>

                <div className="resize-handle bottom-right" onMouseDown={(e) => handleMouseDown(e, "bottom-right")} />
            </div>
        </Draggable>
    );
};

export default Browser;