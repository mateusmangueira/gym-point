import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  padding-top: 32px;
  display: flex;
  justify-content: center;
  background-color: #eee;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  p {
    margin-top: 16px;
    margin-bottom: 4px;
    color: ${lighten(0.2, '#333')};
    text-transform: uppercase;
    font-weight: bold;
  }
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

export const BoxIcon = styled.div`
  font-size: 12px;
  margin-left: 8px;
  border: 1px solid ${lighten(0.7, '#333')};
  border-right: 0;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 0px 5px;
  background: #fff;
`;

export const Items = styled.div`
  padding: 20px 40px;
  background-color: #fff;
  border-radius: 5px;
  h2 {
    color: ${lighten(0.6, '#333')};
    font-size: 14px;
    margin-top: 16px;
  }
  table {
    border-radius: 5px;
    width: 100%;
    line-height: 48px;
    border-collapse: collapse;
    tr,
    th {
      color: ${lighten(0.2, '#333')};
      text-align: center;
    }
    .align-left {
      text-align: left;
    }
    .align-right {
      text-align: right;
    }
    tr {
      border-bottom: 1pt solid ${lighten(0.7, '#333')};
    }
    tr td.answer {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10px;
    }
    td button {
      color: #df4658;
      border: 0;
      background: #fff;
      margin-left: 16px;
    }
    td button.help {
      color: blue;
      border: 0;
      background: #fff;
      margin-left: 16px;
      display: flex;
      justify-content: flex-end;
    }
    td a {
      color: blue;
    }
  }
`;
