import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const handleClick = () => setIsOpen((prevState) => !prevState);
	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const outerClick = (e: MouseEvent) => {
			if (asideRef.current && !asideRef.current.contains(e.target as Node))
				setIsOpen(false);
		};

		document.addEventListener('mousedown', outerClick);
		return () => {
			document.removeEventListener('mousedown', outerClick);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				{' '}
				{/* добавил */}
				<form className={styles.form}>
					<RadioGroup
						name={''}
						options={[]}
						selected={{
							title: '123',
							value: '2',
							className: '',
							optionClassName: undefined,
						}}
						title={''}></RadioGroup>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
