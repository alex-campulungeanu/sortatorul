<h1 align="center">
<br>
Sortatorul
</h1>

<p align="center">sort the comments</p>

<hr />
<br />

## 📚 Project Definition

Simple app to sort comments from a specific blog.


## 🛠️ Features

The app uses these technologies:

- ⚛️ **Vue.js** — A JavaScript library for building user interfaces
- ♻️ **Netlify** — A serverless platform
- ♻️ **Netlify Functions / lambda**
- 🎯 **Tailwindcss**
- 🌶️ **Cheerio.js**


## 🚀 Getting started

**Getting started with the lambda server**

1. Go to `project folder`
2. Run `npm run start:lambda`
3. The backend cand be accessed at http://localhost:9000/.netlify/functions/posts

**Getting started with the frontend app**

1. Go to `project folder` 
2. Run `npm run start:vue`
3. Access the project at http://localhost:3090/

**Docker development**
Also, a docker container can be used:
`docker-compose up -d` 

### Useful links
https://github.com/bradtraversy/vue-crash-2021

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) page for details.

## TODO
[ ] mark somehoue what is the current order selected for comments
[ ] manual url box should be disabled when loading for posts
[ ] treat axios 500 with interceptors https://dev.to/mperon/axios-error-handling-like-a-boss-333d
[x] the response from lambda is a JSON but is treated as text, why ?
[ ] add a notification systems / alert
[ ] add a popup with all replys to a comment(if it's a reply show the parent)
[ ] add a loading on page load and on post select from the list
[ ] add Vuetify (material ui)
https://zoso.ro/franezi-coruptia-bugetarilor/