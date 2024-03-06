'use client';

import classNames from 'classnames';
import NavigationBar from '@clayui/navigation-bar';
import ClayLink, {ClayLinkContext} from '@clayui/link';
import Link from 'next/link';
import styles from './heading.module.css';

type Props = {
	description?: string;
	title: string;
	npmPackage?: string;
	use?: string;
};

export default function Heading({description, title, npmPackage, use}: Props) {
	return (
		<div className={styles.heading_container}>
			<h1 className="text-10">{title}</h1>
			{description && (
				<p className="text-6 text-secondary">{description}</p>
			)}

			{npmPackage && (
				<>
					<table className={classNames('table', styles.table)}>
						<tbody>
							<tr>
								<th>install</th>
								<td>yarn add {npmPackage}</td>
							</tr>
							<tr>
								<th>version</th>
								<td>
									<img
										alt="NPM Version"
										src={`https://img.shields.io/npm/v/${npmPackage}?style=flat-square&logo=npm&label=%20&labelColor=%23fff&color=%23fff`}
									/>
								</td>
							</tr>
							<tr>
								<th>use</th>
								<td>{use}</td>
							</tr>
						</tbody>
					</table>

					<ClayLinkContext.Provider value={Link}>
						<NavigationBar
							triggerLabel="Navigation"
							className={styles.nav}
						>
							<NavigationBar.Item active>
								<ClayLink href="#">React</ClayLink>
							</NavigationBar.Item>
							<NavigationBar.Item>
								<ClayLink href="#">HTML/CSS</ClayLink>
							</NavigationBar.Item>
						</NavigationBar>
					</ClayLinkContext.Provider>
				</>
			)}
		</div>
	);
}
