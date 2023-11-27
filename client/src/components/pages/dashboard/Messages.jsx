import styled from "styled-components";

import CreateMessageIcon from "../../utilities/icons/CreateMessageIcon";

const MessagesWrapper = styled.div`
  display: flex;
  overflow-y: auto;

  .messages--side-nav {
    width: 12rem;

    padding-top: 2.5rem;
    border-right: 1px solid var(--color-dark-gray);
  }

  .messages--side-nav-header {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 0 2rem 0 2rem;
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
    padding: 0 2rem 0 2rem;
  }

  .messages--side-nav-msg-container {
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow-y: scroll;
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
          <CreateMessageIcon width="2.7rem" height="2.7rem" />
        </div>
        <p className="messages--side-nav-sub-header">Messages</p>
        <div className="messages--side-nav-msg-container">
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
          <MessagesPreviewRow></MessagesPreviewRow>
        </div>
      </div>
    </MessagesWrapper>
  );
};

const MessagesPreviewRowWrapper = styled.div`
  > div {
    padding: 1rem 2rem;
  }

  > div:hover {
    background-color: var(--color-dark-gray);

    cursor: pointer;
  }

  .messages-preview-row--img {
    background-color: blue;

    width: 5.6rem;
    height: 5.6rem;

    border-radius: 100px;
  }

  .messages-preview-row--meta {
    display: none;
  }

  @media (min-width: 900px) {
    > div {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .messages-preview-row--meta {
      display: unset;
    }

    .messages-preview-row--meta-message-name {
      font-size: var(--font-sm-1);
      font-weight: 600;
    }

    .messages-preview-row--meta-message-preview {
      color: var(--color-gray-900);

      font-size: var(--font-sm-0);
    }
  }
`;

const MessagesPreviewRow = () => {
  return (
    <MessagesPreviewRowWrapper>
      <div>
        <div className="messages-preview-row--img"></div>
        <div className="messages-preview-row--meta">
          <p className="messages-preview-row--meta-message-name">AY GC</p>
          <p className="messages-preview-row--meta-message-preview">I have soo many jjk memes and...</p>
        </div>
      </div>
    </MessagesPreviewRowWrapper>
  );
};

export default Messages;
