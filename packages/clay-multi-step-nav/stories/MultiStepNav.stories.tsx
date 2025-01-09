/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React, {useState} from 'react';

import ClayMultiStepNav, {ClayMultiStepNavWithBasicItems} from '../src';

export default {
	component: ClayMultiStepNav,
	title: 'Design System/Components/MultiStepNav',
};

export const Default = (args: any) => {
	const [value, setValue] = useState<number>(1);

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
		<div className="sheet">
			<ClayMultiStepNav center={args.center}>
				{steps.map(({subTitle, title}, i: number) => {
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
		</div>
	);
};

Default.args = {
	center: false,
};

export const MultiStepNavWithBasicItems = (args: any) => {
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
		{
			subTitle: 'SubFive',
			title: 'Five',
		},
		{
			subTitle: 'SubSix',
			title: 'Six',
		},
		{
			subTitle: 'SubSeven',
			title: 'Seven',
		},
		{
			subTitle: 'SubEight',
			title: 'Eight',
		},
		{
			subTitle: 'SubNine',
			title: 'Nine',
		},
	];

	return (
		<div className="sheet">
			<ClayMultiStepNavWithBasicItems
				maxStepsShown={args.maxStepsShown}
				steps={steps}
			/>
		</div>
	);
};

MultiStepNavWithBasicItems.args = {
	maxStepsShown: 7,
};

export const Error = () => {
	const steps = [
		{
			title: 'Basic Information',
		},
		{
			title: 'Segment',
		},
		{
			title: 'Goals',
		},
		{
			title: 'Review and Save',
		},
	];

	return (
		<div className="sheet">
			<ClayMultiStepNavWithBasicItems
				defaultActive={2}
				state="error"
				steps={steps}
			/>
		</div>
	);
};
