import React from "react";
import { Menu, MenuItem, Select, Input } from "semantic-ui-react";

const HomeHeader = () => {
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

  return (
    <div className="homeOperation">
      <Menu secondary>
        <MenuItem>
          {" "}
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

export default HomeHeader;
