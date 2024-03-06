import clay from '@clayui/css';
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
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
