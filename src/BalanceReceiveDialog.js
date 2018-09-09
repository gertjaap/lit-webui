/**
 * Created by joe on 4/21/18.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "material-ui/styles/index";
import Button from '@material-ui/core/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import PopUpDialog from './PopUpDialog.js'
import ReceiveIcon from '@material-ui/icons/ArrowDownward';

const styles = theme => ({
  content: {
  },
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


class BalanceReceiveDialog extends PopUpDialog {

  constructor(props) {
    super(props);
    this.state = Object.assign(this.state,
      {
        address: "",
      });
  }

  handleClickOpen() {
    super.handleClickOpen();
    this.props.newAddress(1, this.props.coinType)
      .then(result => {
        this.setState({
          address: result.WitAddresses[0]
        });
      });
  }

  render() {
    const {classes} = this.props;

    return (
      <div>
        <Button
          variant="extendedFab"
          aria-label="Receive"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen.bind(this)}
        >
          <ReceiveIcon className={classes.extendedIcon} />
          Receive
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose.bind(this)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Receive Funds</DialogTitle>
          <DialogContent className={classes.content}>
            <DialogContentText>
              Ask sender to send to this address:
            </DialogContentText>
            <DialogContentText variant="body2">
              {this.state.address}
              <CopyToClipboard text={this.state.address}>
                <Button>Copy</Button>
              </CopyToClipboard>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose.bind(this)} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

BalanceReceiveDialog.propTypes = {
  coinType: PropTypes.number.isRequired,
  newAddress: PropTypes.func.isRequired,
};

export default withStyles(styles)(BalanceReceiveDialog);
