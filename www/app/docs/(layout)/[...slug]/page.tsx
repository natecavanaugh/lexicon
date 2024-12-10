import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import Heading from '@/app/_components/Heading';
import {Fragment} from 'react';
import {data, sidebar, packages} from '@/data';
import {CodeInline, MDXContent, MDXComponents} from 'mdxts/components';

const mdxComponents = {
	p: (props) => <p {...props} style={{margin: 0}} />,
	code: (props) => <MDXComponents.code {...props} paddingY="0" />,
} as MDXComponents;

import styles from './page.module.css';

type Props = {
	params: {
		slug: Array<string>;
	};
};

export async function generateStaticParams() {
	const paths = sidebar.paths();

	return paths.map((path) => ({
		slug: path,
	}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
	const document = await data.get(params.slug);

	const title = `${document?.frontMatter?.title} - Clay by Liferay`;

	return {
		title: title,
		openGraph: {
			title: title,
			description: document?.frontMatter?.description,
		},
	};
}

export default async function Page({params}: Props) {
	const document = await data.get(params.slug);
	const paths = data.paths();

	if (!document) {
		notFound();
	}

	const components = document.frontMatter.packageTypes
		? (
				await Promise.all(
					document.frontMatter.packageTypes.map(
						async (item: string) =>
							await packages.get(['packages', ...item.split('/')])
					)
				)
		  ).filter(Boolean)
		: [];
	const types = components
		.map((item) => item.exportedTypes)
		.flat()
		.filter((item) => item.name !== 'default');

	const markupPath = [...params.slug, 'markup'];
	const Content = document.Content!;

	const tocContent = (
		<>
			<p className="text-5 font-weight-semi-bold">Table of Contents</p>
			<ul className={styles.toc_list}>
				{[
					...document.headings,
					...(types.length > 0
						? [
								{
									text: 'API Reference',
									id: 'api-reference',
									depth: 2,
								},
						  ]
						: []),
					...(types.length > 0
						? components
								.map((item) => item.headings)
								.flat()
								.filter(
									(item) =>
										item.text !== 'API Reference' &&
										item.text !== 'default'
								)
						: []),
				].map((item) => (
					<li
						style={{marginLeft: `${(item.depth - 2) * 10}px`}}
						key={item.id}
					>
						<a href={`#${item.id}`}>{item.text}</a>
					</li>
				))}
			</ul>
		</>
	);

	return (
		<div className={styles.content}>
			<div className={styles.article}>
				<Heading
					title={document.frontMatter!.title}
					description={document.frontMatter!.description}
					path={params.slug}
					markup={
						params.slug.includes('markup') ||
						!!paths.find((path) =>
							markupPath.every(
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

				<div className={styles.toc_mobile}>{tocContent}</div>

				<Content />

				{types.length > 0 && (
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
						}}
					>
						<h2 className="text-7 mb-4 mt-5" id="api-reference">
							API Reference
						</h2>

						{types.map((type, index) => {
							const isActive = true;
							return (
								<div
									key={type.name}
									style={{
										display: 'flex',
										flexDirection: 'column',
										padding: '1.6rem 0',
										borderTop:
											index === 0
												? undefined
												: '1px solid var(--color-separator-secondary)',
									}}
								>
									<div
										style={{
											display: 'flex',
											flexDirection: 'column',
											gap: '0.8rem',
											marginBottom: isActive
												? '1rem'
												: undefined,
										}}
									>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												gap: '1rem',
											}}
										>
											{isActive ? (
												<h3
													id={type.slug}
													style={{
														fontWeight: 500,
														margin: 0,
													}}
												>
													{type.name}
												</h3>
											) : (
												<a href={type.pathname}>
													<h3
														id={type.slug}
														style={{
															fontWeight: 500,
															margin: 0,
														}}
													>
														{type.name}
													</h3>
												</a>
											)}

											{isActive && type.sourcePath && (
												<a href={type.sourcePath}>
													View Source
												</a>
											)}
										</div>

										{!type.isMainExport &&
										type.description ? (
											<MDXContent
												value={type.description}
												components={mdxComponents}
											/>
										) : null}
									</div>

									{isActive && type.types.length > 0 ? (
										<Props
											props={type.types}
											isComponent={type.isComponent}
										/>
									) : null}
								</div>
							);
						})}
					</div>
				)}

				<div className={styles.author_container}>
					<a
						className="link-primary mb-2"
						href={document.sourcePath}
						target="_blank"
						rel="noreferrer"
						style={{
							display: 'inline-block',
						}}
					>
						Edit this page on GitHub
					</a>
					<p className="font-weight-semi-bold">Contributors</p>
					<div className={styles.author_list}>
						{document.authors.map((item) => (
							<div key={item} className={styles.author} />
						))}
					</div>

					{document.updatedAt && (
						<p className="text-secondary">
							Last edited{' '}
							{new Intl.DateTimeFormat('en-US', {
								dateStyle: 'long',
								timeStyle: 'medium',
							}).format(new Date(document.updatedAt!))}
						</p>
					)}
				</div>
			</div>

			<div className={styles.toc}>{tocContent}</div>
		</div>
	);
}

function Props({
	props,
	isComponent,
}: {
	props: any[] | null;
	isComponent: boolean;
}) {
	return props
		?.filter((propType) => !propType.description?.includes('@ignore'))
		.map((propType, index) => {
			if (propType === null) {
				return null;
			}

			if (
				isComponent &&
				propType.unionProperties &&
				propType.unionProperties.length > 0
			) {
				return (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							marginTop: '1.5rem',
						}}
					>
						<h4
							style={{
								fontWeight: 500,
								marginBottom: '2rem',
								color: 'var(--color-foreground-secondary)',
							}}
						>
							{propType.text}
						</h4>
						{propType.description && (
							<MDXContent
								value={propType.description}
								components={mdxComponents}
							/>
						)}
						<div
							style={{
								padding: '0 1.5rem',
								margin: '0 0 0 -1.5rem',
								border: '1px solid var(--color-separator-secondary)',
								borderRadius: '1rem',
								position: 'relative',
							}}
						>
							<span
								className="title"
								style={{
									position: 'absolute',
									left: '2rem',
									top: 0,
									translate: '0 -50%',
									padding: '0.25rem 0.5rem',
									margin: '0 0 0 -1rem',
									borderRadius: '1rem',
									backgroundColor:
										'var(--color-separator-secondary)',
								}}
							>
								Union
							</span>
							{propType.unionProperties.map(
								(props: any, index: number) => (
									<Fragment key={index}>
										{index > 0 ? (
											<div
												style={{
													display: 'grid',
													gridTemplateColumns:
														'1fr auto 1fr',
													alignItems: 'center',
													margin: '0 -1.5rem',
												}}
											>
												<div
													style={{
														height: 1,
														backgroundColor:
															'var(--color-separator-secondary)',
													}}
												/>
												<div style={{height: 1}}>
													<span
														style={{
															fontSize:
																'var(--font-size-body-2)',
															padding:
																'0.1rem 1rem 0.25rem',
															border: '1px solid var(--color-separator-secondary)',
															borderRadius:
																'1rem',
															color: 'var(--color-foreground-secondary)',
															position:
																'relative',
															top: '-0.95rem',
															userSelect: 'none',
														}}
													>
														or
													</span>
												</div>
												<div
													style={{
														height: 1,
														backgroundColor:
															'var(--color-separator-secondary)',
													}}
												/>
											</div>
										) : null}
										<Props
											props={props}
											isComponent={isComponent}
										/>
									</Fragment>
								)
							)}
						</div>
						<Props
							props={propType.properties}
							isComponent={isComponent}
						/>
					</div>
				);
			}

			if (propType.name === null) {
				return propType.properties ? (
					<div
						key={index}
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: '1rem',
						}}
					>
						<Props
							props={propType.properties}
							isComponent={isComponent}
						/>
					</div>
				) : (
					<div key={index}>
						{isComponent ? 'Props' : 'Types'}{' '}
						<CodeInline
							value={propType.text}
							language="typescript"
						/>
					</div>
				);
			}

			return (
				<div
					key={propType.name}
					style={{
						display: 'flex',
						flexDirection: 'column',
						padding: '1.5rem 0',
						gap: '0.8rem',
						borderTop:
							index === 0
								? 'none'
								: '1px solid var(--color-separator)',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							flexWrap: 'wrap',
						}}
					>
						<h4
							style={{
								display: 'flex',
								alignItems: 'flex-start',
								flexShrink: 0,
								margin: 0,
								fontWeight: 400,
								color: 'var(--color-foreground-secondary)',
							}}
						>
							{propType.name}{' '}
							{propType.required && (
								<span
									style={{color: 'oklch(0.8 0.15 36.71)'}}
									title="required"
								>
									*
								</span>
							)}
						</h4>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.25rem',
								flexWrap: 'wrap',
							}}
						>
							<CodeInline
								className={styles.code_inline}
								value={propType.text}
								language="typescript"
								paddingX="0.5rem"
								paddingY="0.2rem"
								css={{fontSize: 'var(--font-size-body-2)'}}
							/>
							{propType.defaultValue ? (
								<span
									style={{
										alignItems: 'center',
										display: 'flex',
										gap: '0.25rem',
									}}
								>
									={' '}
									<CodeInline
										className={styles.code_inline}
										value={propType.defaultValue}
										language="typescript"
									/>
								</span>
							) : null}
						</div>
					</div>
					{propType.description && (
						<MDXContent
							value={propType.description}
							components={mdxComponents}
						/>
					)}

					{propType.properties && propType.properties.length > 0 ? (
						<div style={{paddingLeft: '2rem'}}>
							<Props
								props={propType.properties}
								isComponent={isComponent}
							/>
						</div>
					) : null}
				</div>
			);
		});
}
