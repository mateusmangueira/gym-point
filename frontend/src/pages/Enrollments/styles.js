import styled from 'styled-components';
import { lighten } from 'polished';
import colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 34px;
`;

export const Nav = styled.div`
  display: flex;
  margin-bottom: 16px;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  strong {
    font-size: 24px;
    color: #333;
  }
  a {
    display: flex;
    align-items: center;
    text-transform: uppercase;
    background: #df4658;
    border-radius: 3px;
    color: #fff;
    height: 32px;
    font-size: 12px;
    font-weight: bold;
    padding: 10px 10px;
  }
  div {
    display: flex;
    flex-direction: row;
    svg {
      background: #fff;
      height: 30px;
    }
    input {
      color: ${lighten(0.4, '#333')};
      height: 32px;
      font-size: 12px;
      border: 1px solid ${lighten(0.7, '#333')};
      border-left: 0;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      padding-left: 8px;
      @media only screen and (max-width: 768px) {
        width: 100px;
        margin-right: 5px;
      }
    }
  }
`;

export const Content = styled.div`
  width: 1380px;
  display: flex;
  flex-direction: column;
  padding: 0 30px 0;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-bottom: 24px;

    h1 {
      font-size: 24px;
      color: #444;
    }
  }
`;

export const EnrollmentTable = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 30px 30px 0px 30px;

  thead th {
    text-align: left;
    font-size: 16px;
    color: #444;
    padding-bottom: 20px;
  }

  td {
    font-size: 16px;
    padding-bottom: 15px;
    color: #666;
  }

  th + th {
    text-align: center;
  }

  td + td {
    text-align: center;
  }

  td {
    div {
      text-align: right;

      a {
        margin-right: 23px;
        color: ${colors.info};
        font-size: 15px;
      }

      button {
        font-size: 15px;
        margin-right: 0;
        background: none;
        border: 0;
        color: ${colors.primary};
      }
    }
  }
`;
