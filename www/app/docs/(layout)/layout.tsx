import {Sidebar} from '../../_components/Sidebar';
import {Navbar} from '../../_components/Navbar';
import styles from './layout.module.css';

export default function DocsLayout({children}: {children: React.ReactNode}) {
	return (
		<>
			<Sidebar
				items={[
					{
						name: 'Introduction',
						items: [
							{name: 'How to use', href: '#'},
							{
								name: 'Composition Philosophy',
								href: '/docs/composition',
							},
							{name: 'Playground', href: '#'},
						],
					},
					{
						name: 'Application',
						items: [{name: 'Provider', href: '/docs/provider'}],
					},
					{
						name: 'Components',
						items: [
							{
								name: 'Autocomplete',
								href: '/docs/components/autocomplete',
							},
						],
					},
				]}
			/>
			<div className={styles.main}>
				<Navbar />
				<main className={styles.content}>{children}</main>
			</div>
		</>
	);
}
