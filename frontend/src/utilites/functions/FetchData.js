const FetchData = async (url, obj, method) => {
  const res = await fetch(url, {
    body: JSON.stringify(obj),
    headers: { "content-type": "application/json" },
    method: method,
  });

  const data = await res.json();

  return data;
};

export default FetchData;
