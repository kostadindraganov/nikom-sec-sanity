import { person } from './documents/person'
import { page } from './documents/page'
import { post } from './documents/post'
import { project } from './documents/project'
import { projectCategory } from './documents/projectCategory'
import { callToAction } from './objects/callToAction'
import { infoSection } from './objects/infoSection'
import { settings } from './singletons/settings'
import { link } from './objects/link'
import { blockContent } from './objects/blockContent'
import button from './objects/button'
import { blockContentTextOnly } from './objects/blockContentTextOnly'

// NIKOM home section objects (mix of named and default exports)
import homeHero from './objects/nikom/homeHero'
import homeTicker from './objects/nikom/homeTicker'
import { homeSolutions } from './objects/nikom/homeSolutions'
import { homeProcess } from './objects/nikom/homeProcess'
import homeWhy from './objects/nikom/homeWhy'
import homeIndustries from './objects/nikom/homeIndustries'
import { homeProjectsFeatured } from './objects/nikom/homeProjectsFeatured'
import { homeIntegration } from './objects/nikom/homeIntegration'
import { homePartners } from './objects/nikom/homePartners'
import { homeContact } from './objects/nikom/homeContact'

// NIKOM about section objects
import aboutHero from './objects/nikom/aboutHero'
import aboutManifest from './objects/nikom/aboutManifest'
import aboutEngagement from './objects/nikom/aboutEngagement'
import aboutSectors from './objects/nikom/aboutSectors'
import aboutManufacturers from './objects/nikom/aboutManufacturers'
import aboutCerts from './objects/nikom/aboutCerts'

// NIKOM services section objects
import servicesHero from './objects/nikom/servicesHero'

import servicesCatalog from './objects/nikom/servicesCatalog'
import servicesArchitecture from './objects/nikom/servicesArchitecture'
import servicesProject from './objects/nikom/servicesProject'
import servicesProcess from './objects/nikom/servicesProcess'
import servicesFaq from './objects/nikom/servicesFaq'

// NIKOM projects section objects
import { projectsHero } from './objects/nikom/projectsHero'
import { projectsFeature } from './objects/nikom/projectsFeature'
import { projectsMasonry } from './objects/nikom/projectsMasonry'
import { projectsSectorStats } from './objects/nikom/projectsSectorStats'

// NIKOM blog section objects
import { blogHero } from './objects/nikom/blogHero'
import { blogFeatured } from './objects/nikom/blogFeatured'
import { blogList } from './objects/nikom/blogList'

// NIKOM contact section objects
import contactHero from './objects/nikom/contactHero'
import contactInfo from './objects/nikom/contactInfo'
import contactMaps from './objects/nikom/contactMaps'
import contactForm from './objects/nikom/contactForm'

// NIKOM shared CTA
import nikomCta from './objects/nikom/nikomCta'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/studio/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  project,
  projectCategory,
  // Objects
  button,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  link,
  // NIKOM home
  homeHero,
  homeTicker,
  homeSolutions,
  homeProcess,
  homeWhy,
  homeIndustries,
  homeProjectsFeatured,
  homeIntegration,
  homePartners,
  homeContact,
  // NIKOM about
  aboutHero,
  aboutManifest,
  aboutEngagement,
  aboutSectors,
  aboutManufacturers,
  aboutCerts,
  // NIKOM services
  servicesHero,
  servicesCatalog,
  servicesArchitecture,
  servicesProject,
  servicesProcess,
  servicesFaq,
  // NIKOM projects
  projectsHero,
  projectsFeature,
  projectsMasonry,
  projectsSectorStats,
  // NIKOM blog
  blogHero,
  blogFeatured,
  blogList,
  // NIKOM contact
  contactHero,
  contactInfo,
  contactMaps,
  contactForm,
  // NIKOM shared
  nikomCta,
]
