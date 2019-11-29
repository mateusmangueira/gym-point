import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';

import { AsyncSelect } from './styles';

export default function SelectInput({ name, multiple, loadOptions, ...rest }) {
	const ref = useRef(null);
	const { fieldName, registerField, defaultValue, error } = useField(name);

	function parseSelectValue(selectRef) {
		const selectValue = selectRef.select.state.value;
		if (!multiple) {
			return selectValue ? selectValue.value : '';
		}

		return selectValue ? selectValue.map(option => option.value) : [];
	}

	useEffect(() => {
		registerField({
			name: fieldName,
			ref: ref.current,
			path: 'select.state.value',
			parseValue: parseSelectValue,
			clearValue: selectRef => {
				selectRef.select.clearValue();
			},
		});
  }, [ref.current, fieldName]); //eslint-disable-line

	return (
		<>
			<AsyncSelect
				name={fieldName}
				aria-label={fieldName}
				loadOptions={loadOptions}
				isMulti={multiple}
				ref={ref}
				cacheOptions
				isClearable
				defaultOptions
				defaultValue={defaultValue}
				getOptionValue={option => option.value}
				getOptionLabel={option => option.label}
				{...rest}
			/>

			{error && <span>{error}</span>}
		</>
	);
}

SelectInput.propTypes = {
	name: PropTypes.string.isRequired,
	multiple: PropTypes.bool,
	loadOptions: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
	multiple: false,
};
