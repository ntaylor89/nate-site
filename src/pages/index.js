import React from "react"
import Link from "gatsby-link"
import Helmet from "react-helmet"

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>Hi everyone!</h1>
        <p>Welcome to my new site.</p>
        <p>
          It's still under construction.
          Try again later.
        </p>
        <Link to="/hello-world/">Next</Link>
      </div>
    )
  }
}
