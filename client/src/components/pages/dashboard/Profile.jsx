import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";

import useScreenSize from "../../../custom-hooks/useScreenSize";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import ProfileContentIcon from "../../utilities/icons/ProfileContentIcon";
import SavedIcon from "../../utilities/icons/SavedIcon";

const ProfileWrapper = styled.div`
  overflow-y: scroll;

  > div {
    position: relative;

    max-width: 99rem;
  }

  .profile--user-information {
    display: grid;
    grid-template-columns: 7.7rem 1fr;
    grid-template-rows: 7.8rem 1fr;
    column-gap: 2rem;
    row-gap: 1.5rem;

    padding: 2rem;
    border-bottom: 1px solid var(--color-darker-gray);
  }

  .profile--user-information > div:nth-child(1) {
    place-self: center;
  }

  .profile--user-information > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  .profile--username {
    font-size: var(--font-sm-3);
  }

  button {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    width: 11.5rem;
    height: 3.2rem;

    font-family: inherit;
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  button:hover {
    cursor: pointer;
  }

  .profile--user-information-stats {
    display: none;
  }

  .profile--bio {
    grid-column: 1 / -1;

    font-size: var(--font-sm-0);

    max-width: 44.5rem;
  }

  /* =================== */

  .profile--stats {
    display: flex;
    align-items: center;
    justify-content: space-around;

    height: 6rem;

    border-bottom: 1px solid var(--color-darker-gray);
  }

  .profile--stats > p {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 5.9rem;

    font-size: var(--font-sm-1);
  }

  .profile--stats > p span {
    color: var(--color-gray);
  }

  /* =================== */

  .profile--user-content > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;

    padding: 0.8rem 0 0.8rem 0;
  }

  .profile--user-content .active svg {
    stroke: var(--color-blue);
    fill: var(--color-blue);
  }

  .profile--content-container {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .profile--content-row-container {
    align-items: stretch;

    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    gap: 0.4rem;
  }

  .profile--content-row-container > div {
    flex: 1 0 0%;

    width: 27vw;
    height: 31.8vw;
    max-width: 32.73rem;
    max-height: 32.73rem;

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  @media (min-width: 767px) {
    .profile--user-information {
      grid-template-columns: 15rem 1fr;
      grid-template-rows: 7.8rem 6rem 1fr;
      column-gap: 2rem;
      row-gap: 1.5rem;
    }

    .profile--user-information > div:nth-child(1) {
      grid-row: 1 / -1;

      position: relative;
      bottom: 3%;
    }

    .profile--user-information > div:nth-child(2) {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
    }

    .profile--user-information-stats {
      display: flex;
      gap: 3rem;

      position: relative;
      bottom: 20%;

      font-size: var(--font-sm-1);
    }

    .profile--bio {
      grid-column: 2 / -1;

      position: relative;
      bottom: 45%;

      height: 7.2rem;
    }

    .profile--stats {
      display: none;
    }
  }
`;

/*
  TODO:
    - bio should be 350 max
*/

const Profile = () => {
  const screenSize = useScreenSize();

  return (
    <ProfileWrapper className="dashboard--outlet">
      <div>
        <section className="profile--user-information">
          <ProfilePicture
            width={screenSize.width >= 767 ? "15rem" : "7.7rem"}
            height={screenSize.width >= 767 ? "15rem" : "7.7rem"}
          />
          <div>
            <p className="profile--username">elias.iv_</p>
            <button className="profile--edit-btn">Edit profile</button>
          </div>
          <div className="profile--user-information-stats">
            <ProfileStat stat={7} statOf={" posts"} />
            <ProfileStat stat={466} statOf={" followers"} />
            <ProfileStat stat={424} statOf={" following"} />
          </div>
          <p className="profile--bio">
            This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my
            bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is
            my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio.
          </p>
        </section>
        <section className="profile--stats">
          <ProfileStat stat={7} statOf={"posts"} />
          <ProfileStat stat={466} statOf={"followers"} />
          <ProfileStat stat={424} statOf={"following"} />
        </section>
        <section className="profile--user-content">
          <nav>
            <NavLink to="/dashboard/profile" end>
              <ProfileContentIcon />
            </NavLink>
            <NavLink to="/dashboard/profile/saved-posts">
              <SavedIcon />
            </NavLink>
          </nav>
          <div className="profile--content-container">
            <div className="profile--content-row-container">
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-1.jpeg')" }}></div>
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-3.jpeg')" }}></div>
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-4.jpg')" }}></div>
            </div>
            <div className="profile--content-row-container">
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-2.png')" }}></div>
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-4.jpg')" }}></div>
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-3.jpeg')" }}></div>
            </div>
            <div className="profile--content-row-container">
              <div style={{ backgroundImage: "url('/src/assets/imgs/luffy-4.jpg')" }}></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </section>
      </div>
    </ProfileWrapper>
  );
};

const ProfileStat = ({ stat, statOf }) => {
  return (
    <p>
      {stat}
      <span>{statOf}</span>
    </p>
  );
};

export default Profile;
