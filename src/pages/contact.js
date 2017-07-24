import React from 'react'
import photo from '../me.jpeg'

function ContactLink (props) {
  return (
    <dl className='lh-title mv2'>
      <dt className='dib b pr2 garamond'>{props.type}:</dt>
      <dd className='dib ml0'>
        <a href={props.url}>
          {props.urlText}
        </a>
      </dd>
    </dl>
  )
}

export default function Contact () {
  return (
    <div>

      <img src={photo} title='Photo of Nate Taylor' alt='Photo of Nate Taylor' />
      <p>Hit me up at one the following places:</p>

      <ContactLink
        type='Email'
        url='mailto:nathantaylor89@gmail.com'
        urlText='nathantaylor89@gmail.com'
      />
      <ContactLink
        type='Github'
        url='https://github.com/ntaylor89/'
        urlText='github.com/ntaylor89'
      />
      <ContactLink
        type='LinkedIn'
        url='https://linkedin.com/in/nate-a-taylor/'
        urlText='linkedin.com/in/nateataylor'
      />
    </div>
  )
}

