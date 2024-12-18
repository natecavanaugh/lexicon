'use server';

import {createLXCResource} from '@/lxc';
import {data} from '@/data';
import Heading from '@/app/_components/Heading';
import {notFound} from 'next/navigation';
import {CodeInline} from 'mdxts/components';

import {getData} from './DocsLayout';

import styles from './page.module.css';

type Props = {
	slug: Array<string>;
};

const lxc = createLXCResource();

export async function RemoteLayout({slug}: Props) {
	const slugBase = slug.filter((item) => item !== 'design');
	const [page, document] = await Promise.all([
		lxc.getResource(slug),
		getData(slugBase),
	]);
	const paths = data.paths() as Array<Array<string>>;

	if (!page || !document) {
		notFound();
	}

	return (
		<div className={styles.content}>
			<div className={styles.article}>
				<Heading
					title={document.frontMatter!.title}
					description={document.frontMatter!.description}
					path={slug}
					design
					markup={
						slug.includes('markup') ||
						!!paths.find((path: Array<string>) =>
							[...slugBase, 'markup'].every(
								(item, index) => item === path[index]
							)
						)
					}
					npmPackage={document.frontMatter!.packageNpm}
					use={
						document.frontMatter.packageUse ? (
							<CodeInline
								value={document.frontMatter.packageUse}
								language="jsx"
								style={{
									backgroundColor: 'transparent',
									boxShadow: 'none',
								}}
							/>
						) : (
							''
						)
					}
				/>

				<div dangerouslySetInnerHTML={{__html: page.html}} />

				<div className={styles.author_container}>
					{page.dateModified && (
						<p className="text-secondary">
							Last edited{' '}
							{new Intl.DateTimeFormat('en-US', {
								dateStyle: 'long',
								timeStyle: 'medium',
							}).format(new Date(page.dateModified))}
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
