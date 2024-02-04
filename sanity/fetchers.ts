import { createClient } from 'next-sanity'

import { COMMON_PARAMS } from '@/lib/constants'

import { baseConfig } from './lib/client'
import {
  ABOUT_SLUGS_QUERY,
  PORTFOLIOS_WITH_PROJECTS_COUNT_QUERY,
  PORTFOLIO_SLUGS_QUERY,
  PROJECT_SLUGS_QUERY,
} from './queries'

const cleanClient = createClient({ ...baseConfig, useCdn: true })

export const getPortfoliosWithSlugs = () =>
  cleanClient.fetch(PORTFOLIO_SLUGS_QUERY)
export const getProjectsWithSlugs = () =>
  cleanClient.fetch(PROJECT_SLUGS_QUERY, COMMON_PARAMS)
export const fetchPortfoliosWithProjectsCount = () =>
  cleanClient.fetch(PORTFOLIOS_WITH_PROJECTS_COUNT_QUERY, COMMON_PARAMS)
export const getAboutsWithSlugs = () =>
  cleanClient.fetch(ABOUT_SLUGS_QUERY, COMMON_PARAMS)
