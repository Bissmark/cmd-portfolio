import './Browser.css';

const Browser = ({ onClose }) => {
    return (
        <div className="browser-window">
            {/* Header */}
            <div className="browser-header">
                <span>My Browser</span>
                <div className="browser-controls">
                    <button className="control-btn min-btn">-</button>
                    <button className="control-btn max-btn">+</button>
                    <button className="control-btn close-btn" onClick={onClose}>X</button>
                </div>
            </div>

            {/* URL Bar */}
            <div className="browser-url-bar">
                <input type="text" placeholder='https://github.com/Bissmark' />
            </div>

            {/* Content Area */}
            <div className="browser-content">
                <p>Welcome to My Browser, here will be information about each of the projects that I have.</p>
            </div>
        </div>
    );
};

export default Browser;
