import { useState, useEffect, useRef } from 'react';
import './StartMenu.css';

const StartMenu = ({ isVisible, onClose }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [hoveredItem, setHoveredItem] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    useEffect(() => {
        if (!isVisible) {
            setSelectedItem(null);
            setHoveredItem(null);
        }
    }, [isVisible]);

    const menuItems = [
        { id: 'about', icon: '👤', title: 'About Me', subtitle: 'Learn about me' },
        { id: 'projects', icon: '📁', title: 'My Projects', subtitle: 'View my portfolio' },
        { id: 'skills', icon: '⚡', title: 'Skills', subtitle: 'Technologies I use' },
        { id: 'contact', icon: '📧', title: 'Contact Me', subtitle: 'Get in touch' },
    ];

    const placesItems = [
        { id: 'documents', icon: '📄', title: 'My Documents' },
        { id: 'pictures', icon: '🖼️', title: 'My Pictures' },
        { id: 'music', icon: '🎵', title: 'My Music' },
        { id: 'computer', icon: '💻', title: 'My Computer' },
    ];

    const getDetailContent = () => {
        const item = selectedItem || hoveredItem;
        
        switch (item) {
            case 'about':
                return (
                    <div>
                        <h3>👤 About Me</h3>
                        <p>I am a Sydney-based Junior Full-Stack Developer with a deep passion for technology and coding.</p>
                        <p>I love learning different languages and frameworks. I thrive on problem-solving, working under pressure, and tackling challenges head-on.</p>
                        <p>My journey in programming started in 2010 with game development, where I worked for two years before exploring different fields.</p>
                    </div>
                );
            case 'projects':
                return (
                    <div>
                        <h3>📁 My Projects</h3>
                        <ul>
                            <li>Ceege Crypto</li>
                            <li>GeoWhere</li>
                            <li>Trello Clone</li>
                            <li>Snake Raylib</li>
                            <li>Bullet Fun</li>
                            <li>To-Do List</li>
                        </ul>
                        <p style={{ fontStyle: 'italic', marginTop: '10px' }}>
                            Double-click My Computer to explore!
                        </p>
                    </div>
                );
            case 'skills':
                return (
                    <div>
                        <h3>⚡ Skills</h3>
                        <ul>
                            <li>JavaScript / React</li>
                            <li>Node.js / Express</li>
                            <li>C++ / C#</li>
                            <li>Unity Game Engine</li>
                            <li>Python</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                );
            case 'contact':
                return (
                    <div>
                        <h3>📧 Contact Me</h3>
                        <p><strong>Email:</strong><br/>holt.christopher1@gmail.com</p>
                        <p><strong>Phone:</strong><br/>0408 469 577</p>
                        <p><strong>GitHub:</strong><br/>
                            <a href="https://github.com/Bissmark" target="_blank" rel="noopener noreferrer">
                                github.com/Bissmark
                            </a>
                        </p>
                    </div>
                );
            default:
                return (
                    <div>
                        <h3>Welcome</h3>
                        <p>Select an item from the menu to learn more about me and my work.</p>
                    </div>
                );
        }
    };

    const handleItemClick = (itemId) => {
        setSelectedItem(itemId);
    };

    return (
        <div ref={menuRef} className={`start-menu ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="start-menu-header">
                <div className="user-avatar">👨‍💻</div>
                <span className="user-name">Christopher Holt</span>
                <button className="footer-btn" onClick={onClose}><span className="footer-btn-icon">🔓</span>
                    Log Off
                </button>    
                <button className="footer-btn" onClick={onClose}>
                    <span className="footer-btn-icon">⏻</span>
                    Turn Off Computer
                </button>
            </div>

            <div className="start-menu-content">
                <div className="start-menu-leftside">
                    <div className="programs-section">
                        {menuItems.map((item) => (
                            <div
                                key={item.id}
                                className={`menu-item ${selectedItem === item.id ? 'selected' : ''}`}
                                onClick={() => handleItemClick(item.id)}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="menu-item-icon">{item.icon}</div>
                                <div className="menu-item-text">
                                    <span className="menu-item-title">{item.title}</span>
                                    <span className="menu-item-subtitle">{item.subtitle}</span>
                                </div>
                            </div>
                        ))}
                        
                        <div className="menu-separator" />
                        
                        <div className="recent-programs">
                            <div className="recent-label">Recently Used</div>
                            <div 
                                className="menu-item"
                                onMouseEnter={() => setHoveredItem(null)}
                            >
                                <div className="menu-item-icon">🌐</div>
                                <div className="menu-item-text">
                                    <span className="menu-item-title">Internet Explorer</span>
                                </div>
                            </div>
                            <div 
                                className="menu-item"
                                onMouseEnter={() => setHoveredItem(null)}
                            >
                                <div className="menu-item-icon">📝</div>
                                <div className="menu-item-text">
                                    <span className="menu-item-title">Notepad</span>
                                </div>
                            </div>
                            <div 
                                className="menu-item"
                                onMouseEnter={() => setHoveredItem(null)}
                            >
                                <div className="menu-item-icon">🎨</div>
                                <div className="menu-item-text">
                                    <span className="menu-item-title">Paint</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="all-programs">
                        All Programs
                        <span className="all-programs-arrow">▶</span>
                    </div>
                </div>

                <div className="start-menu-rightside">
                    <div className="detail-panel">
                        {getDetailContent()}
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default StartMenu;