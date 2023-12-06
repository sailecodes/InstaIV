import FooterWrapper from "../../../assets/styles/pages/dashboard/FooterWrapper";

const Footer = () => {
  return (
    <FooterWrapper>
      <p>A basic social media app inspired by Instagram and created by Elias IV Roman. Check me out:</p>
      <div>
        <a
          href="https://github.com/sailecodes"
          target="_blank"
          rel="noopener noreferrer">
          Github
        </a>
        <div>&middot;</div>
        <a
          href="https://www.linkedin.com/in/elias-roman-38440028b/"
          target="_blank"
          rel="noopener noreferrer">
          LinkedIn
        </a>
        <div>&middot;</div>
        <a
          href="https://eliasiv-portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer">
          Portfolio
        </a>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
