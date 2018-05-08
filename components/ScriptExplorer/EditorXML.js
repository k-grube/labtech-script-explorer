/**
 * Created by kgrube on 2/9/2018
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TextArea} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

import {setXML, fileReadError, fileDropRejected} from '../../redux/script';
import './EditorXML.css';

class EditorXML extends Component {
  handleDropRejected = (files) => {
    console.log('drop rejected', files);
    this.props.fileDropRejected();
  };

  handleDropAccepted = (files) => {
    console.log('dropped files: ', files);
    const reader = new FileReader();
    reader.onload = () => {
      this.props.setXML({scriptXML: reader.result});
      files.forEach((file) => window.URL.revokeObjectURL(file.preview));
    };
    reader.onerror = () => this.props.fileReadError({error: reader.error});
    reader.readAsText(files[0]);
  };

  handleXMLChange = (event, {value}) => {
    this.props.setXML({scriptXML: value});
  };

  render() {
    return (
      <Dropzone
        accept="text/xml"
        onDropAccepted={this.handleDropAccepted}
        onDropRejected={this.handleDropRejected}
        className="dropzone"
        rejectClassName="dropzone-reject"
        activeClassName="dropzone-active"
        disableClick
      >
        <TextArea
          onChange={this.handleXMLChange}
          rows={10}
          value={this.props.scriptXML}
          style={{width: '100%', resize: 'vertical'}}
          placeholder="Drag or paste a LabTech XML file."
        />
      </Dropzone>
    );
  }
}

EditorXML.propTypes = {
  setXML: PropTypes.func,
  scriptXML: PropTypes.string,
  fileReadError: PropTypes.func,
  fileDropRejected: PropTypes.func,
};

EditorXML.defaultProps = {
  scriptXML: '',
  setXML: () => {},
  fileReadError: () => {},
  fileDropRejected: () => {},
};


export default connect(
  (state) => ({scriptXML: state.script.scriptXML}),
  {setXML, fileReadError, fileDropRejected},
)(EditorXML);
