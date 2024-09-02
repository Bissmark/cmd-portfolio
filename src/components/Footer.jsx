import './Footer.css';

const Footer = () => {
    return (
        <div className="footer">
            <div>

            </div>
            <div className='time-date'>
                <p style={{ marginBottom: '2px'}}>{new Date().toLocaleTimeString()}</p>
                <p>{new Date().toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default Footer;