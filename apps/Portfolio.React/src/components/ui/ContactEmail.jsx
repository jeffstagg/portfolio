import T from "../../theme.js";

const ContactEmail = () => {
    const handleClick = () => {
        const user = 'jeffstagg'
        const domain = 'protonmail.com'
        window.location.href = `mailto:${user}@${domain}`
    }

    return (
        <a
            onClick={handleClick}
            href="#"
            aria-label="Contact via Email"
            style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.target.style.color = T.cyan)}
            onMouseLeave={e => (e.target.style.color = '')}
        >
            jeffstagg&#64;protonmail.com
        </a>
    )
}

export default ContactEmail