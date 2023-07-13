import React, { useState, useEffect } from "react";

const Footer = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const linksArray = [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/raymondlang/",
        src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      },
      {
        name: "Github",
        url: "https://github.com/raymondlang",
        src: "https://github.githubassets.com/favicon.ico",
      },
      {
        name: "Other projects",
        url: "https://raylang.github.io/",
        src: "https://avatars.githubusercontent.com/u/14175182?v=4",
      },
      {
        name: "Resume",
        url: "https://raylang.github.io/resume/",
        src: "https://upload.wikimedia.org/wikipedia/commons/9/90/Resume_logo.jpeg",
      },
    ];
    setLinks(linksArray);
  }, []);

  return (
    <section className="footer-container">
      <footer>
        <ul className="footer-links">
          {links.map((link, idx) => (
            <li key={idx} className="footer-link-item">
              <a href={link.url} target="_blank" rel="noreferrer">
                <img src={link.src} alt={link.name} className="footer-image" />
              </a>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <p id="footer-copyright">&copy; 2023 Ray Lang</p>
      </footer>
    </section>
  );
};

export default Footer;
