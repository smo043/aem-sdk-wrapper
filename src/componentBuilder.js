import { withModel, withEditorContext } from '@adobe/cq-react-editable-components';
import { withEditable } from './components/withEditable';
import { withCustomComponentCtx } from './components/ComponentWrapping';

const EMPTY_OBJECT = Object.freeze({});

export class ComponentBuilder {
  constructor(component) {
    this.component = component;
    this.editorConfig = EMPTY_OBJECT;
    this.withModelConfig = EMPTY_OBJECT;
    this.editOpts = {};
  }

  modelConfig(config) {
    this.withModelConfig = config;
    return this;
  }

  editConfig(config) {
    this.editorConfig = config;
    return this;
  }

  layoutWrapper(value) {
    this.editOpts.noWrapper = value;
    return this;
  }

  withComponentContext(value) {
    this.componentContext = value;
    return this;
  }

  copy() {
    return Object.assign(new ComponentBuilder(this.component), JSON.parse(JSON.stringify(this)));
  }

  extend(config) {
    Object.keys(config).forEach((name) => this[name] && this[name](config[name]));
    return this;
  }

  build() {
    let { component } = this;

    if (this.componentContext) {
      component = withCustomComponentCtx(component, { layoutWrapper: true });
    }

    return withEditorContext(withModel(withEditable(component, this.editConfig, this.editOpts), this.withModelConfig));
  }
}
