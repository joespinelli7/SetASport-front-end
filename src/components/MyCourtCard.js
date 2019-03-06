import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Grid from '@material-ui/core/Grid';
import classnames from 'classnames';
import './CourtCard.css'
import {Route, Switch, Redirect, Link} from 'react-router-dom'

const styles = theme => ({
  card: {
    maxWidth: 500,
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
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(270deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(90deg)',
  },
  star: {
    zIndex: 100,
    position: 'absolute',
  }
});

// (location.users.includes(location.current_user) ?
//   alert("Already checked in")
//   :
//   location.users.push(location.current_user)
// )


class MyCourtCard extends React.Component {

  goToLocation = (longitude, latitude) => {
    console.log(longitude, latitude)
  }

  render() {
    const { classes } = this.props;
    // console.log(this.props.courtObj)
    // console.log(this.props.current_user)
    // console.log(this.props)
    // console.log(this.props.current_user)
    let iconStyles = {
      fontSize: '25px',
    };
    console.log(this.props.courtObj)
    return (
      <div className="myCourtName">
      <Card className={classes.card}>
        <Divider />
        <CardContent>
              <Typography variant="h5" component="h2" className="courtName">
                {this.props.courtObj.name}
              </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Address:
          </Typography>
          <Typography component="h4">
            {this.props.courtObj.address}
          </Typography>
        </CardContent>
        <Divider />
        <div className="courtName">
          <Button size="small" color="primary" onClick={() => this.goToLocation(this.props.courtObj.longitude, this.props.courtObj.latitude)}>Go to location on map</Button>
        </div>
      </Card>
      </div>
    );
  }
}

MyCourtCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MyCourtCard);
