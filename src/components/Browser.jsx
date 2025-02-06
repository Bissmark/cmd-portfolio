import './Browser.css';

const Browser = ({ onClose }) => {
    return (
        <div className="browser-window">
            {/* Header */}
            <div className="browser-header">
                <div className="browser-controls">
                    <button className="control-btn close-btn" onClick={onClose}></button>
                    <button className="control-btn min-btn"></button>
                    <button className="control-btn max-btn"></button>
                </div>
                <span>My Computer</span>
            </div>

            {/* URL Bar */}
            <div className="browser-url-bar">
                <input type="text" placeholder='https://github.com/Bissmark' />
            </div>

            {/* Content Area */}
            <div className="browser-content">
                <p>Welcome to My Computer! Here you can explore your files.</p>
            </div>
        </div>
    );
};

export default Browser;
