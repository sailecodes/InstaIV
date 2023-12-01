import styled from "styled-components";

const FooterWrapper = styled.footer`
  display: none;

  @media (min-width: 767px) {
    display: unset;

    width: 30rem;

    margin-left: 7rem;

    > p {
      color: var(--color-gray);

      font-size: var(--font-sm-0);
    }

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    > div div {
      color: var(--color-blue);
    }

    a {
      color: var(--color-blue);

      font-size: var(--font-sm-0);
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <p>A basic social media app inspired by Instagram and created by Elias IV Roman. Check me out:</p>
      <div>
        <a href="https://github.com/sailecodes" target="_blank" rel="noopener noreferrer">
          Github
        </a>
        <div>&middot;</div>
        <a href="https://www.linkedin.com/in/elias-roman-38440028b/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <div>&middot;</div>
        <a href="https://youtu.be/dQw4w9WgXcQ?si=KayBtNU2jAc3Kaop" target="_blank" rel="noopener noreferrer">
          Portfolio
        </a>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
