import React from 'react'
import ListOfChildrenProjects from './ListOfChildrenProjects'
import { getProjectTitleByLanguage } from '@/lib/helpers'

const PortfolioNavigator = ({
  portfolio,
  title,
  language,
  otherProjects,
  slugPage,
}) => {
  return (
    <div>
      <h2 className="text-xl pb-4"> {title} </h2>
      <p>
        Other in <span className="italic">{portfolio.title[language]}</span>:
      </p>
      {otherProjects.map((project, index) => (
        <React.Fragment key={index}>
          <ListOfChildrenProjects
            project={project}
            language={language}
            slugPage={slugPage}
            getProjectTitle={getProjectTitleByLanguage}
          />
          {index < otherProjects.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
      <p></p>
    </div>
  )
}

export default PortfolioNavigator
