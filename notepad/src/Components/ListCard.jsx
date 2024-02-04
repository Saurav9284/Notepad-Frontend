import React from "react";
import { Card, Button } from "semantic-ui-react";

const ListCard = ({data}) => {
  
  return (
    <Card>
      <Card.Content>
        <Card.Header>{data.title}</Card.Header>
        <Card.Meta>{data.category}</Card.Meta>
        <Card.Description>{data.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button basic color="green" >
          Edit
        </Button>
        <Button basic color="red" >
          Delete
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ListCard;
