import React from 'react';

import { MdDone } from 'react-icons/md';
import { Button } from './styles';

export default function ButtonSave({ ...props }) {
  return (
    <Button {...props}>
      <MdDone color="#fff" size={20} />
      SALVAR
    </Button>
  );
}
