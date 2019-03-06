import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MyCourtCard from '../components/MyCourtCard'
import CourtCard from '../components/CourtCard'

const styles = {
  card: {
    minWidth: 275,
    textAlign: 'center',
    marginLeft: 175,
    marginRight: 175,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
  },
};

class MyCourts extends React.Component {
  state = {
    anchorEl: null,
  };

  render () {
    console.log(this.props)
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    return (
      <div>
      <header>
      <video loop muted autoPlay playsInline poster="https://trustedpartner.azureedge.net/images/library/CalStateGames2015/Summer%20Games/Pickleball.JPG">
        <source src="https://trustedpartner.azureedge.net/images/library/CalStateGames2015/Summer%20Games/Pickleball.JPG" type="video/mp4"/>
      </video>
      </header>
      <AppBar color="primary" position="static" color="default">
        <Toolbar>
          <Typography className="header" variant="h6" color="inherit">
            myCourts
          </Typography>
        </Toolbar>
      </AppBar>
      {this.props.myCourts.map(courtObj =>
       <MyCourtCard courtObj={courtObj}/>
      )}
      </div>
    );
  }
}

MyCourts.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCourts);
