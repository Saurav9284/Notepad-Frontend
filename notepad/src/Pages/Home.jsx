import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  Select,
  Input,
  Button,
  GridColumn,
  Grid,
} from "semantic-ui-react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import ListCard from "../Components/ListCard";

const Home = () => {
  const toast = useToast();

  const [data, setData] = useState([]);
  const [pages, setPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getData = async (page = 1) => {
    const token = sessionStorage.getItem("Token");
    try {
      const res = await axios.get(
        `https://notepad-backend-production.up.railway.app/note/?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setPages(res.data.totalPages);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const submitadd = () => {
    const payload = JSON.stringify({ title, category, description });
    const token = sessionStorage.getItem("Token");
    fetch("https://notepad-backend-production.up.railway.app/note/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
      body: payload,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "Note created") {
          toast({
            position: "top",
            title: res.msg,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          getData(currentPage);
          onClose();
        } else {
          toast({
            position: "top",
            title: res.msg || "Not Created",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast({
          position: "top",
          title: "An error occurred during Creation ",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      });
  };

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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getData(pageNumber);
  };

  const Pagination = () => {
    const pageNumbers = Array.from({ length: pages }, (_, index) => index + 1);

    return (
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        {pageNumbers.map((pageNumber) => (
          <Button
            basic
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            primary={currentPage === pageNumber}
          >
            {pageNumber}
          </Button>
        ))}
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

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
          <Select
            placeholder="Filter by category"
            options={filterOptions}
          />
        </MenuItem>
        <MenuItem>
          <>
            <Button basic color="blue" onClick={onOpen}>
              Add
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create new note</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input
                      placeholder="Enter title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder="Choose category"
                      options={filterOptions}
                      value={category}
                      onChange={(e, { value }) => setCategory(value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalBody>
                  <FormControl mt={0}>
                    <FormLabel>Description</FormLabel>
                    <Input
                      placeholder="Enter description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={submitadd}>
                    Save
                  </Button>
                  <Button color="red" onClick={onClose} basic>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </MenuItem>
      </Menu>
      <Grid columns={4} className="girdcard">
        {data?.map((data) => (
          <GridColumn key={data.id}>
            <ListCard data={data} />
          </GridColumn>
        ))}
      </Grid>
      <Pagination/>
    </div>
  );
};

export default Home;
