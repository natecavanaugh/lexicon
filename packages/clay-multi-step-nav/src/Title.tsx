/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import React from 'react';

export type Props = {
	/**
	 * Title content.
	 */
	children?: React.ReactNode;
};

const MultiStepNavTitle = ({children}: Props) => (
	<div className="multi-step-title">{children}</div>
);

export {MultiStepNavTitle};
export default MultiStepNavTitle;
