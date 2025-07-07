export function toDropdownOptions(list) {
    return list.map((item) => ({
      value: item
        .toLowerCase(),
      label: item,
    }));
  }

export function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

