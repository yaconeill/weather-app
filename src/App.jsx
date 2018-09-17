import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import LocationListContainer from './containers/LocationListContainer';

import './App.css';
import ForecastExtendedContainer from './containers/ForecastExtendedContainer';

const cities = [
	'Santa Cruz de Tenerife, es',
	'Las Palmas de Gran Canaria, es',
	'Madrid, es',
	'Bilbao, es',
	'Londres'
];


class App extends Component {

	render() {
		return (
			<MuiThemeProvider>
				<div>
					<Grid>
						<Row>
							<Col xs={12}>
								<AppBar title="Weather App" />
							</Col>
						</Row>
						<Row>
							<Col xs={12} md={6}>
								<LocationListContainer cities={cities} />
							</Col>
							<Col xs={12} md={6}>
								<Paper zDepth={4}>
									<div className="detail">
										<ForecastExtendedContainer />
									</div>
								</Paper>
							</Col>
						</Row>
					</Grid>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
