webpackJsonp([0x86e8cd016356d800],{"./src/data/projects.js":function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=[{title:"micro-spotify",description:"A microservice to simplify authorizing with Spotify's API via the Oauth2 Authorization code flow.",url:"https://github.com/ntaylor89/micro-spotify"},{title:"spotable",description:"A react-app that helps users build better Spotify playlists using track data from the API",url:"https://github.com/ntaylor89/spotable"}];t.default=s,e.exports=t.default},"./src/layouts/slat.js":function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e){if(!e.title)return null;var t=e.static?n.default.createElement("a",{href:e.url},e.title):n.default.createElement(u.default,{to:e.url},e.title);return n.default.createElement("article",{className:"pv3"},n.default.createElement("div",{className:"flex flex-column flex-row-ns"},n.default.createElement("div",{className:"w-100 pr3-ns order-2 order-1-ns"},n.default.createElement("h1",{className:"f3 mv0 lh-title"},t),e.subTitle&&n.default.createElement("span",{className:"f6 mid-gray"},e.subTitle),n.default.createElement("p",{className:"f5 f4-l lh-copy"},e.summary))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var r=s("./node_modules/react/react.js"),n=a(r),i=s("./node_modules/gatsby-link/index.js"),u=a(i);e.exports=t.default},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/nate/Workspace/nate-site/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/nate/Workspace/nate-site/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/nate/Workspace/nate-site/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":["/Users/nate/Workspace/nate-site/node_modules/babel-preset-env/lib/index.js","/Users/nate/Workspace/nate-site/node_modules/babel-preset-stage-0/lib/index.js","/Users/nate/Workspace/nate-site/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/pages/projects.js':function(e,t,s){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e){return n.default.createElement("section",null,u.default.map(function(e){return n.default.createElement(d.default,{title:e.title,summary:e.description,url:e.url,static:!0,subTitle:e.url})}))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var r=s("./node_modules/react/react.js"),n=a(r),i=s("./src/data/projects.js"),u=a(i),o=s("./src/layouts/slat.js"),d=a(o);e.exports=t.default}});
//# sourceMappingURL=page-component---src-pages-projects-js-2c9ac5bc511ab143d1e7.js.map