/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import Editor from '$clayui.com/src/components/Editor';
import ClayMultiStepNav, {
	ClayMultiStepNavWithBasicItems,
} from '@clayui/multi-step-nav';
import React from 'react';

const multiStepNavImportsCode = `import ClayMultiStepNav from '@clayui/multi-step-nav';
`;

const multiStepNavCode = `const Component = () => {
	const [value, setValue] = useState(1);

	const steps = [
		{
			subTitle: 'SubOne',
			title: 'One',
		},
		{
			subTitle: 'SubTwo',
			title: 'Two',
		},
		{
			subTitle: 'SubThree',
			title: 'Three',
		},
		{
			subTitle: 'SubFour',
			title: 'Four',
		},
	];

	return (
		<ClayMultiStepNav>
			{steps.map(({subTitle, title}, i) => {
				const complete = value > i;

				return (
					<ClayMultiStepNav.Item
						active={value === i}
						expand={i + 1 !== steps.length}
						key={i}
						state={complete ? 'complete' : undefined}
					>
						<ClayMultiStepNav.Title>
							{title}
						</ClayMultiStepNav.Title>
						<ClayMultiStepNav.Divider />
						<ClayMultiStepNav.Indicator
							complete={complete}
							label={1 + i}
							onClick={() => setValue(i)}
							subTitle={subTitle}
						/>
					</ClayMultiStepNav.Item>
				);
			})}
		</ClayMultiStepNav>
	);
}

render(<Component />)`;

const MultiStepNav = () => {
	const scope = {
		ClayMultiStepNav,
	};

	return (
		<Editor
			code={multiStepNavCode}
			imports={multiStepNavImportsCode}
			scope={scope}
		/>
	);
};

const multiStepNavCenterImportsCode = `import ClayMultiStepNav from '@clayui/multi-step-nav';
`;

const multiStepNavCenterCode = `const Component = () => {
	const [value, setValue] = useState(1);

	const steps = [
		{
			subTitle: 'Step 01',
			title: 'Ticket Buyer Information',
		},
		{
			subTitle: 'Step 02',
			title: 'Attendee Information',
		},
		{
			subTitle: 'Step 03',
			title: 'Payment Information',
		},
		{
			subTitle: 'Step 04',
			title: 'Completed',
		},
	];

	return (
		<ClayMultiStepNav center>
			{steps.map(({subTitle, title}, i) => {
				const complete = value > i;

				return (
					<ClayMultiStepNav.Item
						active={value === i}
						expand={i + 1 !== steps.length}
						key={i}
						state={complete ? 'complete' : undefined}
					>
						<ClayMultiStepNav.Title>
							{title}
						</ClayMultiStepNav.Title>
						<ClayMultiStepNav.Divider />
						<ClayMultiStepNav.Indicator
							complete={complete}
							label={1 + i}
							onClick={() => setValue(i)}
							subTitle={subTitle}
						/>
					</ClayMultiStepNav.Item>
				);
			})}
		</ClayMultiStepNav>
	);
}

render(<Component />)`;

const MultiStepNavCenter = () => {
	const scope = {
		ClayMultiStepNav,
	};

	return (
		<Editor
			code={multiStepNavCenterCode}
			imports={multiStepNavCenterImportsCode}
			scope={scope}
		/>
	);
};

const multiStepNavWithBasicItemsImportsCode = `import {ClayMultiStepNavWithBasicItems} from '@clayui/multi-step-nav';
`;

const multiStepNavWithBasicItemsCode = `const Component = (props) => {
	const [active, setActive] = useState(0);

	const steps = [
		{
			subTitle: 'SubOne',
			title: 'One',
		},
		{
			subTitle: 'SubTwo',
			title: 'Two',
		},
		{
			subTitle: 'SubThree',
			title: 'Three',
		},
		{
			subTitle: 'SubFour',
			title: 'Four',
		},
	];

	return (
		<ClayMultiStepNavWithBasicItems
			active={active}
			maxStepsShown={2}
			onActiveChange={setActive}
			spritemap={spritemap}
			steps={steps}
		/>
	);
}

render(<Component />)`;

const MultiStepNavWithBasicItems = () => {
	const scope = {
		ClayMultiStepNavWithBasicItems,
	};

	return (
		<Editor
			code={multiStepNavWithBasicItemsCode}
			imports={multiStepNavWithBasicItemsImportsCode}
			scope={scope}
		/>
	);
};

const multiStepNavWithErrorImportsCode = `import {ClayMultiStepNavWithBasicItems} from '@clayui/multi-step-nav';
`;

const multiStepNavErrorItemsCode = `const Component = (props) => {
	const [active, setActive] = useState(1);

	const steps = [
		{
			subTitle: 'SubOne',
			title: 'One',
		},
		{
			subTitle: 'SubTwo',
			title: 'Two',
		},
		{
			subTitle: 'SubThree',
			title: 'Three',
		},
		{
			subTitle: 'SubFour',
			title: 'Four',
		},
	];

	return (
		<ClayMultiStepNavWithBasicItems
			active={active}
			onActiveChange={setActive}
			spritemap={spritemap}
			state="error"
			steps={steps}
		/>
	);
}

render(<Component />)`;

const MultiStepNavError = () => {
	const scope = {
		ClayMultiStepNavWithBasicItems,
	};

	return (
		<Editor
			code={multiStepNavErrorItemsCode}
			imports={multiStepNavWithErrorImportsCode}
			scope={scope}
		/>
	);
};

export {
	MultiStepNav,
	MultiStepNavCenter,
	MultiStepNavError,
	MultiStepNavWithBasicItems,
};
