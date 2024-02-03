import React from "react";
import { useState, useEffect } from "react";
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
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import ListCard from "../Components/ListCard";

const Home = () => {
  const toast = useToast();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        "https://notepad-backend-production.up.railway.app/note/",
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
          getData();
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

        console.log(res);
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
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Category</FormLabel>
                    <Select
                      placeholder="Choose category"
                      options={filterOptions}
                      value={category}
                      onChange={(e, { value }) => {
                        setCategory(value);
                      }}
                    />
                  </FormControl>
                </ModalBody>
                <ModalBody>
                  <FormControl mt={0}>
                    <FormLabel>Description</FormLabel>
                    <Input
                      placeholder="Enter title"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
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
          <GridColumn>
            <ListCard data={data} />
          </GridColumn>
        ))}
      </Grid>
      {/* <SimpleGrid columns={[2, null, 3]} spacing="20px" className="girdcard">
        {data?.map((data) => (
          <Box>
            <ListCard data={data} />
          </Box>
        ))}
      </SimpleGrid> */}
    </div>
  );
};

export default Home;
