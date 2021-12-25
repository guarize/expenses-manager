import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';

class Chart extends Component {
  constructor() {
    super();

    this.getData = this.getData.bind(this);
    this.getSpending = this.getSpending.bind(this);
  }

  getSpending(tag) {
    const { info } = this.props;
    const spending = info
      .filter((expense) => expense.tag === tag)
      .reduce(
        (acc,
          { value,
            exchangeRates,
            currency }) => acc + value * exchangeRates[currency].ask,
        0,
      );
    return spending;
  }

  getData() {
    const { getSpending } = this;
    const data = {
      labels: ['Food', 'Leisure', 'Work', 'Transport', 'Health'],
      datasets: [
        {
          label: '# of Votes',
          data: [
            getSpending('Food'),
            getSpending('Leisure'),
            getSpending('Work'),
            getSpending('Transport'),
            getSpending('Health'),
          ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
          strokeStyle: 'white',
        },
      ],
    };
    return data;
  }

  render() {
    return (
      <div className="chart-container">
        <Doughnut
          className="chart-donut"
          data={ this.getData() }
          options={ { maintainAspectRatio: false } }
        />
      </div>
    );
  }
}

Chart.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  info: state.wallet.expenses,
});

export default connect(mapStateToProps)(Chart);
