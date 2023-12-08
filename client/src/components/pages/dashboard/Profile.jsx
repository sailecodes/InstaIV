import PulseLoader from "react-spinners/PulseLoader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Outlet, NavLink, useLoaderData, Link } from "react-router-dom";
import { createContext } from "react";

import axiosFetch from "../../../utilities/axiosFetch";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import UserPostsIcon from "../../utilities/icons/UserPostsIcon";
import SavedPostsIcon from "../../utilities/icons/SavedPostsIcon";
import ProfileStats from "../../utilities/dashboard/ProfileStats";
import Error from "../../utilities/general/Error";
import ProfileInteractBtns from "../../utilities/dashboard/ProfileInteractBtns";
import ProfileWrapper from "../../../assets/styles/pages/dashboard/ProfileWrapper";

const Profile = () => {
  const queryClient = useQueryClient();
  const id = useLoaderData();
  const isLoggedUser = localStorage.getItem("userId") === id;

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
          <div style={{ height: "100%", display: "grid", placeItems: "center", padding: "0.6rem 2rem 2rem 2rem" }}>
            <Error />
          </div>
        )}
        {isPending && (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <PulseLoader color="var(--color-blue)" />
          </div>
        )}
        {!isError && !isPending && (
          <div>
            <section className="profile--user-information">
              <ProfilePicture userPfpUrl={data?.pfpInfo?.contentUrl} />
              <header className="profile--header">
                <p className="profile--username">{data.username}</p>
                {isLoggedUser && <Link to={`/dashboard/profile/${id}/edit`}>Edit profile</Link>}
                {!isLoggedUser && (
                  <ProfileInteractBtns
                    followersInfo={data.followersInfo}
                    followUserMutation={followUserMutation}
                    unfollowUserMutation={unfollowUserMutation}
                  />
                )}
              </header>
              <p className="profile--bio">{!data.bio ? "No bio yet." : data.bio}</p>
              <ProfileStats />
            </section>
            <section className="profile--user-content">
              <nav>
                <NavLink
                  to={`/dashboard/profile/${id}`}
                  end>
                  <UserPostsIcon stroke="var(--color-white)" />
                </NavLink>
                <NavLink to={`/dashboard/profile/${id}/saved-posts`}>
                  <SavedPostsIcon stroke="var(--color-white)" />
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
