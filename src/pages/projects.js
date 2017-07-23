import React from 'react'
import projects from '../data/projects'

function ProjectSlat (props) {
  return (
    <article className='pv3'>
      <div className='flex flex-column flex-row-ns'>
        <div className='w-100 w-60-ns pr3-ns order-2 order-1-ns'>
          <h1 className='f3 mt0 lh-title garamond'>
            <a href={props.url}>{props.title}</a>
          </h1>
          <p className='f5 f4-l lh-copy'>
            {props.description}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function ProjectIndex (props) {
  return (
    <section>
      {projects.map(project => (
        <ProjectSlat
          title={project.title}
          description={project.description}
          url={project.url}
        />
      ))}
    </section>
  )
}


