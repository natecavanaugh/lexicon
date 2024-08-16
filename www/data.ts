import {createSource, mergeSources} from 'mdxts';

export const docs = createSource('./docs/**/*.mdx', {
	baseDirectory: './docs',
});

export const documents = createSource(
	'../packages/clay-(core|alert|autocomplete|badge|breadcrumb|button|card|color-picker)/docs/**/*.mdx',
	{
		baseDirectory: 'docs',
		basePathname: 'components',
	}
);

export const packages = createSource(
	// TODO: Temporary
	'../packages/clay-core/src/tree-view/**/*.tsx',
	{
		baseDirectory: '../packages/clay-core/src',
		basePathname: 'packages',
		outputDirectory: ['lib'],
	}
);

export const sidebar = mergeSources(docs, documents);

export const data = mergeSources(docs, documents, packages);
