import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import axiosFetch from "../../../utilities/axiosFetch";
import Error from "../../utilities/general/Error";
import ProfilePicture from "../../utilities/dashboard/ProfilePicture";
import { Link } from "react-router-dom";

const SearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;

  padding: 2rem;

  overflow-y: scroll;

  input {
    background-color: var(--color-dark-gray);
    color: var(--color-white);

    width: 30rem;
    height: 3.6rem;

    font-size: var(--font-sm-1);

    padding: 0 2rem 0 2rem;
    border-radius: 8px;
  }

  .search-data--container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .search-data--container > div {
    display: flex;
    align-items: center;
    gap: 1rem;

    width: 30rem;
  }

  .search-data--container > div p {
    font-size: var(--font-sm-1);
  }

  .search-data--container > div a {
    background-color: var(--color-blue);
    color: var(--color-white);

    display: grid;
    place-items: center;

    width: 9rem;
    height: 3rem;

    font-size: var(--font-sm-1);

    margin-left: auto;
    border-radius: 5px;
  }

  @media (min-width: 767px) {
    grid-row: 1 / -1;
    grid-column: 2;
  }
`;

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axiosFetch.get("/users");
      // setSearchData(data.users);
      return data;
    },
  });

  const handleChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);

    if (newSearchQuery === "") {
      setSearchData([]);
      return;
    }

    const newSearchData = data.users.filter((user) =>
      user.username.toLowerCase().includes(newSearchQuery.toLowerCase())
    );
    setSearchData(newSearchData);
  };

  return (
    <SearchWrapper>
      <input type="text" value={searchQuery} onChange={handleChange} placeholder="Search for friends" />
      {isError && (
        <div className="perr-container" style={{ width: "auto", height: "auto", marginTop: "5rem" }}>
          <Error />
        </div>
      )}
      {isPending && (
        <div className="perr-container" style={{ width: "auto", height: "auto", marginTop: "5rem" }}>
          <PulseLoader color="var(--color-blue)" />
        </div>
      )}
      {!isError && !isPending && (
        <div className="search-data--container">
          {searchData.map((user) => (
            <div key={user._id}>
              <ProfilePicture width="3rem" height="3rem" profilePictureUrl={user?.profilePictureInfo?.imageUrl} />
              <p>{user.username}</p>
              <Link to={`/dashboard/profile/${user._id}`}>See profile</Link>
            </div>
          ))}
        </div>
      )}
    </SearchWrapper>
  );
};
export default Search;
