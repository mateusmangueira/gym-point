import React from 'react';
// import PropTypes from 'prop-types';

// import { MdKeyboardArrowDown } from 'react-icons/md';

import { Select } from './styles';

export default function SelectOptions({ name, options, ...rest }) {
	return <Select name={name} options={options} {...rest} />;
}
