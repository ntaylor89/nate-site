import React from 'react'
import projects from '../data/projects'
import Slat from '../layouts/slat'

export default function ProjectIndex (props) {
  return (
    <section>
      {projects.map(project => (
        <Slat
          title={project.title}
          summary={project.description}
          url={project.url}
          static={true}
          subTitle={project.url}
        />
      ))}
    </section>
  )
}

