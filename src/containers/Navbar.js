import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import paddle from '../images/paddle.png'
import {Link} from 'react-router-dom'
import Divider from '@material-ui/core/Divider'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={paddle} alt="logo" />
          <h3>SetASport</h3>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            <Button component={Link} color="inherit" to="/about">
              About
            </Button>
            { props.current_user ?
                <Button component={Link} color="inherit" to="/map">
                  Map
                </Button>
              :
              null
            }
            { props.current_user ?
                <Button component={Link} color="inherit" to="/mycourts">
                  myCourts
                </Button>
              :
              null
            }
          </Typography>
          { props.current_user ?
            <Button color="inherit" onClick={() => props.logout()}>Sign out</Button>
            :
            null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);

// <Typography variant="h4" color="inherit" className={classes.grow}>
//   <Button color="inherit"><Link to="/">Home</Link></Button>
//   <Button color="inherit"><Link to="/map">Map</Link></Button>
// </Typography>
