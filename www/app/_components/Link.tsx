'use client';

import {usePathname} from 'next/navigation';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './link.module.css';

export default function ClayLink({
	children,
	href,
	...otherProps
}: React.ComponentProps<typeof Link>) {
	const pathname = usePathname();

	return (
		<Link
			{...otherProps}
			href={href}
			className={classNames({
				[styles.link_active]: pathname === href,
			})}
		>
			{children}
		</Link>
	);
}
