import * as d3 from 'd3';
import Geomap from '../Geomap';

let consoleErrorReference;

/**
 * Stubs console.error
 */
function mockConsoleError() {
	console.error = () => {};
}

/**
 * Creates a Geomap
 * @param {Object} config
 * @return {Geomap}
 */
function createMap(config = {}) {
	return new Geomap(config);
}

describe('Geomap', () => {
	beforeEach(() => {
		consoleErrorReference = console.error;
	});

	afterEach(() => {
		console.error = consoleErrorReference;
	});

	it('should throw an error if required configuration is invalid', () => {
		mockConsoleError();

		expect(createMap).toThrow();
	});

	it('should accept data as a string', () => {
		d3.json = jest.fn();

		const geomap = createMap({
			data: './data/world-low-res.geo.json',
		});

		expect(geomap).toMatchSnapshot();
	});

	it('should accept data as an object', () => {
		const geomap = createMap({
			data: {
				features: [
					{
						properties: {},
					},
				],
			},
		});

		expect(geomap).toMatchSnapshot();
	});

	it('should accept data as a function', () => {
		const geomap = createMap({
			data: () => {
				return new Promise(resolve => {
					setTimeout(() => {
						resolve({
							features: [
								{
									properties: {},
								},
							],
						});
					}, 500);
				});
			},
		});
		expect(geomap).toMatchSnapshot();
	});
});
