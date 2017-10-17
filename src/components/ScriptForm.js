import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {propTypes, reduxForm, Field} from 'redux-form';
import {TextArea} from 'react-semantic-redux-form';
import {Form, Button} from 'semantic-ui-react';

import './ScriptForm.css';

const required = value => (value ? undefined : 'Required');

class ScriptForm extends Component {
  render() {
    const {handleSubmit, pristine, submitting} = this.props;
    return (
      <Form onSubmit={handleSubmit} className="ScriptForm">
        <Field
          name="scriptXML"
          placeholder="Paste script XML"
          component={TextArea}
          validate={required}
          style={{width: '100%'}}
        />
        <Form.Button type="submit" control={Button} primary active={pristine || submitting}>
          Submit
        </Form.Button>
      </Form>
    );
  }
}

ScriptForm.propTypes = {
  ...propTypes,
};

export default reduxForm({
  form: 'ScriptForm',
})(ScriptForm);
