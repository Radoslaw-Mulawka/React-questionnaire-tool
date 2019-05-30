import React from 'react';


const Footer = ()=>{

    const date = new Date();
    const currentYear = date.getFullYear();
    return(
        <footer>
            <span>© {currentYear} SI-Consulting. Version 1.0</span>
        </footer>
    )
}
export default Footer;
