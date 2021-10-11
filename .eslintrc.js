/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

const path = require('path');

module.exports = {
	env: {
		browser: true,
		jest: true,
		node: true,
	},
	extends: ['plugin:@liferay/react'],
	parser: '@typescript-eslint/parser',
	plugins: ['@liferay', '@typescript-eslint'],
	rules: {
		'@liferay/empty-line-between-elements': 'off',
		'@liferay/imports-first': 'off',
		'@liferay/no-abbreviations': 'off',
		'@liferay/no-dynamic-require': 'off',
		'@liferay/no-length-jsx-expression': 'off',
		'@liferay/sort-imports': 'off',
		'@liferay/group-imports': 'off',
		'@typescript-eslint/array-type': ['error', {default: 'generic'}],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				format: ['PascalCase'],
				prefix: ['I'],
				selector: 'interface',
			},
		],
		'@typescript-eslint/no-unused-vars': 'error',
		'@typescript-eslint/no-use-before-define': 'off',
		'lines-around-comment': 'off',
		'no-for-of-loops/no-for-of-loops': 'off',
		'no-unused-vars': 'off',
		'notice/notice': [
			'error',
			{
				templateFile: path.join(__dirname, 'copyright.js'),
			},
		],
		'prefer-template': 'error',
		'react/display-name': 'error',
		'react/jsx-boolean-value': 'error',
		'react/jsx-curly-brace-presence': 'off',
		'react/jsx-no-bind': [
			'error',
			{
				allowArrowFunctions: true,
			},
		],
		'react/jsx-no-literals': 'off',
		'react/no-unescaped-entities': 'off',
		'react-hooks/exhaustive-deps': 'off',
		'sort-keys': 'off',
		'sort-vars': 'error',
		'spaced-comment': 'off',
	},
};
