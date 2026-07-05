'use client';

import {
	ChangeEvent,
	ComponentPropsWithoutRef,
	ReactNode,
	useEffect,
	useRef,
	useState,
} from 'react';

import { MagnifyingGlassIcon as MagnifyingGlass } from '@phosphor-icons/react/dist/csr/MagnifyingGlass';
import debounce from 'lodash/debounce';

import { Input } from './Input';

export interface SearchBarProps extends Omit<
	ComponentPropsWithoutRef<typeof Input>,
	'type' | 'onChange' | 'value'
> {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	onSearch?: (value: string) => void;
	debounceMs?: number;
	isFetching?: boolean;
	leftIcon?: ReactNode;
}

export function SearchBar({
	debounceMs = 300,
	defaultValue = '',
	isFetching = false,
	leftIcon,
	onChange,
	onSearch,
	placeholder = 'Search',
	value,
	...props
}: SearchBarProps) {
	const isControlled = typeof value === 'string';
	const [internalValue, setInternalValue] = useState(defaultValue);
	const currentValue = isControlled ? value : internalValue;
	const debouncedSearchRef = useRef(
		debounce((nextValue: string) => {
			onSearch?.(nextValue);
		}, debounceMs),
	);

	useEffect(() => {
		debouncedSearchRef.current.cancel();
		debouncedSearchRef.current = debounce((nextValue: string) => {
			onSearch?.(nextValue);
		}, debounceMs);

		return () => {
			debouncedSearchRef.current.cancel();
		};
	}, [debounceMs, onSearch]);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		const nextValue = event.target.value;

		if (!isControlled) {
			setInternalValue(nextValue);
		}

		onChange?.(nextValue);
		debouncedSearchRef.current(nextValue);
	}

	return (
		<Input
			{...props}
			type='search'
			value={currentValue}
			onChange={handleChange}
			placeholder={placeholder}
			leftIcon={
				leftIcon ?? <MagnifyingGlass aria-hidden='true' size={16} weight='bold' />
			}
			loading={isFetching}
		/>
	);
}
