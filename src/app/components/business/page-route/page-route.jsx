import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

class PageRoute extends Component {
  static propTypes = {
    onEnter: PropTypes.func,
    onChange: PropTypes.func
  };

  componentDidUpdate () {
    this.props.onChange && this.props.onChange();
  }

  canRouteEnter () {
    let canEnter = true;
    let matchPath = this.props.computedMatch.path;

    if (matchPath !== '/') {
      // canEnter =   //TODO add logic to validate if url can access or not

      if (this.props.onEnter) {
        canEnter = canEnter && this.props.onEnter();
      }

      if (!canEnter) {
        // TODO if has no permissio redirecte to homepage or other page which has permission.
        // return;
      }
    }

    return canEnter;
  }

  render () {
    let { render, component, ...otherProps } = this.props;

    return (
      <Route
        {...otherProps}
        render={props => {
          let Component = component;

          if (this.canRouteEnter()) {
            return <Component {...props} />;
          }
          return null;
        }}
      />
    );
  }
}

export default PageRoute;
