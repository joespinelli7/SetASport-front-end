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
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

const CourtCard = (props) => {
  console.log(props.featureToShow.users)
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.featureToShow.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Address:
        </Typography>
        <Typography component="h4">
          {props.featureToShow.address}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small" color="primary">Check in</Button>
        <h3>Current Players Here:</h3>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: props.expanded,
              })}
              onClick={props.handleExpandClick}
              aria-expanded={props.expanded}
              aria-label="Show more"
            >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={props.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Player(s):</Typography>
            <Typography>
              {props.featureToShow.users.map(user =>
                <h4 key={user.id}>
                  {user.full_name}
                  <hr />
                </h4>
              )}
            </Typography>
            </CardContent>
       </Collapse>
        <Button size="small" color="secondary" onClick={() => props.clearFeature(props.featureToShow)}>Close</Button>
      </CardActions>
    </Card>
  );
}

CourtCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourtCard);

// <Button size="small" color="primary" onClick={() => props.featureToShow}>Current players here</Button>
