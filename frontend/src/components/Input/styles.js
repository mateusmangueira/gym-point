import styled from 'styled-components';

import { Input } from '@rocketseat/unform';

export const DefaultInput = styled(Input)`
	border: 1px solid #ddd;
	border-radius: 4px;
	height: 45px;
	font-size: 16px;
	color: #666;

	&::placeholder {
		color: #999;
	}
`;
