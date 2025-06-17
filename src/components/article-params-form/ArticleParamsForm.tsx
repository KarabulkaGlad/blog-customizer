import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	fontFamilyOptions,
	defaultArticleState,
	backgroundColors,
	fontColors,
	contentWidthArr,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onChange: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onChange } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleClick = () => setIsOpen((prevState) => !prevState);
	const asideRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({ isOpen, rootRef: asideRef, onChange: setIsOpen });

	const onChangeOption = <T extends keyof ArticleStateType>(
		name: T,
		option: OptionType
	) => {
		setFormState((prevState) => {
			return {
				...prevState,
				[name]: option,
			};
		});
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleClick} />
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<div className={clsx(styles.wrapper)}>
					<Text size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							onChange(formState);
						}}
						onReset={() => {
							setFormState(defaultArticleState);
							onChange(defaultArticleState);
						}}>
						<Select
							title={'шрифт'}
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) =>
								onChangeOption('fontFamilyOption', option)
							}></Select>

						<RadioGroup
							name={'fontSizeRadio'}
							title={'размер шрифта'}
							selected={formState.fontSizeOption}
							options={fontSizeOptions}
							onChange={(option) =>
								onChangeOption('fontSizeOption', option)
							}></RadioGroup>

						<Select
							title={'цвет шрифта'}
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) =>
								onChangeOption('fontColor', option)
							}></Select>

						<Separator></Separator>

						<Select
							title={'цвет фона'}
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) =>
								onChangeOption('backgroundColor', option)
							}></Select>

						<Select
							title={'ширина контента'}
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(option) =>
								onChangeOption('contentWidth', option)
							}></Select>

						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</div>
			</aside>
		</>
	);
};
