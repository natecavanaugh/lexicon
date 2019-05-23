/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */
import ClayTable from '../src';
import React from 'react';
import {boolean, select} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react';

import ClayButton from '@clayui/button';
import ClayIcon from '@clayui/icon';
import ClayLabel from '@clayui/label';
import ClayProgressBar from '@clayui/progress-bar';

import ClayCheckboxWithState from '../fixtures/ClayCheckboxWithState';
import ClayDropdownWithTrigger from '../fixtures/ClayDropdownWithTrigger';

import 'clay-css/lib/css/atlas.css';

const spritemap = require('clay-css/lib/images/icons/icons.svg');

storiesOf('ClayTable', module)
	.add('default', () => {
		const DownloadButton = () => (
			<ClayButton displayType="secondary">{'Download'}</ClayButton>
		);

		const HeadCellTitles = [
			'Image',
			'Origin',
			'Time',
			'Spicy Level',
			'Download',
			'Difficulty',
		];

		const rowCellItems = [
			'',
			'',
			'',
			'',
			<DownloadButton />,
			<ClayProgressBar spritemap={spritemap} value={0} />,
			<ClayDropdownWithTrigger />,
		];

		return (
			<form>
				<ClayTable
					bodyVerticalAlignment={select(
						'body vertical alignment',
						{bottom: 'bottom', middle: 'middle', top: 'top'},
						'middle'
					)}
					bordered={boolean('bordered', false)}
					headingNoWrap={boolean('heading no wrap', false)}
					headVerticalAlignment={select(
						'head vertical alignment',
						{bottom: 'bottom', middle: 'middle', top: 'top'},
						'middle'
					)}
					hover={boolean('hover', true)}
					noWrap={boolean('no wrap', false)}
					responsive={boolean('responsive', false)}
					responsiveSize={select(
						'responsive size',
						{sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'},
						'sm'
					)}
					striped={boolean('striped', false)}
					tableVerticalAlignment={select(
						'table vertical alignment',
						{bottom: 'bottom', middle: 'middle', top: 'top'},
						'middle'
					)}
				>
					<ClayTable.Head>
						<ClayTable.Row>
							<ClayTable.Cell headingCell>
								<ClayButton displayType="unstyled">
									{'Name'}
								</ClayButton>
								<ClayIcon
									spritemap={spritemap}
									symbol="order-arrow-up"
								/>
							</ClayTable.Cell>
							{HeadCellTitles.map(title => (
								<ClayTable.Cell headingCell>
									{title}
								</ClayTable.Cell>
							))}
						</ClayTable.Row>
					</ClayTable.Head>
					<ClayTable.Body>
						<ClayTable.Row divider>
							<ClayTable.Cell colSpan={8}>
								{'Folders'}
							</ClayTable.Cell>
						</ClayTable.Row>

						<ClayTable.Row active>
							<ClayTable.Cell expanded headingTitle>
								{'Photos'}
							</ClayTable.Cell>
							{rowCellItems.map(child => (
								<ClayTable.Cell>{child}</ClayTable.Cell>
							))}
						</ClayTable.Row>

						<ClayTable.Row>
							<ClayTable.Cell expanded headingTitle>
								{'Videos'}
							</ClayTable.Cell>
							{rowCellItems.map(child => (
								<ClayTable.Cell>{child}</ClayTable.Cell>
							))}
						</ClayTable.Row>

						<ClayTable.Row divider>
							<ClayTable.Cell colSpan={8}>
								{'Recipes'}
							</ClayTable.Cell>
						</ClayTable.Row>

						<ClayTable.Row>
							<ClayTable.Cell expanded headingTitle>
								{'Hamburger'}
							</ClayTable.Cell>
							<ClayTable.Cell />
							<ClayTable.Cell>{'U.S.A'}</ClayTable.Cell>
							<ClayTable.Cell align="right">
								{'10 min.'}
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayLabel displayType="success">
									No Spicy
								</ClayLabel>
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayButton displayType="secondary">
									{'Download'}
								</ClayButton>
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayProgressBar
									spritemap={spritemap}
									value={2}
								/>
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayDropdownWithTrigger />
							</ClayTable.Cell>
						</ClayTable.Row>

						<ClayTable.Row>
							<ClayTable.Cell expanded headingTitle>
								{'Ramen'}
							</ClayTable.Cell>
							<ClayTable.Cell />
							<ClayTable.Cell>{'China'}</ClayTable.Cell>
							<ClayTable.Cell align="right">
								{'90 min.'}
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayLabel displayType="warning">
									Spicy
								</ClayLabel>
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayButton displayType="secondary">
									{'Download'}
								</ClayButton>
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayProgressBar
									spritemap={spritemap}
									value={8}
								/>
							</ClayTable.Cell>
							<ClayTable.Cell>
								<ClayDropdownWithTrigger />
							</ClayTable.Cell>
						</ClayTable.Row>

						<ClayTable.Row divider>
							<ClayTable.Cell colSpan={8}>
								{'Chefs'}
							</ClayTable.Cell>
						</ClayTable.Row>

						<ClayTable.Row>
							<ClayTable.Cell expanded headingTitle>
								{'Ferrán Adriá'}
							</ClayTable.Cell>
							{rowCellItems.map(child => (
								<ClayTable.Cell>{child}</ClayTable.Cell>
							))}
						</ClayTable.Row>
					</ClayTable.Body>
				</ClayTable>
			</form>
		);
	})
	.add('with table list', () => {
		const HeadCellTitles = [
			'ID',
			'Title',
			'Status',
			'Modified Date',
			'Display Date',
			'Author',
		];

		const rowCellTitles = [
			<ClayCheckboxWithState />,
			'21146',
			'Some regular text',
			'--',
			'1 Hour Ago',
			'--',
			'Stanley Nelson',
		];

		return (
			<form>
				<ClayTable
					bodyVerticalAlignment={select(
						'body vertical alignment',
						{bottom: 'bottom', middle: 'middle', top: 'top'},
						'middle'
					)}
					bordered={boolean('bordered', false)}
					headingNoWrap={boolean('heading no wrap', false)}
					headVerticalAlignment={select(
						'head vertical alignment',
						{bottom: 'bottom', middle: 'middle', top: 'top'},
						'middle'
					)}
					hover={boolean('hover', true)}
					noWrap={boolean('no wrap', true)}
					responsive={boolean('responsive', false)}
					responsiveSize={select(
						'responsive size',
						{sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'},
						'sm'
					)}
					striped={boolean('striped', false)}
					tableVerticalAlignment={select(
						'table vertical alignment',
						{bottom: 'bottom', middle: 'middle', top: 'top'},
						'middle'
					)}
				>
					<ClayTable.Head>
						<ClayTable.Row>
							<ClayTable.Cell />
							{HeadCellTitles.map(title => (
								<ClayTable.Cell headingCell headingTitle>
									<span className="text-truncate">
										{title}
									</span>
								</ClayTable.Cell>
							))}
						</ClayTable.Row>
					</ClayTable.Head>

					<ClayTable.Body>
						<ClayTable.Row divider>
							<ClayTable.Cell colSpan={9}>
								{'Group 1'}
							</ClayTable.Cell>
						</ClayTable.Row>
						<ClayTable.Row>
							{rowCellTitles.map(title => (
								<ClayTable.Cell>{title}</ClayTable.Cell>
							))}
						</ClayTable.Row>
						<ClayTable.Row>
							{rowCellTitles.map(title => (
								<ClayTable.Cell>{title}</ClayTable.Cell>
							))}
						</ClayTable.Row>
						<ClayTable.Row>
							{rowCellTitles.map(title => (
								<ClayTable.Cell>{title}</ClayTable.Cell>
							))}
						</ClayTable.Row>
					</ClayTable.Body>
				</ClayTable>
			</form>
		);
	})
	.add('with table list striped', () => (
		<form>
			<ClayTable
				bodyVerticalAlignment={select(
					'body vertical alignment',
					{bottom: 'bottom', middle: 'middle', top: 'top'},
					'middle'
				)}
				bordered={boolean('bordered', false)}
				headingNoWrap={boolean('heading no wrap', false)}
				headVerticalAlignment={select(
					'head vertical alignment',
					{bottom: 'bottom', middle: 'middle', top: 'top'},
					'middle'
				)}
				hover={boolean('hover', true)}
				noWrap={boolean('no wrap', false)}
				responsive={boolean('responsive', false)}
				responsiveSize={select(
					'responsive size',
					{sm: 'sm', md: 'md', lg: 'lg', xl: 'xl'},
					'sm'
				)}
				striped={boolean('striped', true)}
				tableVerticalAlignment={select(
					'table vertical alignment',
					{bottom: 'bottom', middle: 'middle', top: 'top'},
					'middle'
				)}
			>
				<ClayTable.Head>
					<ClayTable.Row>
						<ClayTable.Cell headingCell />
						<ClayTable.Cell expanded headingCell headingTitle>
							<span className="text-truncate">
								{'Description'}
							</span>
						</ClayTable.Cell>
						<ClayTable.Cell headingCell>
							<span className="text-truncate">{'Format'}</span>
						</ClayTable.Cell>
						<ClayTable.Cell headingCell>
							<span className="text-truncate">{'Label'}</span>
						</ClayTable.Cell>
						<ClayTable.Cell headingCell />
					</ClayTable.Row>
				</ClayTable.Head>

				<ClayTable.Body>
					<ClayTable.Row>
						<ClayTable.Cell>
							<ClayCheckboxWithState />
						</ClayTable.Cell>
						<ClayTable.Cell expanded headingTitle>
							<span className="text-truncate">
								{
									'Wings eu, pumpkin spice robusta, kopi-luwak mocha caffeine froth grounds.'
								}
							</span>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<a href="1">{'JPG'}</a>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<a href="1">{'JPG'}</a>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<ClayDropdownWithTrigger />
						</ClayTable.Cell>
					</ClayTable.Row>
					<ClayTable.Row>
						<ClayTable.Cell>
							<ClayCheckboxWithState />
						</ClayTable.Cell>
						<ClayTable.Cell expanded headingTitle>
							<span className="text-truncate">
								{
									'Wings eu, pumpkin spice robusta, kopi-luwak mocha caffeine froth grounds.'
								}
							</span>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<a href="2">{'GIF'}</a>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<a href="2">{'GIF'}</a>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<ClayDropdownWithTrigger />
						</ClayTable.Cell>
					</ClayTable.Row>
					<ClayTable.Row>
						<ClayTable.Cell>
							<ClayCheckboxWithState />
						</ClayTable.Cell>
						<ClayTable.Cell expanded headingTitle>
							<span className="text-truncate">
								{
									'Wings eu, pumpkin spice robusta, kopi-luwak mocha caffeine froth grounds.'
								}
							</span>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<a href="3">{'TIFF'}</a>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<a href="3">{'TIFF'}</a>
						</ClayTable.Cell>
						<ClayTable.Cell>
							<ClayDropdownWithTrigger />
						</ClayTable.Cell>
					</ClayTable.Row>
				</ClayTable.Body>
			</ClayTable>
		</form>
	));
