/**
 * Created by kgrube on 2/9/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextArea} from 'semantic-ui-react';
import {connect} from 'react-redux';

import {setXML} from '../../redux/script';

@connect(state => ({scriptXML: state.script.scriptXML}), {setXML})
class EditorXML extends Component {
  handleXMLChange = (event, {value}) => {
    this.props.setXML({scriptXML: value});
  };

  render() {
    return (
      <TextArea
        onChange={this.handleXMLChange}
        rows={10}
        value={this.props.scriptXML}
        style={{width: '100%', resize: 'vertical'}}
      />
    );
  }
}

EditorXML.propTypes = {
  setXML: PropTypes.func.isRequired,
  scriptXML: PropTypes.string.isRequired,
};

export default EditorXML;
