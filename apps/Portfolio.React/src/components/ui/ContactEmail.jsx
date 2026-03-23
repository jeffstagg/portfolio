import T from "../../theme.js";

const ContactEmail = ({ label }) => {
    const user   = 'jeffstagg'
    const domain = 'protonmail.com'
    const email  = () => `${user}@${domain}`

    return (
        <a
            href="#"
            onClick={e => { e.preventDefault(); window.location.href = `mailto:${email()}`; }}
            aria-label="Contact via Email"
            style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.target.style.color = T.cyan)}
            onMouseLeave={e => (e.target.style.color = '')}
        >
            {label ?? email()}
        </a>
    )
}

export default ContactEmail