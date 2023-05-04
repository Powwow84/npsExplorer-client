import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f7f7f7;

  // Media query for 360 x 740
  @media (min-width: 360px) and (min-height: 740px) {
  }

  // Media query for 820 x 1180
  @media (min-width: 820px) and (min-height: 1180px) {
  }

  // Media query for full desktop view
  @media (min-width: 1200px) {
  }
`;


const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #484848;
  margin-bottom: 16px;
`;

const ErrorMessage = styled.p`
  color: #ff5a5f;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 600;
  color: #484848;
  margin-bottom: 8px;
`;

const Input = styled.input`
  font-size: 16px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  outline: none;
  &:focus {
    border-color: #008489;
  }
`;

const SubmitButton = styled.button`
  font-size: 16px;
  font-weight: 600;
  background-color: #ff5a5f;
  color: #fff;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #ff3d48;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  width: 300px;
  height: 300px;

  @media screen and (max-width: 60rem) {
    width: 300px;
    height: 250px;
  }

  @media screen and (max-width: 53rem) {
    width: 260px;
    height: 200px;
  }

  @media screen and (max-width: 27rem) {
    width: 150px;
    height: 150px;
  }
`;

const ContentWrapper = styled.div`
  margin-top: 150px;
`;



export default function Login({ currentUser, setCurrentUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
  
    const navigate = useNavigate();
  
    const handleSubmit = async e => {
      e.preventDefault();
      try {
        const reqBody = {
          email,
          password,
        };
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/login`, reqBody);
  
        const { token } = response.data;
        localStorage.setItem('jwt', token);
  
        const decoded = jwt_decode(token);
  
        setCurrentUser(decoded);
      } catch (err) {
        console.warn(err);
        if (err.response) {
          setMsg(err.response.data.msg);
        }
      }
    };
  
    if (currentUser) {
      navigate('/users/profile');
    }
  

    return (
        <Container>
            <Image src="https://www.nps.gov/common/uploads/structured_data/68BFC1AC-BF96-629F-89D261D78F181C64.jpg" alt="Default Image" />

            <Title>Login to Your Account:</Title>

            <ContentWrapper>
            <ErrorMessage>{msg}</ErrorMessage>

            <Form onSubmit={handleSubmit}>
                <Label htmlFor='email'>Email:</Label>
                <Input
                    type='email'
                    id='email'
                    placeholder='your email...'
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                />
                <Label htmlFor='password'>Password:</Label>
                <Input
                    type='password'
                    id='password'
                    placeholder='password...'
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />

                <SubmitButton type='submit'>Login</SubmitButton>
            </Form>
            </ContentWrapper>
        </Container>
    )
}
