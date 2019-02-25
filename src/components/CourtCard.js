import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = {
  card: {
    minWidth: 275,
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
};

const CourtCard = (props) => {
  console.log(props.featureToShow)
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.featureToShow.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Address:
        </Typography>
        <Typography component="p">
          {props.featureToShow.address}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button size="small" color="primary">Play here</Button>
        <Button size="small" color="primary">Current players here</Button>
        <Button size="small" color="secondary" onClick={() => props.clearFeature(props.featureToShow)}>Close</Button>
      </CardActions>
    </Card>
  );
}

CourtCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CourtCard);
