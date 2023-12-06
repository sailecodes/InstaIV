import styled from "styled-components";
import ProfileStat from "./ProfileStat";
import { useContext } from "react";
import { ProfileContext } from "../../pages/dashboard/Profile";

const ProfileStatsWrapper = styled.div`
  grid-row: 3;
  grid-column: 1 / -1;

  display: grid;
  place-items: center;

  span {
    color: var(--color-font-gray);

    font-size: var(--font-sm-1);
  }

  p,
  button {
    color: var(--color-font-white);

    display: flex;
    flex-direction: column;
    align-items: center;

    width: 5.4rem;

    font-size: var(--font-sm-1);
    font-weight: 400;
  }

  section {
    display: flex;
    align-items: center;
    justify-content: space-around;

    height: 100%;
    width: 100%;

    border-top: 1px solid var(--color-darker-gray);
  }

  @media (min-width: 425px) {
    span {
      font-size: var(--font-sm-2);
    }

    p,
    button {
      font-size: var(--font-sm-2);
    }
  }

  @media (min-width: 768px) {
    grid-row: 2;
    grid-column: 2;

    span,
    p,
    button {
      color: var(--color-font-white);
    }

    p,
    button {
      flex-direction: row;
      gap: 0.5rem;

      width: fit-content;
    }

    section {
      position: relative;
      bottom: 80%;

      justify-content: flex-start;
      gap: 2rem;

      border: none;

      padding-left: 0.8rem;
    }
  }
`;

const ProfileStats = () => {
  const { data } = useContext(ProfileContext);

  return (
    <ProfileStatsWrapper>
      <section>
        <ProfileStat
          stat={data.numPosts}
          statOf={" posts"}
        />
        <ProfileStat
          stat={data.followersInfo.length}
          statOf={" followers"}
          isLink={true}
        />
        <ProfileStat
          stat={data.followingInfo.length}
          statOf={" following"}
          isLink={true}
        />
      </section>
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
