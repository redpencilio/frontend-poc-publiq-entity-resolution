import Component from '@glimmer/component';

export default class AddressComparisonTableComponent extends Component {
  equalPropClass = (propName) =>
    this.isEqualProp(propName) ? 'text-muted' : 'bg-danger-light';

  isEqualProp(propName) {
    const equalProp =
      this.args.left.address.get(propName) ===
      this.args.right.address.get(propName);
    const equalContent =
      this.args.left.address.get(propName)?.content ===
      this.args.right.address.get(propName)?.content;
    const notNull =
      this.args.left.address.get(propName) != null &&
      this.args.right.address.get(propName) != null;
    return equalProp || (equalContent && notNull);
  }
}
