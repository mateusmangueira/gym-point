import styled from 'styled-components';
import colors from '~/styles/colors';

export const Wrapper = styled.div`
  height: 100%;
  background: ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 50px 30px;

  h1 {
    margin-top: 10px;
    color: ${colors.primary};
    font-size: 30px;
    font-weight: bold;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      padding: 0 15px;
      margin-bottom: 20px;
    }

    span {
      color: #444;
      font-weight: bold;
      font-size: 14px;
      text-align: left;
      margin-bottom: 10px;
    }

    button {
      height: 45px;
      background: ${colors.primary};
      border: 0;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;
