/**
 * SPDX-FileCopyrightText: © 2020 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * © 2019 Liferay, Inc. <https://liferay.com>
 *
 * SPDX-License-Identifier: BSD-3-Clause
 */

import ClayLanguagePicker from '..';
import {cleanup, fireEvent, render, screen} from '@testing-library/react';
import React from 'react';

const locales = [
	{
		displayName: 'English (United States)',
		id: 'en_US',
		label: 'en-US',
		symbol: 'en-us',
	},
	{
		displayName: 'Spanish (Spain)',
		id: 'es_ES',
		label: 'es-ES',
		symbol: 'es-es',
	},
	{
		displayName: 'French (France)',
		id: 'fr_FR',
		label: 'fr-FR',
		symbol: 'fr-fr',
	},
	{
		displayName: 'Dutch (Netherlands)',
		id: 'nl_NL',
		label: 'nl-NL',
		symbol: 'nl-nl',
	},
];

const onSelectedLocaleChange = jest.fn(() => null);

describe('ClayLanguagePicker', () => {
	afterEach(cleanup);

	it('renders', () => {
		const {container} = render(
			<ClayLanguagePicker locales={locales} spritemap="/path/to/svg" />
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with a default selected locale', () => {
		const {container} = render(
			<ClayLanguagePicker
				classNamesTrigger="trigger-class"
				defaultSelectedLocaleId={locales[1]!.id}
				locales={locales}
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with a selected locale', () => {
		const {container} = render(
			<ClayLanguagePicker
				classNamesTrigger="trigger-class"
				defaultSelectedLocaleId={locales[2]!.id}
				locales={locales}
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders a class name for the trigger', () => {
		const {container} = render(
			<ClayLanguagePicker
				classNamesTrigger="trigger-class"
				locales={locales}
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders the picker with id', () => {
		const {container} = render(
			<ClayLanguagePicker
				id="pickerId"
				locales={locales}
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with custom labels', () => {
		const {container} = render(
			<ClayLanguagePicker
				locales={locales}
				messages={{
					default: 'Default Label',
					option: 'Option Label',
					translated: 'Translated Label',
					translating: 'Translating Label',
					trigger: 'Trigger Label',
					untranslated: 'Untranslated Label',
				}}
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders a small picker', () => {
		const {container} = render(
			<ClayLanguagePicker
				locales={locales}
				small
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders with translations', () => {
		const {container} = render(
			<ClayLanguagePicker
				locales={locales}
				spritemap="/path/to/svg"
				translations={{
					'es-ES': {total: 4, translated: 2},
					'fr-FR': {total: 4, translated: 4},
				}}
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders hidding the trigger text', () => {
		const {container} = render(
			<ClayLanguagePicker
				hideTriggerText
				locales={locales}
				spritemap="/path/to/svg"
			/>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders the Default label in the correct default locale', () => {
		render(
			<ClayLanguagePicker
				defaultLocaleId="nl_NL"
				locales={locales}
				spritemap="/path/to/svg"
				translations={{
					'es-ES': {total: 4, translated: 2},
					'fr-FR': {total: 4, translated: 4},
				}}
			/>
		);

		fireEvent.click(screen.getByRole('combobox'));

		const nlOption = screen.getByRole('option', {name: /Dutch/});

		expect(nlOption).toHaveTextContent('Default');
	});

	it('renders different labels for translations', () => {
		render(
			<ClayLanguagePicker
				locales={locales}
				spritemap="/path/to/svg"
				translations={{
					'es-ES': {total: 4, translated: 2},
					'fr-FR': {total: 4, translated: 4},
				}}
			/>
		);

		fireEvent.click(screen.getByRole('combobox'));

		const esOption = screen.getByRole('option', {name: /Spanish/});
		const enOption = screen.getByRole('option', {name: /English/});
		const frOption = screen.getByRole('option', {name: /French/});
		const nlOption = screen.getByRole('option', {name: /Dutch/});

		expect(enOption).toHaveTextContent('Default');
		expect(esOption).toHaveTextContent('Translating 2/4');
		expect(frOption).toHaveTextContent('Translated');
		expect(nlOption).toHaveTextContent('Untranslated');
	});

	it('calls onSelectedLocaleChange when a language is selected', () => {
		render(
			<ClayLanguagePicker
				locales={locales}
				onSelectedLocaleChange={onSelectedLocaleChange}
				spritemap="/path/to/svg"
			/>
		);

		fireEvent.click(screen.getByRole('combobox'));

		fireEvent.click(screen.getByText('es-ES'));

		expect(onSelectedLocaleChange).toHaveBeenCalled();
	});

	it('calls onActiveChange when the trigger clicked', () => {
		const onActiveChange = jest.fn(() => null);

		render(
			<ClayLanguagePicker
				locales={locales}
				onActiveChange={onActiveChange}
				spritemap="/path/to/svg"
			/>
		);

		fireEvent.click(screen.getByRole('combobox'));

		expect(onActiveChange).toHaveBeenCalled();
	});
});