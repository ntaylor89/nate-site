import React from 'react'
import Link from 'gatsby-link'

export default function Slat (props) {
  if (!props.title) return null

  const link = props.static ?
    <a href={props.url}>{props.title}</a>
    : <Link to={props.url}>{props.title}</Link>

  return (
    <article className='pv3'>
      <div className='flex flex-column flex-row-ns'>
        <div className='w-100 pr3-ns order-2 order-1-ns'>
          <h1 className='f3 mv0 lh-title garamond'>
            {link}
          </h1>
          {props.subTitle && (
            <span className='garamond f6 mid-gray'>{props.subTitle}</span>
          )}
          <p className='f5 f4-l lh-copy'>
            {props.summary}
          </p>
        </div>
      </div>
    </article>
  )
}

