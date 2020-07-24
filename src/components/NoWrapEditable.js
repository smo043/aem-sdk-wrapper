import React, { Component } from 'react';
import { Constants } from '@adobe/cq-react-editable-components';
import isEqual from 'react-fast-compare';

/**
 * Class name used to identify the placeholder used to represent an empty component
 *
 * @private
 */
const PLACEHOLDER_CLASS_NAME = 'cq-placeholder';

/**
 * The Editable extends EditableComponent with custom render to remove the wrappers
 */
class NoWrapEditable extends Component {
  constructor(props) {
    super(props);
    this.state = this.propsToState(props);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps, this.props)) {
      // TODO - need to fix this Do not use setState in componentDidUpdateeslint(react/no-did-update-set-state)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(this.propsToState(this.props));
    }
  }

  /**
   * Properties related to the edition of the component
   */
  get editProps() {
    const eProps = {};
    // eslint-disable-next-line react/prop-types
    const { isInEditor, cqPath } = this.props;

    if (!isInEditor) {
      return eProps;
    }

    eProps[Constants.DATA_PATH_ATTR] = cqPath;

    return eProps;
  }

  /**
   * HTMLElement representing the empty placeholder
   * @return {*}
   */
  get emptyPlaceholderProps() {
    if (!this.useEmptyPlaceholder()) {
      return;
    }

    // eslint-disable-next-line react/prop-types
    const { editConfig } = this.props;
    const { emptyLabel } = editConfig || {};

    // eslint-disable-next-line consistent-return
    return {
      'data-emptytext': emptyLabel,
      className: PLACEHOLDER_CLASS_NAME,
    };
  }

  propsToState(props) {
    // Keep private properties from being passed as state
    // eslint-disable-next-line no-unused-vars
    const { wrappedComponent, editConfig, ...state } = props;

    return state;
  }

  /**
   * Should an empty placeholder be added
   *
   * @return {boolean}
   */
  useEmptyPlaceholder() {
    // eslint-disable-next-line react/prop-types
    const { isInEditor, editConfig } = this.props;
    const { isEmpty } = editConfig || {};

    return isInEditor && editConfig && typeof isEmpty === 'function' && isEmpty(this.props);
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { wrappedComponent: WrappedComponent, containerProps } = this.props;
    const managedProps = { ...this.editProps, ...containerProps }; // this will be populated only noWrapper is true
    // If Component is Empty Show the Place Holder
    if (this.useEmptyPlaceholder()) {
      return (
        <div {...managedProps}>
          <div {...this.emptyPlaceholderProps} />
        </div>
      );
    }
    return (
      <>
        <WrappedComponent {...this.state} managedprop={managedProps} />
      </>
    );
  }
}

export { NoWrapEditable };
