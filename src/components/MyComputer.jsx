import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import './MyComputer.css';

// UPDATE THESE PATHS to match your project structure, or leave as null to use emojis
// Example: import ChromeImage from "../assets/images/Chrome.png";
const ChromeImage = null;  // Set to your image import or null for emoji
const FolderImage = null;  // Set to your image import or null for emoji

const ProjectFiles = {
    ceegeCrypto: {
        name: 'CeegeCrypto',
        github: 'https://github.com/Bissmark/Crypto-Page',
        hosted: 'https://ceegecrypto.firebaseapp.com/'
    },
    geoWhere: {
        name: 'GeoWhere',
        github: 'https://github.com/Bissmark/GeoWhere-Testing',
        hosted: 'https://geowhere.netlify.app/'
    },
    trello: {
        name: 'Trello',
        github: 'https://github.com/Bissmark/trello',
        hosted: 'https://trello-frontend-q3pp.onrender.com/'
    },
    snakeRaylib: {
        name: 'SnakeRaylib',
        github: 'https://github.com/Bissmark/SnakeRaylib',
        hosted: null
    },
    bulletFun: {
        name: 'BulletFun',
        github: 'https://github.com/Bissmark/bulletFun',
        hosted: null
    },
    todoApp: {
        name: 'To-Do List',
        github: 'https://github.com/Bissmark/School-Notes-V2',
        hosted: 'https://school-notes-backend.onrender.com/'
    }
};

const MyComputer = ({ onClose, registerProgram, unregisterProgram, bringToFront }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [size, setSize] = useState({ width: 800, height: 600 });
    const [position, setPosition] = useState({ x: 100, y: 50 });
    const [resizing, setResizing] = useState(false);
    const [resizeDirection, setResizeDirection] = useState(null);
    const [prevSize, setPrevSize] = useState({ width: 800, height: 600, x: 100, y: 50 });
    const [searchQuery, setSearchQuery] = useState('');
    const [openedProject, setOpenedProject] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);

    const windowRef = useRef(null);

    useEffect(() => {
        registerProgram("My Computer");
        return () => { unregisterProgram("My Computer") };
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

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

    const filteredProjects = Object.values(ProjectFiles).filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleFileClick = (project, e) => {
        if (e.detail === 2) {
            // Double click - open folder
            setOpenedProject(project);
            setSelectedFile(null);
        } else {
            // Single click - select
            setSelectedFile(project.name);
        }
    };

    const handleContentClick = (e) => {
        // Clicking empty area deselects
        if (e.target.classList.contains('myComputer-content')) {
            setSelectedFile(null);
        }
    };

    const getAddressPath = () => {
        if (openedProject) {
            return `C:\\Projects\\${openedProject.name}`;
        }
        return "C:\\Projects";
    };

    const getTotalSize = () => {
        // Fake file sizes for authenticity
        return "12.4 MB";
    };

    return (
        <Draggable
            handle=".myComputer-header"
            position={position}
            onDrag={(e, data) => {
                setPosition({ x: data.x, y: data.y });
            }}
            bounds={{ left: 0, top: 0, right: window.innerWidth - size.width, bottom: window.innerHeight - size.height }}
            disabled={isFullScreen}
        >
            <div
                ref={windowRef}
                className={`myComputer-window ${isFullScreen ? 'fullscreen' : ''}`}
                style={{ width: size.width, height: size.height }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={() => bringToFront("My Computer")}
            >
                {/* Title Bar */}
                <div className="myComputer-header">
                    <span>
                        <span style={{ fontSize: '14px' }}>💻</span>
                        {openedProject ? openedProject.name : "My Computer"}
                    </span>
                    <div className="myComputer-controls">
                        <button className="control-btn min-btn" title="Minimize">_</button>
                        <button className="control-btn max-btn" title={isFullScreen ? "Restore" : "Maximize"} onClick={toggleFullScreen}>
                            {isFullScreen ? "❐" : "□"}
                        </button>
                        <button className="control-btn close-btn" title="Close" onClick={onClose}>×</button>
                    </div>
                </div>

                {/* Menu Bar */}
                <div className="myComputer-menu-bar">
                    <span className="menu-item">File</span>
                    <span className="menu-item">Edit</span>
                    <span className="menu-item">View</span>
                    <span className="menu-item">Favorites</span>
                    <span className="menu-item">Tools</span>
                    <span className="menu-item">Help</span>
                </div>

                {/* Toolbar */}
                <div className="myComputer-toolbar">
                    <button 
                        className="toolbar-btn" 
                        onClick={() => { setOpenedProject(null); setSelectedFile(null); }}
                        disabled={!openedProject}
                        style={{ opacity: openedProject ? 1 : 0.5 }}
                    >
                        <span>←</span> Back
                    </button>
                    <button className="toolbar-btn" disabled style={{ opacity: 0.5 }}>
                        <span>→</span>
                    </button>
                    <button 
                        className="toolbar-btn"
                        onClick={() => { setOpenedProject(null); setSelectedFile(null); }}
                    >
                        <span>↑</span>
                    </button>
                    <div className="toolbar-separator" />
                    <button className="toolbar-btn">
                        <span>🔍</span> Search
                    </button>
                    <button className="toolbar-btn" onClick={() => setShowSidebar(!showSidebar)}>
                        <span>📁</span> Folders
                    </button>
                    <div className="toolbar-separator" />
                    <button className="toolbar-btn">
                        <span>👁️</span> Views
                    </button>
                </div>

                {/* Address Bar */}
                <div className="myComputer-url-bar">
                    <span className="address-label">Address</span>
                    <div className="address-bar-container">
                        <span style={{ fontSize: '14px' }}>📁</span>
                        <input 
                            type="text" 
                            value={searchQuery || getAddressPath()} 
                            onChange={handleSearchChange}
                            placeholder={getAddressPath()}
                        />
                    </div>
                    <button className="go-btn">
                        Go <span>→</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="myComputer-main">
                    {/* Sidebar */}
                    {showSidebar && (
                        <div className="myComputer-sidebar">
                            <div className="sidebar-section">
                                <div className="sidebar-header">
                                    <span>📋</span> System Tasks
                                </div>
                                <div className="sidebar-content">
                                    <div className="sidebar-link">
                                        <span>📊</span> View system information
                                    </div>
                                    <div className="sidebar-link">
                                        <span>➕</span> Add or remove programs
                                    </div>
                                    <div className="sidebar-link">
                                        <span>⚙️</span> Change a setting
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <div className="sidebar-header">
                                    <span>📁</span> Other Places
                                </div>
                                <div className="sidebar-content">
                                    <div className="sidebar-link">
                                        <span>🌐</span> My Network Places
                                    </div>
                                    <div className="sidebar-link">
                                        <span>📄</span> My Documents
                                    </div>
                                    <div className="sidebar-link">
                                        <span>🖥️</span> Desktop
                                    </div>
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <div className="sidebar-header">
                                    <span>ℹ️</span> Details
                                </div>
                                <div className="sidebar-content">
                                    {selectedFile ? (
                                        <>
                                            <div><strong>{selectedFile}</strong></div>
                                            <div style={{ color: '#666', marginTop: '5px' }}>Project Folder</div>
                                        </>
                                    ) : (
                                        <div style={{ color: '#666' }}>Select an item to view its details.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* File Content */}
                    <div className="myComputer-content" onClick={handleContentClick}>
                        {openedProject ? (
                            // Inside a project folder
                            <div className="folder-view">
                                    <div 
                                        className={`file ${selectedFile === 'github' ? 'selected' : ''}`}
                                        onClick={(e) => { e.stopPropagation(); setSelectedFile('github'); }}
                                        onDoubleClick={() => window.open(openedProject.github, '_blank')}
                                    >
                                        {ChromeImage ? (
                                            <img src={ChromeImage} className="file-icon" alt="GitHub" />
                                        ) : (
                                            <span className="file-icon" style={{ fontSize: '40px' }}>🌐</span>
                                        )}
                                        <span className="file-name">GitHub Repository</span>
                                    </div>
                                    
                                    {openedProject.hosted && (
                                        <div 
                                            className={`file ${selectedFile === 'hosted' ? 'selected' : ''}`}
                                            onClick={(e) => { e.stopPropagation(); setSelectedFile('hosted'); }}
                                            onDoubleClick={() => window.open(openedProject.hosted, '_blank')}
                                        >
                                            {ChromeImage ? (
                                                <img src={ChromeImage} className="file-icon" alt="Live Site" />
                                            ) : (
                                                <span className="file-icon" style={{ fontSize: '40px' }}>🌐</span>
                                            )}
                                            <span className="file-name">Live Website</span>
                                        </div>
                                    )}
                            </div>
                        ) : (
                            // Project list view
                            <>
                                <div className="content-section">
                                    <div className="content-section-header">
                                        <span style={{ fontSize: '20px' }}>📁</span>
                                        Projects stored on this computer
                                    </div>
                                    <div className="files-grid">
                                        {filteredProjects.length > 0 ? (
                                            filteredProjects.map((project, index) => (
                                                <div 
                                                    key={index} 
                                                    className={`file ${selectedFile === project.name ? 'selected' : ''}`}
                                                    onClick={(e) => handleFileClick(project, e)}
                                                >
                                                    {FolderImage ? (
                                                        <img src={FolderImage} alt="Folder" className="file-icon" />
                                                    ) : (
                                                        <span className="file-icon" style={{ fontSize: '40px' }}>📁</span>
                                                    )}
                                                    <span className="file-name">{project.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="no-files">No files found matching "{searchQuery}"</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Status Bar */}
                <div className="myComputer-footer">
                    <div className="footer-left">
                        <span className="footer-section">
                            {openedProject 
                                ? `${openedProject.hosted ? '2' : '1'} object(s)` 
                                : `${filteredProjects.length} object(s)`
                            }
                        </span>
                        <span className="footer-section">{getTotalSize()}</span>
                    </div>
                    <div 
                        className="resize-handle bottom-right" 
                        onMouseDown={(e) => handleMouseDown(e, "bottom-right")} 
                    />
                </div>
            </div>
        </Draggable>
    );
};

export default MyComputer;