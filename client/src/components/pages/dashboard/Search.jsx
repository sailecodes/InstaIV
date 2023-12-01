import PulseLoader from "react-spinners/PulseLoader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import Footer from "../../utilities/dashboard/Footer";
import SearchWrapper from "../../../assets/styles/pages/dashboard/SearchWrapper";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosFetch.get("/users");
      setSearchData(data.users);
      return data;
    },
  });

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);

    const newSearchData = data.users.filter((user) =>
      user.username.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setSearchData(newSearchData);
  };

  const handleSeeAll = () => {
    setSearchQuery("");
    setSearchData(data.users);
  };

  return (
    <SearchWrapper>
      <div>
        <div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search for friends"
          />
          <button onClick={handleSeeAll}>See all</button>
        </div>
        {isError && (
          <div
            className="perr-container"
            style={{ width: "auto", height: "auto", marginTop: "5rem" }}>
            <Error />
          </div>
        )}
        {isPending && (
          <div
            className="perr-container"
            style={{ width: "auto", height: "auto", marginTop: "5rem" }}>
            <PulseLoader color="var(--color-blue)" />
          </div>
        )}
        {!isError && !isPending && (
          <div className="search-data--container">
            {searchData.length === 0 && <p>No friends yet!</p>}
            {searchData.length !== 0 &&
              searchData.map((user) => (
                <div key={user._id}>
                  <ProfilePicture
                    width="3rem"
                    height="3rem"
                    profilePictureUrl={user?.profilePictureInfo?.imageUrl}
                  />
                  <p>{user.username}</p>
                  <Link to={`/dashboard/profile/${user._id}`}>See profile</Link>
                </div>
              ))}
          </div>
        )}
      </div>
      <Footer />
    </SearchWrapper>
  );
};
export default Search;
