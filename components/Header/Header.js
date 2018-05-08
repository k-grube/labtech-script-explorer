import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'semantic-ui-css/themes/default/assets/fonts/icons.eot';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff';
import 'semantic-ui-css/themes/default/assets/fonts/icons.woff2';
import 'semantic-ui-css/semantic.min.css';

import DesktopContainer from './DesktopContainer';
import MobileContainer from './MobileContainer';

const ResponsiveContainer = ({children}) => (
  <div>
    <Head>
      <title>LabTech Geek Bin</title>
      <link rel="stylesheet" href="/_next/static/style.css"/>
    </Head>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
);

ResponsiveContainer.defaultProps = {
  children: null,
};

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
};

export default ResponsiveContainer;
