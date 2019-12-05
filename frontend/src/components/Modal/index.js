import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, ModalMain } from './styles';

export const Modal = ({ handleClose, show, children }) => {
  function handlePropagation(e) {
    e.stopPropagation();
  }
  return (
    <Wrapper display={show ? 'block' : 'none'} onClick={handleClose}>
      <ModalMain onClick={handlePropagation}>
        {/* <button type="button" className="close" onClick={handleClose}>
          Fechar
        </button> */}
        {children}
      </ModalMain>
    </Wrapper>
  );
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};