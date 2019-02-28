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
import classnames from 'classnames';

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
});

// (location.users.includes(location.current_user) ?
//   alert("Already checked in")
//   :
//   location.users.push(location.current_user)
// )


class CourtCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      players: props.featureToShow
    }
  }

/////checks user into a location by sending POST fetch to backend and creating a new user instance
/////inside that specific court if the user isn't already checked into another location
  checkinLocation = (location, user) => {
    console.log(location, user)
    fetch('http://localhost:3001/user_courts', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        user_id: user.id,
        court_id: location.id
      })
    })
    .then(res => res.json())
    .then(playerAdded => {
      this.setState({
        players: location.users.push(user)
      })
    })
  }
/////

/////onClick of check in btn checks to see if user is already checked in at any other courts
/////and if not then sends to checkinLocation to change state with player checked in
  onCheckInClick = (e) => {
    e.preventDefault()
    let checkCourt = this.props.checkIfAtCourt()
    if (!checkCourt) {
      this.checkinLocation(this.props.featureToShow, this.props.current_user)
    } else {
      alert(`You're already checked in at ${this.props.checkIfAtCourt()[0].name} court!`)
    }
  }
/////

  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.props.featureToShow.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Address:
          </Typography>
          <Typography component="h4">
            {this.props.featureToShow.address}
          </Typography>
        </CardContent>
        <Divider />
        <CardActions>
          <Button size="small" color="primary" onClick={this.onCheckInClick}>Check in</Button>
          <h3>Current Players Here:</h3>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.props.expanded,
                })}
                onClick={this.props.handleExpandClick}
                aria-expanded={this.props.expanded}
                aria-label="Show more"
              >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.props.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Player(s):</Typography>
              <Typography>
                {this.props.featureToShow.users.map(user =>
                  <div key={user.id}>
                    <p>{user.full_name}</p>
                    <hr />
                  </div>
                )}
              </Typography>
              </CardContent>
         </Collapse>
          <Button size="small" color="secondary" onClick={() => this.props.clearFeature(this.props.featureToShow)}>Close</Button>
        </CardActions>
      </Card>
    );
  }
}

CourtCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourtCard);

// <Button size="small" color="primary" onClick={() => props.featureToShow}>Current players here</Button>
