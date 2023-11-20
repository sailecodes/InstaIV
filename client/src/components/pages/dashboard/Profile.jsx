import styled from "styled-components";
import { Outlet, NavLink } from "react-router-dom";

import useScreenSize from "../../../custom-hooks/useScreenSize";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import ProfileContentIcon from "../../utilities/icons/ProfileContentIcon";
import SavedIcon from "../../utilities/icons/SavedIcon";

const ProfileWrapper = styled.div`
  max-width: 93.5rem;

  .profile--user-information {
    display: grid;
    grid-template-columns: 7.7rem 1fr;
    grid-template-rows: 7.8rem 1fr;
    column-gap: 2rem;
    row-gap: 1.5rem;

    padding: 2rem;
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

    border: none;
    border-radius: 8px;
  }

  button:hover {
    cursor: pointer;
  }

  .profile--bio {
    grid-column: 1 / -1;

    max-width: 50rem;
  }

  /* =================== */

  .profile--stats {
    display: flex;
    align-items: center;
    justify-content: space-around;

    height: 6rem;

    border-top: 1px solid var(--color-darker-gray);
    border-bottom: 1px solid var(--color-darker-gray);
  }

  .profile--stats > p {
    display: flex;
    flex-direction: column;
    align-items: center;

    font-size: var(--font-sm-1);
  }

  .profile--stats > p span {
    color: var(--color-gray);
  }

  /* =================== */

  .profile--user-content {
    padding: 1rem;
  }

  .profile--user-content > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rem;
  }

  .profile--user-content .active svg {
    stroke: none;
    fill: var(--color-blue);
  }

  .profile--content-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

/*
  TODO:
    - bio should be 370 max
*/

const Profile = () => {
  const screenSize = useScreenSize();

  return (
    <ProfileWrapper>
      <section className="profile--user-information">
        <ProfilePicture width={"7.7rem"} height={"7.7rem"} />
        <div>
          <p className="profile--username">elias.iv_</p>
          <button className="profile--edit-btn">Edit profile</button>
        </div>
        <p className="profile--bio">
          This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my
          bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is
          my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This is my bio. This
          is my bio.
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
          <Outlet />
        </div>
      </section>
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
