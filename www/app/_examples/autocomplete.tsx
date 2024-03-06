'use client';

import Autocomplete from '@clayui/autocomplete';
import Form from '@clayui/form';

export const Example = () => (
	<Form.Group>
		<label htmlFor="clay-autocomplete-1" id="clay-autocomplete-label-1">
			Numbers
		</label>
		<Autocomplete
			aria-labelledby="clay-autocomplete-label-1"
			id="clay-autocomplete-1"
			defaultItems={['one', 'two', 'three', 'four', 'five']}
			messages={{
				loading: 'Loading...',
				notFound: 'No results found',
			}}
			placeholder="Enter a number from One to Five"
		>
			{(item) => <Autocomplete.Item key={item}>{item}</Autocomplete.Item>}
		</Autocomplete>
	</Form.Group>
);

export const MenuTrigger = () => (
	<Form.Group>
		<label htmlFor="clay-autocomplete-2" id="clay-autocomplete-label-2">
			Fruits
		</label>
		<Autocomplete
			aria-labelledby="clay-autocomplete-label-2"
			id="clay-autocomplete-2"
			defaultItems={[
				'Apples',
				'Bananas',
				'Cantaloupe',
				'Mangos',
				'Oranges',
				'Strawberries',
			]}
			messages={{
				loading: 'Loading...',
				notFound: 'No results found',
			}}
			placeholder="Enter the name of a fruit"
			menuTrigger="focus"
		>
			{(item) => <Autocomplete.Item key={item}>{item}</Autocomplete.Item>}
		</Autocomplete>
	</Form.Group>
);
