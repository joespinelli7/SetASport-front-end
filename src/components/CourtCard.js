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
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import './CourtCard.css'
import classnames from 'classnames';

const styles = theme => ({
  card: {
    marginTop: 72.5,
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


class CourtCard extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      players: props.featureToShow.users
    }
  }

/////checks user into a location by sending POST fetch to backend and creating a new user instance
/////inside that specific court if the user isn't already checked into another location
  checkinLocation = (location, user) => {

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
    .then(updatedUser => {
      this.props.updateCurrentUserState(updatedUser)
    })
    let copyOfState = this.state.players
    copyOfState.unshift(user)
    this.setState({
      players: copyOfState
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

/////checks user out of a location by sending DELETE fetch to backend and deleting user instance
/////inside that specific court
// find out how to pick out specfic /user_courts/:id url for the player
  checkOutLocation = (location, user) => {
    fetch(`http://localhost:3001/user_courts/${user.user_courts[0].id}`, {
      method: "DELETE"
    })
    let copyOfState = this.state.players
    let index = copyOfState.findIndex(player => player.id === user.id)
    copyOfState.splice(index, 1)
    this.setState({
      players: copyOfState
    })
  }
/////

// .then(res => res.json())
// .then(playerDeleted => {
//   debugger

// console.log(location, user)
// fetch(`http://localhost:3001/user_courts/${user.user_courts[0].id}`, {
//   method: "DELETE"
// })
// .then(res => res.json())
// .then(playerDeleted => {
// console.log(playerDeleted)
//   this.setState({
//     players: location.users.filter(player => {
//       debugger
//     })
//   })
// })

/////onClick of check out btn checks user out of that specific court
onCheckOutClick = (e) => {
  e.preventDefault()
  let checkCourt = this.props.checkIfAtCourt()
  if (checkCourt) {
    console.log(this.props.featureToShow)
    this.checkOutLocation(this.props.featureToShow, this.props.current_user)
  }
}
/////

  render() {
    const { classes } = this.props;
    // console.log(this.props.featureToShow.users)
    // console.log(this.props.current_user)
    // console.log(this.props)
    // console.log(this.props.current_user)
    let newArr = this.props.featureToShow.users.map(user => user.id)
    let iconStyles = {
      fontSize: '25px',
    };
    console.log(this.props.myCourts)
    let map = this.props.myCourts.map(court => court.id)
    console.log(map.includes(this.props.featureToShow.id))
    return (
      <Card className={classes.card}>
        <CardContent>
              <Typography variant="h5" component="h2" className="courtName">
                {this.props.featureToShow.name}
                { map.includes(this.props.featureToShow.id) ?
                  <IconButton className={classes.star}>
                    <StarIcon onClick={() => this.props.unFavCourt(this.props.featureToShow, this.props.current_user)} style={iconStyles} color="secondary" className={classes.title} />
                  </IconButton>
                  :
                  <IconButton className={classes.star}>
                    <StarBorderIcon onClick={() => this.props.favCourt(this.props.featureToShow, this.props.current_user)} style={iconStyles} color="secondary" className={classes.title} />
                  </IconButton>
                }
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
          <div>
          {newArr.includes(this.props.current_user.id) ?
            <Button size="small" color="primary" onClick={this.onCheckOutClick}>Check out</Button>
          :
            <Button size="small" color="primary" onClick={this.onCheckInClick}>Check in</Button>
          }
          </div>
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
