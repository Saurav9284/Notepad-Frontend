
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment,Dropdown } from 'semantic-ui-react'

const Signup = () => {
    const countryOptions = [
        { key: 'in', value: 'in', text: 'India' },
        { key: 'pk', value: 'pk', text: 'Pakistan' },
        { key: 'ch', value: 'ch', text: 'China' },
        { key: 'af', value: 'af', text: 'Afghanistan' },
        { key: 'ax', value: 'ax', text: 'Aland Islands' },
        { key: 'al', value: 'al', text: 'Albania' },
        { key: 'dz', value: 'dz', text: 'Algeria' },
        { key: 'as', value: 'as', text: 'American Samoa' },
        { key: 'ad', value: 'ad', text: 'Andorra' },
        { key: 'ao', value: 'ao', text: 'Angola' },
        { key: 'ai', value: 'ai', text: 'Anguilla' },
        { key: 'ag', value: 'ag', text: 'Antigua' },
        { key: 'ar', value: 'ar', text: 'Argentina' },
        { key: 'am', value: 'am', text: 'Armenia' },
        { key: 'aw', value: 'aw', text: 'Aruba' },
        { key: 'au', value: 'au', text: 'Australia' },
        { key: 'at', value: 'at', text: 'Austria' },
        { key: 'az', value: 'az', text: 'Azerbaijan' },
        { key: 'bs', value: 'bs', text: 'Bahamas' },
        { key: 'bh', value: 'bh', text: 'Bahrain' },
        { key: 'bd', value: 'bd', text: 'Bangladesh' },
        { key: 'bb', value: 'bb', text: 'Barbados' },
        { key: 'by', value: 'by', text: 'Belarus' },
        { key: 'be', value: 'be', text: 'Belgium' },
        { key: 'bz', value: 'bz', text: 'Belize' },
      ]

      const navigate = useNavigate();

      const login = () => {
        navigate('/login')
      }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' className='signupmain'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Create your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='Enter your name..' />
              <Form.Input fluid icon='at' iconPosition='left' placeholder='E-mail address' />
              <Form.Field fluid>
              <Dropdown
                placeholder='Select Country'
                fluid
                selection
                options={countryOptions}
              />
            </Form.Field>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
              <Button color='teal' fluid size='large'>
                Signup
              </Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <a onClick={login}>Login</a>
          </Message>
        </Grid.Column>
      </Grid>
    )
}

export default Signup