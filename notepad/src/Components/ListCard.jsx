import React from "react";import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Button,
    Card,
  } from 'semantic-ui-react'

const ListCard = ({data}) => {
  return (
    <Card>
      <CardContent>
        <CardHeader>{data.title}</CardHeader>
        <CardMeta>{data.category}</CardMeta>
        <CardDescription>
          {data.description}
        </CardDescription>
      </CardContent>
      <CardContent extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Edit
          </Button>
          <Button basic color='red'>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListCard;
