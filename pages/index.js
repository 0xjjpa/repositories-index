import React from 'react'
import Layout from '../index.js'
import fetch from 'isomorphic-unfetch'

export default class Index extends React.Component {
  state = {
    repos: []
  }
  
  async componentDidMount () {
    const res = await fetch('https://github.mybit.io/api/repositories')
    const repos = await res.json()
    this.setState({ repos })
  }

  render () {
    const { repos } = this.state
    const websites = repos.filter( repo => repo.split('.website').length > 1)
    const publicProjects = repos.filter( repo => repo.split('MyBit').length > 1)
    const privateProjects = repos.filter( repo => repo.split('MyBit').length === 1)

    
    return (
      <Layout>
        <div style={{ margin: 100 }}>
          {
            [
              { label: 'Websites', projects: websites }, 
              { label: 'External Projects', projects: publicProjects }, 
              { label: 'Other Projects', projects: privateProjects }
            ]
            .map(projectsStore => (
              <div>
                <p>{projectsStore.label}</p>
                <ol>
                  {
                    projectsStore.projects.map(
                      project => 
                        <li key={project}>
                          <a 
                            href={`https://github.com/MyBitFoundation/${project}`} 
                            target='_blank'
                          >
                            {project}
                          </a>
                        </li>
                    )
                  }
                </ol>
              </div>
            ))
          }
        </div>
      </Layout>
    )
  }
}