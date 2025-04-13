import { useState, useEffect, useRef } from 'react';
import './StartMenu.css';

const StartMenu = ({ isVisible, onClose }) => {
    const [selectedItem, setSelectedItem] = useState(null);
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

    const renderRightSide = () => {
        switch (selectedItem) {
            case 'about':
                return (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h2>About Me</h2>
                        <p>I am a Sydney-based Junior Full-Stack Developer with a deep passion for technology and coding. I love learning different languages and frameworks. I thrive on problem-solving, working under pressure, and tackling challenges head-on. I enjoy collaborating with diverse teams, constantly learning, and bringing innovative ideas to life.</p>
                        <p>My journey in programming started in 2010 with game development, where I worked for two years before exploring different fields, including gardening and racehorse handling. These experiences taught me adaptability, perseverance, and the ability to take projects from concept to completion..</p>
                        <p>In my free time, I love playing a wide variety of video games—from platformers and RPGs to MMOs and soccer simulators. I'm also an avid reader of fantasy novels, enjoy cooking, and appreciate walking.</p>
                    </div>
                )
            case 'projects':
                return (
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <h2>Projects</h2>
                        <ul>
                            <li>Ceege Crypto</li>
                            <li>GeoWhere</li>
                            <li>Trello</li>
                            <li>Snake Raylib</li>
                            <li>Bullet Fun</li>
                            <li>To-Do List</li>
                        </ul>
                    </div>
                )
            case 'skills':
                return (
                    <div className='start-menu-skills' style={{display: 'flex', flexDirection: 'column'}}>
                        <h2>Skills</h2>
                        <ul>
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Node.js</li>
                            <li>Express.js</li>
                            <li>C++</li>
                            <li>C#</li>
                            <li>Unity</li>
                            <li>Python</li>
                            <li>MongoDB</li>
                        </ul>
                    </div>
                )
            case 'contact':
                return (
                    <div className='start-menu-contact' style={{display: 'flex', flexDirection: 'column'}}>
                        <h2>You can contact me at:</h2>
                        <p>Email: <span style={{fontSize: '1rem'}}>holt.christopher1@gmail.com</span></p>
                        <p>Phone: <span style={{fontSize: '1rem'}}>0408 469 577</span></p>
                        <p>Github: <span style={{fontSize: '1rem'}}><a href="https://github.com/Bissmark" target="_blank">https://github.com/Bissmark</a></span></p>
                    </div>
                )
            default:
                return null;
        }
    }

    return (
        <div ref={menuRef} className={`start-menu ${isVisible ? 'visible' : 'hidden'}`}>
            <div style={{display: 'flex', height: '100%'}}>
                <div className='start-menu-leftside'>
                    <h2 onClick={() => setSelectedItem('about')}>About Me</h2>
                    <h2 onClick={() => setSelectedItem('projects')}>Projects</h2>
                    <h2 onClick={() => setSelectedItem('skills')}>Skills</h2>
                    <h2 onClick={() => setSelectedItem('contact')}>Contact Me</h2>
                </div>
                <div className='start-menu-rightside'>
                    {renderRightSide()}
                </div>
            </div>
        </div>
    );
}

export default StartMenu;