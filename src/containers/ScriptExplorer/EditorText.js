/**
 * Created by kgrube on 2/9/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

@connect(state => ({
  scriptJSON: state.script.scriptJSON,
  scriptText: state.script.scriptText,
  LabTechScript: state.script.LabTechScript,
  /* eslint-disable indent */
}))
class EditorText extends Component {
  shouldExpandNode = (keyName, data, level) => {
    return level < 6;
  };

  render() {
    const {scriptText} = this.props;

    return (
      <div>
        {scriptText.map((script, idx) => {
          const {
            ScriptId, InitialCheck, ThenSection, ElseSection,
          } = script;
          return (
            <div key={`${ScriptId}-${idx}`}>
              ScriptId:
              <pre>{ScriptId}</pre><br/>
              InitialCheck:
              <pre>{InitialCheck}</pre><br/>
              Then:
              <pre>{ThenSection}</pre><br/>
              Else:
              <pre>{ElseSection}</pre>
            </div>
          );
        })}
      </div>
    );
  }
}

EditorText.defaultProps = {
  LabTechScript: undefined,
};

/* eslint-disable react/no-unused-prop-types */
EditorText.propTypes = {
  scriptText: PropTypes.string.isRequired,
  LabTechScript: PropTypes.object,
};

export default EditorText;
