import React, { Component } from 'react';
import { withEditable as withEditableAEM } from '@adobe/cq-react-editable-components';
import { NoWrapEditable } from './NoWrapEditable';

/**
 * Configuration object of the withEditable function
 *
 * @typedef {Object} EditConfig
 * @property {boolean} [emptyLabel] - Label to be displayed on the overlay when the component is empty
 * @property {function} [isEmpty] - Callback function to determine if the component is empty
 */

/**
 * Options object of the withEditable function
 *
 * @typedef {Object} EditableOptions
 * @property {boolean} [noWrapper] - Determine if a wrapper needs to be added for the component to suport Editability
 */

/**
 * Returns a composition that provides edition capabilities to the component
 *
 * @param {React.Component} WrappedComponent
 * @param {EditConfig} [editConfig]
 * @param {EditableOptions} [options]
 */
const withEditable = (WrappedComponent, editConfig, options) => {
  if (!(options && options.noWrapper)) {
    return withEditableAEM(WrappedComponent, editConfig);
  }

  /**
   * Wrapping Editable Component
   */
  // eslint-disable-next-line react/prefer-stateless-function
  return class NoWrapEditableComponent extends Component {
    render() {
      return <NoWrapEditable {...this.props} editConfig={editConfig} wrappedComponent={WrappedComponent} />;
    }
  };
};

export { withEditable };
