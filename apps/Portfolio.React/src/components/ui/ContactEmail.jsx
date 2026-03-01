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
            style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
        >
            jeffstagg&#64;protonmail.com
        </a>
    )
}

export default ContactEmail