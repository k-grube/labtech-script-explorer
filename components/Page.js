import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {connect} from 'react-redux';
import Head from 'next/head';
import Header from './Header';

export default connect((state) => state)((props) => {
  const {title = '', linkTo = '', children} = props;
  return (
    <Header>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      {children}
    </Header>
  );
});
