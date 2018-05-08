/**
 * Created by kgrube on 2/9/2018
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isArray} from 'lodash';
import {Container, Divider} from 'semantic-ui-react';

import types from '../../types';
import LabTechScriptView from '../../components/LabTechScriptView/LabTechScriptView';

class EditorScript extends Component {
  render() {
    const {LabTechScript} = this.props;
    let scripts = [];
    const primaryScript = LabTechScript.PackedScript;

    if (isArray(LabTechScript.PackedScript.PackedScript)) {
      scripts = scripts.concat(LabTechScript.PackedScript.PackedScript);
    } else if (LabTechScript.PackedScript.PackedScript) {
      scripts.push(LabTechScript.PackedScript.PackedScript);
    }

    return (
      <Container>
        Primary Script
        <LabTechScriptView PackedScript={primaryScript}/>
        <Divider/>
        {scripts.map((script, idx) => {
          return (
            <div key={idx}>
              Bundled Script #{idx + 1}
              <LabTechScriptView PackedScript={script}/>
            </div>
          );
        })}
      </Container>
    );
  }
}

EditorScript.propTypes = {
  LabTechScript: types.LabTechScript,
};

EditorScript.defaultProps = {
  LabTechScript: undefined,
};

export default connect(
  (state) => ({LabTechScript: state.script.LabTechScript}),
)(EditorScript);
