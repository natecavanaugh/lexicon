import type {MDXComponents} from 'mdx/types';
import {
	SandpackProvider,
	SandpackLayout,
	SandpackCodeEditor,
	theme,
} from '@/app/_components/Sandpack';
import classNames from 'classnames';
import Link from 'next/link';
import styles from './mdx-components.module.css';

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...components,
		h1: ({children}) => <h1 className="text-10">{children}</h1>,
		h2: ({children}) => <h2 className="text-7 mb-4 mt-5">{children}</h2>,
		h3: ({children}) => (
			<h3 className="text-6 mb-3 mt-4 text-weight-semi-bold">
				{children}
			</h3>
		),
		h4: ({children}) => (
			<h4 className="text-4 mb-2 mt-3 text-weight-semi-bold">
				{children}
			</h4>
		),
		p: ({children}) => <p className={styles.p}>{children}</p>,
		ul: ({children}) => <ul className={styles.ul}>{children}</ul>,
		code: ({children}) => <code className={styles.code}>{children}</code>,
		a: ({children, ...otherProps}) => {
			const As = otherProps.href?.includes('http') ? 'a' : Link;

			return (
				<As
					{...(otherProps as any)}
					className="c-link link-primary text-decoration-underline"
				>
					{children}
				</As>
			);
		},
		pre: ({children, ...otherProps}) => {
			return (
				<SandpackProvider
					className={classNames('mb-4', styles.sp)}
					theme={theme as any}
					files={{
						'/App.tsx': {
							active: true,
							code: (children as any).props.children,
						},
					}}
				>
					<SandpackLayout>
						<SandpackCodeEditor
							showLineNumbers
							showReadOnly={false}
							readOnly
						/>
					</SandpackLayout>
				</SandpackProvider>
			);
		},
		blockquote: ({children, ...otherProps}) => (
			<blockquote {...otherProps} className={styles.blockquote}>
				{children}
			</blockquote>
		),
	};
}
