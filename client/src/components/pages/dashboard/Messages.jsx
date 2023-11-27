import styled from "styled-components";

import CreateMessageIcon from "../../utilities/icons/CreateMessageIcon";

const MessagesWrapper = styled.div`
  overflow-y: scroll;

  .messages--side-nav {
    background-color: red;

    width: 12rem;
    height: 100%;

    padding: 2.5rem 0 2rem 2rem;
  }

  .messages--side-nav-header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding-right: 2rem;
    margin-bottom: 3rem;
  }

  .messages--side-nav-header svg:hover {
    cursor: pointer;
  }

  .messages--side-nav-header-username {
    display: none;
  }

  .messages--side-nav-sub-header {
    display: none;
  }

  .messages--side-nav-msg-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    overflow-y: scroll;
  }

  .messages--side-nav-msg-container div {
    background-color: blue;

    width: 5.6rem;
    height: 5.6rem;

    border-radius: 100px;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;

    .messages--side-nav {
      padding-top: 2.46rem;
    }
  }

  @media (min-width: 900px) {
    .messages--side-nav {
      width: 40rem;
    }

    .messages--side-nav-header {
      justify-content: space-between;
    }

    .messages--side-nav-header-username {
      display: unset;

      font-size: var(--font-sm-3);
      font-weight: 600;
    }

    .messages--side-nav-sub-header {
      display: block;

      font-size: var(--font-sm-2);
      font-weight: 600;

      margin-bottom: 1.5rem;
    }
  }
`;

const Messages = () => {
  return (
    <MessagesWrapper>
      <div className="messages--side-nav">
        <div className="messages--side-nav-header">
          <p className="messages--side-nav-header-username">admin</p>
          <CreateMessageIcon
            width="2.7rem"
            height="2.7rem"
          />
        </div>
        <p className="messages--side-nav-sub-header">Messages</p>
        <div className="messages--side-nav-msg-container">
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
          <div>asdf</div>
        </div>
      </div>
    </MessagesWrapper>
  );
};

export default Messages;
