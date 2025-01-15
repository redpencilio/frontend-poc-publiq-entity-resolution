import Component from '@glimmer/component';
import { get } from '@ember/object';

export default class AddressComparisonTableComponent extends Component {
  equalPropClass = (propName) =>
    this.isEqualProp(propName) ? 'text-muted' : 'bg-danger-light';

  isEqualProp(propName) {
    const equalProp =
      get(this.args.left, propName) != null &&
      get(this.args.left, propName) === get(this.args.right, propName);
    const equalContent =
      get(this.args.left, propName)?.content != null &&
      get(this.args.left, propName)?.content ===
        get(this.args.right, propName)?.content;
    return equalProp || equalContent;
  }
}
