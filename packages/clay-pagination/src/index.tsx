/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {Pagination} from './Pagination';
import {
	ClayPaginationWithBasicItems,
	ForwardPaginationWithBasicItems,
} from './PaginationWithBasicItems';

export {Ellipsis} from './Ellipsis';
export {Item} from './Item';
export {
	Pagination,
	ForwardPaginationWithBasicItems as ClayPaginationWithBasicItems,
	ClayPaginationWithBasicItems as UNSAFE_ClayPaginationWithBasicItems,
};
export default Pagination;
