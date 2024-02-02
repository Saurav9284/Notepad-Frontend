import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

const Login = () => {

    const navigate = useNavigate();
    
    const signup = () => {
        navigate('/signup')
    }
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle' className='signupmain'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h1' textAlign='center' className='formheader'>
            Log-in to your account
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
              />
    
              <Button className='button' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New to us? <a onClick={signup}>Signup</a>
          </Message>
        </Grid.Column>
      </Grid>
  )
}

export default Login
