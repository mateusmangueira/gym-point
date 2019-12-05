import styled from 'styled-components';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${props => props.display};
`;

export const ModalMain = styled.section`
  position: fixed;
  background: #fff;
  width: 450px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => props.display};
  padding: 20px;
  border-radius: 5px;
  min-height: 200px;
  p {
    color: ${lighten(0.2, '#333')};
    text-transform: uppercase;
    width: 100%;
    margin-top: 12px;
  }
  p.question {
    color: ${lighten(0.5, '#333')};
    width: 100%;
    text-transform: none;
    font-weight: normal;
    margin-top: 8px;
  }
  textarea {
    display: flex;
    text-align: flex-start;
    justify-content: flex-start;
    height: 100px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid ${lighten(0.5, '#333')};
    color: ${lighten(0.5, '#333')};
    margin-top: 8px;
    padding: 8px 8px;
    font: 14px 'Roboto', sans-serif;
    resize: none;
  }
  button {
    color: #fff;
    background: #df4658;
    width: 100%;
    margin-top: 16px;
    height: 42px;
    border: 0;
    border-radius: 5px;
    font-weight: bold;
  }
`;