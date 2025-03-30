export async function fetchData(url, options = {}) {
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    if (json.messgae) {
      throw new Error(`fetch data error ${json.message} ${response.status}`);
    }
    throw new Error("Error " + response.status);
  }
  return json;
}
