import React from 'react';

const components = {};

/**
 * ComponentMapping singleton. It manages the mapping between AEM component resource types and corresponding
 * JavaScript component class.
 */
class CustomComponentMapping {
  /**
   *
   * @param {Object} options - Builder options which needs to be applied
   */
  constructor(options) {
    this.options = options;
  }

  /**
   * Returns object (or undefined) matching with given resource type.
   *
   * @param {string} resourceType     - resource type
   * @returns {object|undefined}      - class associated with given resource type
   */
  get(resourceType) {
    const componentBuilder = components[resourceType];

    if (!componentBuilder) {
      return componentBuilder;
    }
    componentBuilder.extend(this.options);

    return componentBuilder.build();
  }
}

const withCustomComponentCtx = (Component, options) => props => (
  <Component {...props} componentMapping={new CustomComponentMapping(options)} />
);

export { CustomComponentMapping, components, withCustomComponentCtx };
