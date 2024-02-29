
export function getPictures(picture) {
    const url = `https://pixabay.com/api/?key=42459429-d6d7a0fe637ea3675bc35ddeb&q=${picture}`;
     return fetch(url)
        .then(response => {
         if (!response.ok) {
             throw new Error(response.status);
              }
    return response.json();
        })
    .catch( (error) => console.log(error))
}

