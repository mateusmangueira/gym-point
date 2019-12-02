import React from 'react';

import { Select } from './styles';

export default function SelectOptions({ name, options, ...rest }) {
  return <Select name={name} options={options} {...rest} />;
}
