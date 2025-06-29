import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

import { defaultArticleState } from 'src/constants/articleProps';
import styles from './index.module.scss';

export const App = () => {
	const [pageStyle, setPageStyle] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageStyle.fontFamilyOption.value,
					'--font-size': pageStyle.fontSizeOption.value,
					'--font-color': pageStyle.fontColor.value,
					'--container-width': pageStyle.contentWidth.value,
					'--bg-color': pageStyle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onChange={(state) => setPageStyle(state)} />
			<Article />
		</main>
	);
};
