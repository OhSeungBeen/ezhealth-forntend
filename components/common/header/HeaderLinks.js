import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Button from '../../buttons/Button.js';

import styles from 'styles/jss/nextjs-material-kit/components/headerLinksStyle.js';

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const { user, onLogout } = props;
  return (
    <List className={classes.list}>
      {user ? (
        <>
          <ListItem className={classes.listItem}>
            <Button
              justIcon
              round
              href="#pablo"
              className={classes.notificationNavLink}
              onClick={(e) => e.preventDefault()}
              color="primary"
            >
              {user.username[0]}
            </Button>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link href="/" as="/">
              <Button
                color="transparent"
                className={classes.navLink}
                onClick={onLogout}
              >
                <ExitToAppIcon className={classes.icons} />
                Logout
              </Button>
            </Link>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem className={classes.listItem}>
            <Link href="/register" as="/register">
              <Button color="transparent" className={classes.navLink}>
                <PersonIcon className={classes.icons} />
                Join
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link href="/login" as="/login">
              <Button color="transparent" className={classes.navLink}>
                <ExitToAppIcon className={classes.icons} />
                Login
              </Button>
            </Link>
          </ListItem>
        </>
      )}

      <ListItem className={classes.listItem}>
        <Tooltip
          id="youtube"
          title="Follow me on youtube"
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://www.youtube.com/channel/UCPl7BJ8R5HPBTlxlIPOQyjQ"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-youtube'} />
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram"
          title="Follow me on instagram"
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/5__teven/"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-instagram'} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
