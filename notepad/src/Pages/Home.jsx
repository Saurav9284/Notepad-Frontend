import React from "react";
import { useState, useEffect } from "react";
import { Menu, MenuItem, Select, Input } from "semantic-ui-react";
import axios from "axios";

const Home = () => {

  const sortOptions = [
    { key: "", value: "", text: "Select" },
    { key: "asc", value: "asc", text: "Ascending Order" },
    { key: "desc", value: "desc", text: "Descending Order" },
  ];

  const filterOptions = [
    { key: "", value: "", text: "Select" },
    { key: "Important", value: "Important", text: "Important Notes" },
    { key: "Local", value: "Local", text: "Local Notes" },
  ];

  const [data, setData] = useState([]);
  const [pages, setPages] = useState("");

  const getData = async () => {
    const token = sessionStorage.getItem("Token");
    try {
      const res = await axios.get(
        "https://panicky-spacesuit-colt.cyclic.app/note/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      setPages(res.data.totalPages);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="homeOperation">
      <Menu secondary>
        <MenuItem>
          <Select placeholder="Sort by title" options={sortOptions} />
        </MenuItem>
        <MenuItem>
          <Input icon="search" placeholder="Search notes..." />
        </MenuItem>
        <MenuItem>
          <Select placeholder="Filter by category" options={filterOptions} />
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Home;
