import React from 'react';

import { MdAdd } from 'react-icons/md';
import { Button } from './styles';

export default function ButtonRegister({ ...props }) {
	return (
		<Button {...props}>
			<MdAdd color="#fff" size={20} />
			CADASTRAR
		</Button>
	);
}
