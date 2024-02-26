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
    <div className="text-base">
      <h2 className="text-xl pb-6"> {title} </h2>
      <p>
        Other in <span className="italic">{portfolio.title[language]}</span>:
      </p>
      <p>
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
      </p>
    </div>
  )
}

export default PortfolioNavigator
