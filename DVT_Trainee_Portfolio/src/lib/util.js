export function toDropdownOptions(list) {
    return list.map((item) => ({
      value: item
        .toLowerCase(),
      label: item,
    }));
  }