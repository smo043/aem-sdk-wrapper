/* eslint-disable global-require */
import { ComponentMapping } from '@adobe/cq-spa-component-mapping';
import { components } from './components/ComponentWrapping';
import { ComponentBuilder } from './componentBuilder';

const sdkWrapperRegister = (resourceType, component, options = {}) => {
  const builder = new ComponentBuilder(component).editConfig(options.editConfig);
  builder.modelConfig(options.editConfig);
  if (options.managedLayout) {
    builder.withComponentContext(true);
  }

  const wrappedComponent = builder.build();

  [].concat(resourceType).forEach((entry) => {
    components[entry] = builder.copy(); // to be used to build dynamic components
    ComponentMapping.mapping[entry] = wrappedComponent; // this will be used by ComponentMapping in sdk
  });

  return wrappedComponent;
};

export { sdkWrapperRegister };
