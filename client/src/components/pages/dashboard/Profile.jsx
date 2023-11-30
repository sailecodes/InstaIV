import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, NavLink, useLoaderData, Link } from "react-router-dom";
import { createContext, useContext } from "react";

import axiosFetch from "../../../utilities/axiosFetch";
import useScreenSize from "../../../custom-hooks/useScreenSize";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import UserPostsIcon from "../../utilities/icons/UserPostsIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import ProfileStats from "../../utilities/dashboard/ProfileStats";
import Error from "../../utilities/general/Error";
import { AppContext } from "../../../App";
import ClipLoader from "react-spinners/ClipLoader";

const ProfileWrapper = styled.div`
  position: relative;

  padding: 2rem 0 0 0;

  overflow-y: scroll;

  > div {
    max-width: 99rem;
  }

  .profile--user-information {
    display: grid;
    grid-template-columns: 7.7rem 1fr;
    grid-template-rows: 7.8rem 1fr;
    column-gap: 2rem;
    row-gap: 1.5rem;

    padding: 0 2rem 2rem 2rem;
    border-bottom: 1px solid var(--color-darker-gray);
  }

  .profile--user-information > div:nth-child(2) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  .profile--user-information > div:nth-child(2) > div {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .profile--user-information > div:nth-child(2) button {
    background-color: var(--color-blue);
    color: var(--color-white);

    width: 11.5rem;
    height: 3.2rem;

    font-size: var(--font-sm-1);
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  .profile--user-information > div:nth-child(2) button:nth-child(2) {
    background-color: var(--color-dark-gray);
  }

  .profile--username {
    font-size: var(--font-sm-3);
  }

  .profile--username + a {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 11.5rem;
    height: 3.2rem;

    font-size: var(--font-sm-1);
    font-weight: 500;

    border: none;
    border-radius: 8px;
  }

  .profile--username + a:hover {
    cursor: pointer;
  }

  .profile--bio {
    grid-column: 1 / -1;

    font-size: var(--font-sm-1);

    max-width: 44.5rem;
  }

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

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2 / -1;

    display: flex;
    justify-content: center;

    padding: 0 2rem 2rem 2rem;

    .profile--user-information {
      grid-template-columns: 15rem 1fr;
      grid-template-rows: 7.8rem 6rem 5rem;
      column-gap: 2rem;
      row-gap: 1.5rem;

      padding: 0 2rem 2rem 2rem;
    }

    .profile--user-information > img {
      grid-row: 1 / -1;

      position: relative;
      top: 11%;
    }

    .profile--user-information > div:nth-child(2) {
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 2rem;
    }

    .profile--bio {
      grid-column: 2 / -1;

      position: relative;
      bottom: 70%;

      height: 7.2rem;
    }
  }
`;

const Profile = () => {
  const queryClient = useQueryClient();
  const screenSize = useScreenSize();
  const id = useLoaderData();
  const { userId } = useContext(AppContext);

  const isLoggedUser = userId === id;

  const { data, isPending, isError } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosFetch.get(`/users/${id}`);
      return data;
    },
  });

  const followUserMutation = useMutation({
    mutationFn: () => {
      return axiosFetch.patch(`/users/follow/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  const unfollowUserMutation = useMutation({
    mutationFn: () => {
      return axiosFetch.patch(`/users/unfollow/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });

  return (
    <ProfileContext.Provider value={{ data }}>
      <ProfileWrapper>
        {isError && (
          <div className="perr-container">
            <Error />
          </div>
        )}
        {isPending && (
          <div className="perr-container">
            <PulseLoader color="var(--color-blue)" />
          </div>
        )}
        {!isError && !isPending && (
          <div>
            <section className="profile--user-information">
              <ProfilePicture
                width={screenSize.width >= 767 ? "15rem" : "7.7rem"}
                height={screenSize.width >= 767 ? "15rem" : "7.7rem"}
                profilePictureUrl={data?.profilePictureInfo?.imageUrl}
              />
              <div>
                <p className="profile--username">{data.username}</p>
                {isLoggedUser && <Link to={`/dashboard/profile/${id}/edit`}>Edit profile</Link>}
                {!isLoggedUser && (
                  <div>
                    <button onClick={() => followUserMutation.mutate()}>
                      {followUserMutation.isPending ? (
                        <ClipLoader
                          size={13}
                          color="var(--color-white)"
                        />
                      ) : (
                        "Follow"
                      )}
                    </button>
                    <button onClick={() => unfollowUserMutation.mutate()}>
                      {unfollowUserMutation.isPending ? (
                        <ClipLoader
                          size={13}
                          color="var(--color-white)"
                        />
                      ) : (
                        "Unfollow"
                      )}
                    </button>
                  </div>
                )}
              </div>
              <ProfileStats screenType={"mid"} />
              <p className="profile--bio">{!data.bio ? "No bio yet." : data.bio}</p>
            </section>
            <ProfileStats screenType={"small"} />
            <section className="profile--user-content">
              <nav>
                <NavLink
                  to={`/dashboard/profile/${id}`}
                  end>
                  <UserPostsIcon
                    width="2.5rem"
                    height="2.5rem"
                  />
                </NavLink>
                <NavLink to={`/dashboard/profile/${id}/saved-posts`}>
                  <SavedPostsIcon
                    fill="none"
                    stroke="var(--color-white)"
                    width="2.5rem"
                    height="2.5rem"
                  />
                </NavLink>
              </nav>
              <Outlet />
            </section>
          </div>
        )}
      </ProfileWrapper>
    </ProfileContext.Provider>
  );
};

export const ProfileContext = createContext();

export const ProfileLoader = ({ params }) => {
  return params.id;
};

export default Profile;
