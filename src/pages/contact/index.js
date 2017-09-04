import React from 'react'
import photo from './me.jpeg'
import resume from '../../data/resume.pdf'

function ContactLink (props) {
  return (
    <a href={props.url} className='fw6 dib pa2 black link hover-blue'>
      {props.type}
    </a>
  )
}

export default function Contact () {
  return (
    <div className='tc'>
      <img src={photo} className='br-100 ba dib' title='Photo of Nate Taylor' alt='Photo of Nate Taylor' />
      <div className='dib center'>
        <p>Click <a href={resume} className='link b black hover-blue'>here</a> to see my resume. </p>
        <p>If you'd like to chat, hit me up at one the following places:</p>

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
        <ContactLink
          type='Twitter'
          url='https://twitter.com/Nately89/'
          urlText='twitter.com/Nately89'
        />
      </div>
    </div>
  )
}
