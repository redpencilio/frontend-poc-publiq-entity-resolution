import Component from '@glimmer/component';

export default class AddressComparisonTableComponent extends Component {
  equalPropClass = (propName) =>
    this.isEqualProp(propName) ? 'text-muted' : 'bg-gray-200';

  isEqualProp(propName) {
    const equalProp =
      this.args.addressA.get(propName) === this.args.addressB.get(propName);
    const equalContent =
      this.args.addressA.get(propName)?.content ===
      this.args.addressB.get(propName)?.content;
    const notNull =
      this.args.addressA.get(propName) != null &&
      this.args.addressB.get(propName) != null;
    return equalProp || (equalContent && notNull);
  }

  get addressData() {
    return [
      { label: this.args.labelA, address: this.args.addressA },
      { label: this.args.labelB, address: this.args.addressB },
    ];
  }
}
