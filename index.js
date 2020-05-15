let user = 'mykhailohoy';
let repo = 'test-api';
let contentDir = 'posts';
let imageDir = 'images';

let contentDiv = document.querySelector(".content");

function htmlToElement(html) {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
}


(async () => {
  let data = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${contentDir}`);
  data = await data.json();
  let imagesRaw = await fetch(`https://api.github.com/repos/${user}/${repo}/contents/${imageDir}`);
  imagesRaw = await imagesRaw.json();
  // console.log(imagesRaw);

  let images = {};

  for (let i in imagesRaw) {
    images[imagesRaw[i].name] = imagesRaw[i].download_url;
  }

  // console.log(data);

  for (let i in data) {
    let post = await YAML.load(data[i].download_url);
    // console.log(post);

    let imageUrl = "";
    let element = `<div><h3>${post.title}</h3><p>${post.description}</p><img src="${images[post.image]}"></div>`;
    element = htmlToElement(element);
    contentDiv.appendChild(element);
  }
})();