import styled from 'styled-components';
import ReactSelect from 'react-select/async';

export const AsyncSelect = styled(ReactSelect).attrs(props => ({
	...props,
	className: 'async-select-container',
	classNamePrefix: 'async-select',
}))`
	div.async-select__control {
		height: 45px;
		margin-top: 5px;
	}
`;
