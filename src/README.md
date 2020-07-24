```javascript
import { sdkWrapperRegister } from '.';

const Component = () => {
    //
};

sdkWrapperRegister('path of aem component', Component, {
    managedLayout: true, // to remove the additional div added by AEM SDK
    modelConfig: /* optional */ {
        forceReload: false | true // reload the component by force when the model changes
    },
    editConfig: /* optional */ {
        emptyLabel: 'string' // the label to be shown when the component's props are not populated
        isEmpty: function(props) {} // if returned true which show the emptyLabel insted of the component
    }
})
```

### NOTE:

- `managedLayout` option should be set to true when a container component is going to manage the layout instead of AEM SDK components.

Example: We can add any component inside Carousel component.

### Custom props - required

- Components which are registered with `managedLayout` should handle `managedprop` prop so that the component works properly in the editor.

Example:

```javascript
const { managedprop } = props; // It works only for Managed Layout's

<ManagedLayoutComponent {...managedprop} />;
```
