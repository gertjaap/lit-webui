import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {formatCoin, formatUSD} from './CoinTypes.js';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit,
    marginBottom: 0,
  },
  content: {
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
    display: 'flex',
    justifyContent: 'space-between',
  },
  balances: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  numbers: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {},
});

class BalanceCard extends React.Component {

  render() {

    const {classes} = this.props;
    let balance = this.props.balance;

    return (

      <Card raised={false} className={classes.card}>

        <CardContent className={classes.content}>

          <div>
            <img height="50" width="50" src={'/coinicons/' + balance.CoinType + '.png'}/>
          </div>
          <div className={classes.balances}>

            <div className={classes.numbers}>
              <Typography variant="title">
                {formatCoin(balance.ChanTotal + balance.TxoTotal, balance.CoinType)}
              </Typography>
            </div>

            <div className={classes.numbers}>
              <Typography>
                Channel: {formatCoin(balance.ChanTotal, balance.CoinType, false)}
              </Typography>
            </div>

            <div className={classes.numbers}>
              <Typography>
                On Chain: {formatCoin(balance.TxoTotal, balance.CoinType, false)}
              </Typography>
            </div>
          </div>

        </CardContent>

      </Card>
    );
  }
}

BalanceCard.propTypes = {
  balance: PropTypes.object.isRequired,
  handleSendSubmit: PropTypes.func.isRequired,
  coinRates: PropTypes.object.isRequired,
};


export default withStyles(styles)(BalanceCard);
