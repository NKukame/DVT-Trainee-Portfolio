export function toDropdownOptions(list) {
    return list.map((item) => ({
      value: item
        .toLowerCase(),
      label: item,
    }));
  }

export function capitalizeFirstLetter(str) {
  if(str.includes("_")){
    return str
      .split("_")
      .map(
        word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  }else{
    
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

}

export  async function toBase64(url) {
  return fetch(url)
    .then((res) => res.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

