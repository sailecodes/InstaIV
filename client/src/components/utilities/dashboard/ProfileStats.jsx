import styled from "styled-components";
import ProfileStat from "./ProfileStat";

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

const ProfileStats = ({ screenType, data, setIsFollowContainerVisible, setIsFollowingClicked }) => {
  return (
    <ProfileStatsWrapper>
      <section className={`${screenType}-screen`}>
        <ProfileStat
          stat={data[0]}
          statOf={" posts"}
          setIsFollowContainerVisible={setIsFollowContainerVisible}
        />
        <ProfileStat
          stat={data[1]}
          statOf={" followers"}
          isLink={true}
          setIsFollowContainerVisible={setIsFollowContainerVisible}
        />
        <ProfileStat
          stat={data[2]}
          statOf={" following"}
          isLink={true}
          setIsFollowContainerVisible={setIsFollowContainerVisible}
          setIsFollowingClicked={setIsFollowingClicked}
        />
      </section>
    </ProfileStatsWrapper>
  );
};

export default ProfileStats;
