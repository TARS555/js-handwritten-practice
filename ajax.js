const xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  if (this.status === 200) {
    console.log(this.response);
  } else {
    throw new Error(xhr.statusText);
  }
};
xhr.send();