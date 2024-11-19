import {createSource, mergeSources} from 'mdxts';

export const docs = createSource('./docs/**/*.mdx', {
	baseDirectory: './docs',
});

export const documents = createSource(
	'../packages/clay-(core|alert|autocomplete|badge|breadcrumb|button|card|color-picker|data-provider|date-picker|drop-down|empty-state|icon|label|layout|link|list|loading-indicator|localized-input|management-toolbar|modal|multi-select|multi-step-nav|nav|navigation-bar|pagination|pagination-bar|panel|popover|progress-bar|provider|slider|sticker|table|tabs|time-picker|toolbar|tooltip|upper-toolbar)/docs/**/*.mdx',
	{
		baseDirectory: 'docs',
		basePathname: 'components',
	}
);

const packagesOptions = {
	baseDirectory: 'packages',
	basePathname: 'packages',
};

// TODO: This is a temporary implementation, we couldn't make it work with
// just one createSource call for all packages, probably due to the way
// our monorepo is organized.
export const packages = mergeSources(
	createSource('../packages/clay-autocomplete/src/**/*.tsx', packagesOptions),
	createSource('../packages/clay-badge/src/**/*.tsx', packagesOptions),
	createSource('../packages/clay-button/src/**/*.tsx', packagesOptions),
	createSource('../packages/clay-multi-select/src/**/*.tsx', packagesOptions),
	createSource('../packages/clay-breadcrumb/src/**/*.tsx', packagesOptions),
	createSource(
		'../packages/clay-multi-step-nav/src/**/*.tsx',
		packagesOptions
	),
	createSource('../packages/clay-alert/src/**/*.tsx', packagesOptions),
	createSource(
		'../packages/clay-core/src/tree-view/**/*.tsx',
		packagesOptions
	),
	createSource(
		'../packages/clay-core/src/vertical-bar/**/*.tsx',
		packagesOptions
	),
	createSource(
		'../packages/clay-core/src/focus-trap/**/*.tsx',
		packagesOptions
	),
	createSource('../packages/clay-card/src/**/*.tsx', packagesOptions),
	createSource('../packages/clay-color-picker/src/**/*.tsx', packagesOptions),
	createSource(
		'../packages/clay-data-provider/src/**/*.tsx',
		packagesOptions
	),
	createSource('../packages/clay-date-picker/src/**/*.tsx', packagesOptions),
	createSource('../packages/clay-empty-state/src/**/*.tsx', packagesOptions),
);

export const sidebar = mergeSources(docs, documents);

export const data = mergeSources(docs, documents);
