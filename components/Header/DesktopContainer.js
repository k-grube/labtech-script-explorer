import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Responsive, Visibility, Segment, Menu, Container, Button} from 'semantic-ui-react';

export default class DesktopContainer extends Component {
  state = {};

  hideFixedMenu = () => this.setState({fixed: false});
  showFixedMenu = () => this.setState({fixed: true});

  render() {
    const {children} = this.props;
    const {fixed} = this.state;

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{minHeight: 80, padding: '1em 0em'}} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active>Home</Menu.Item>
                <Menu.Item as="a">Work</Menu.Item>
                <Menu.Item as="a">Company</Menu.Item>
                <Menu.Item as="a">Careers</Menu.Item>
                <Menu.Item position="right">
                  <Button as="a" inverted={!fixed}>Log in</Button>
                  <Button as="a" inverted={!fixed} primary={fixed} style={{marginLeft: '0.5em'}}>Sign Up</Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}

      </Responsive>
    );
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
};

DesktopContainer.defaultProps = {
  children: null,
};
