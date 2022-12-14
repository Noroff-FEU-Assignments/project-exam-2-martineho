# aesocial

 aesocial is a social media platform built with React, Bootstrap, Sass, Axios and Javascript. The concept of the platform is to share quotes, thoughts and inspirational images and follow people with the same mindset as yours. 

🔗 Visit live on: https://aesocial.netlify.app/

## ⚛️ Technologies used

- React 
- Bootstrap@5.2.2
- Yup
- Sass
- Axios
- [Ionicons](https://ionic.io/ionicons)
- [Google Fonts](https://fonts.google.com)

#### Components
- react-time-ago
- react-infinite-scroll
- react-helmet-async

## 👩🏻‍💻 Installation and setup 

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

Run test suite:  

`npm test`  

Start server:

`npm start`  

The app will usually start on port 3000, to view in browser `localhost:3000`.

## 💭 Reflection

The project was created over 7 weeks and is my final Project Exam at Noroff. The goal of the project was to use the knowledge of technologies learned during the past two years and create a social media app. The concept is you can either share a thought/quote or an image that inspires you. I wanted to make a mindful social media where the content is curated and not overwhelming. 

The app is built with `create-react-app` and `react-router-dom 6.4`. Bootstrap and Sass is used for styling, following BEM syntax. I have done my best in following DRY principle and making sensible folder and component names. With the bootstrap framework and some extra media queries the app is fully responsive and is suitable for mobiles, ipads and desktop. 

`Yup` is used for form validation. I am importing fonts from Google Fonts and icons from Ionicons. Timestamps are handled using `react-time-ago` component and pagination is handled using `react-infinite-scroll` component. SEO are handled with `react-helmet-async` component. 

React useState and useEffect with `Axios` are used for handling requests and doing access control. For example the settings button for updating profile information is only available on your own profile, as well as the edit and delete of posts. New users will be greeted with a welcome message and the option to add an avatar and banner on the first login. Hiding a lot of the functionality in modals instead of having loads of pages is cutting the amount of pages the user have to go to and is easily accessible. 

I had challenges during the project. One of them was finding a good folder structure as the project grew, and also finding suitable component names. I think I had a good start but then eventually it became more and more fluffy as projects often do. I have split as logically as possible into reusable components. But this is definitley something I would like to clean up and restructure in a second version.

It also struggled to figure out how to update content automatically with the api. I chose to use `window.location.reload()` as a quick solution. I know there is better ways using render and or push to state in React. But this was all new territory for me, so I chose to focus on implementing all necessary functionality and getting the overall experience good. 

I have also frequently been having errors with the api, especially with too many re-renders.

## 📝 Credits

- Noroff discord forum
- Connor O´Brien for help with the infinite scroll
- [Guide on wizard](https://codesandbox.io/s/withered-wind-ugnd0?fontsize=14&hidenavigation=1&theme=dark&file=/src/Wizard.js)
- [Guide on infinite scroll](https://upmostly.com/tutorials/build-an-infinite-scroll-component-in-react-using-react-hooks)
- [Guide on search filter](https://levelup.gitconnected.com/how-to-search-filter-through-data-in-react-26f1545fe3a1)
- [Guide on SEO with react helmet](https://www.freecodecamp.org/news/react-helmet-examples/)
- [Guide on writing readme.md](https://victorbruce82.medium.com/writing-an-awesome-readme-for-your-side-projects-fabd20f96db0)

## 📶 Status 

v 1.0

For the second version I would like to do a clean up components and folder structure. Be able to remove followers. Handle the state of people you follow on all components ie. on the people page and profile pages it should say unfollow on the people you already follow. Fix navbar active state. Add infinite scroll handling on the people page and profile page too. 



