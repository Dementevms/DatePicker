const getPosts = () => {
  return new Promise((res, rej) => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => res(json));
  });
};

export { getPosts };
