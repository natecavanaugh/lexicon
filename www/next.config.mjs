import clay from '@clayui/css';
import {createMdxtsPlugin} from 'mdxts/next';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';
import webpack from 'webpack';

const withMDX = createMdxtsPlugin({
	gitSource: 'https://github.com/liferay/clay',
	options: {
		rehypePlugins: [rehypeMdxCodeProps],
		remarkPlugins: [remarkGfm],
	},
	theme: 'github-light',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['mdx', 'ts', 'tsx'],
	async redirects() {
		return [
			{
				destination: '/docs/introduction/how-to-use-clay',
				permanent: true,
				source: '/docs/components',
			},
		];
	},
	sassOptions: {
		includePaths: [clay.includePaths[0]],
		precision: 8,
	},
	webpack(config) {
		/* Silence critical dependency warnings for @ts-morph/common */
		config.plugins.push(
			new webpack.ContextReplacementPlugin(
				/(micromark-extension-mdx-jsx)/,
				(data) => {
					for (const dependency of data.dependencies) {
						console.log(dependency);
						delete dependency.critical;
					}
					return data;
				}
			)
		);
		return config;
	},
};

export default withMDX(nextConfig);
