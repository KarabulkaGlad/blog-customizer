import { useEffect } from 'react';

type UseOutsideClickCloseProps = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>;
	onChange: (value: boolean) => void;
};

export const useOutsideClickClose = (props: UseOutsideClickCloseProps) => {
	const { isOpen, rootRef, onChange } = props;
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (
				event.target instanceof Node &&
				!rootRef.current?.contains(event.target)
			) {
				onChange(false);
			}
		};
		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isOpen, onChange]);
};
