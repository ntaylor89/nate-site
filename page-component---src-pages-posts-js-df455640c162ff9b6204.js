webpackJsonp([0x99e90556dd612000],{"./src/layouts/slat.js":function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function l(e){if(!e.title)return null;var t=e.static?n.default.createElement("a",{href:e.url},e.title):n.default.createElement(u.default,{to:e.url},e.title);return n.default.createElement("article",{className:"pv3"},n.default.createElement("div",{className:"flex flex-column flex-row-ns"},n.default.createElement("div",{className:"w-100 pr3-ns order-2 order-1-ns"},n.default.createElement("h1",{className:"f3 mv0 lh-title"},t),e.subTitle&&n.default.createElement("span",{className:"f6 mid-gray"},e.subTitle),n.default.createElement("p",{className:"f5 f4-l lh-copy"},e.summary))))}Object.defineProperty(t,"__esModule",{value:!0}),t.default=l;var r=a("./node_modules/react/react.js"),n=s(r),d=a("./node_modules/gatsby-link/index.js"),u=s(d);e.exports=t.default},'./node_modules/babel-loader/lib/index.js?{"plugins":["/Users/nate/Workspace/nate-site/node_modules/gatsby/dist/utils/babel-plugin-extract-graphql.js","/Users/nate/Workspace/nate-site/node_modules/babel-plugin-add-module-exports/lib/index.js","/Users/nate/Workspace/nate-site/node_modules/babel-plugin-transform-object-assign/lib/index.js"],"presets":["/Users/nate/Workspace/nate-site/node_modules/babel-preset-env/lib/index.js","/Users/nate/Workspace/nate-site/node_modules/babel-preset-stage-0/lib/index.js","/Users/nate/Workspace/nate-site/node_modules/babel-preset-react/lib/index.js"],"cacheDirectory":true}!./src/pages/posts.js':function(e,t,a){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function l(e){var t=e.data.allMarkdownRemark.edges;return n.default.createElement("section",null,t.map(function(e){return n.default.createElement(o.default,{title:e.node.frontmatter.title,summary:e.node.frontmatter.summary,subTitle:e.node.frontmatter.date,url:e.node.fields.slug})}))}Object.defineProperty(t,"__esModule",{value:!0}),t.pageQuery=void 0,t.default=l;var r=a("./node_modules/react/react.js"),n=s(r),d=a("./node_modules/gatsby-link/index.js"),u=(s(d),a("./src/layouts/slat.js")),o=s(u);t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=page-component---src-pages-posts-js-df455640c162ff9b6204.js.map