import type {Metadata} from 'next';
import {sidebar} from '@/data';

import {getData, DocsLayout} from './DocsLayout';
import {RemoteLayout} from './RemoteLayout';

type Props = {
	params: {
		slug: Array<string>;
	};
};

export async function generateStaticParams() {
	const paths: Array<Array<string>> = sidebar.paths();

	return paths.map((path) => ({
		slug: path,
	}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
	const document = await getData(
		params.slug.filter((item) => item !== 'design')
	);

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
	const Content = params.slug.includes('design') ? RemoteLayout : DocsLayout;

	return <Content slug={params.slug} />;
}
