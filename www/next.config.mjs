import clay from '@clayui/css';
import { createMdxtsPlugin } from 'mdxts/next';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import remarkGfm from 'remark-gfm';

const withMDX = createMdxtsPlugin({
  theme: 'github-light',
  gitSource: 'https://github.com/liferay/clay',
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeMdxCodeProps],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'ts', 'tsx'],
  sassOptions: {
    includePaths: [clay.includePaths[0]],
    precision: 8,
  }
};

export default withMDX(nextConfig);
