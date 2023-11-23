import styled from "styled-components";
import ProfileStat from "./ProfileStat";
import { useContext } from "react";
import { ProfileContext } from "../../pages/dashboard/Profile";

const ProfileStatsWrapper = styled.div`
  > section.mid-screen {
    display: none;
  }

  > section.small-screen {
    display: flex;
    align-items: center;
    justify-content: space-around;

    height: 6rem;

    border-bottom: 1px solid var(--color-darker-gray);
  }

  > section.small-screen > button {
    color: var(--color-white);
  }

  > section.small-screen > p,
  > section.small-screen > button {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 5.9rem;

    font-size: var(--font-sm-1);
    font-family: inherit;
  }

  > section.small-screen > p span,
  > section.small-screen > button span {
    color: var(--color-gray);
  }

  @media (min-width: 767px) {
    > section.mid-screen {
      display: flex;
      align-items: flex-start;
      gap: 3rem;

      position: relative;
      bottom: 20%;

      font-size: var(--font-sm-1);
    }

    > section.mid-screen > button {
      color: var(--color-white);

      height: 2.1rem;

      font-size: var(--font-sm-1);
    }

    > section.small-screen {
      display: none;
    }
  }
`;

const ProfileStats = ({ screenType }) => {
  const { data } = useContext(ProfileContext);

  return (
    <ProfileStatsWrapper>
      <section className={`${screenType}-screen`}>
        <ProfileStat
          stat={data.numPosts}
          statOf={" posts"}
        />
        <ProfileStat
          stat={data.followers.length}
          statOf={" followers"}
          isLink={true}
        />
        <ProfileStat
          stat={data.following.length}
          statOf={" following"}
          isLink={true}
        />
      </section>
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
