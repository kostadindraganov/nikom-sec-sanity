import React from 'react'

import { CTA } from '@/app/components/Cta'
import { InfoSection } from '@/app/components/InfoSection'
import { dataAttr } from '@/sanity/lib/utils'
import { PageBuilderSection } from '@/sanity/lib/types'

// NIKOM shared
import NikomCta from '@/app/components/nikom/NikomCta'

// NIKOM home
import HomeHero from '@/app/components/nikom/HomeHero'
import HomeTicker from '@/app/components/nikom/HomeTicker'
import HomeSolutions from '@/app/components/nikom/HomeSolutions'
import HomeProcess from '@/app/components/nikom/HomeProcess'
import HomeWhy from '@/app/components/nikom/HomeWhy'
import HomeIndustries from '@/app/components/nikom/HomeIndustries'
import HomeProjectsFeatured from '@/app/components/nikom/HomeProjectsFeatured'
import HomeIntegration from '@/app/components/nikom/HomeIntegration'
import HomePartners from '@/app/components/nikom/HomePartners'
import HomeContact from '@/app/components/nikom/HomeContact'

// NIKOM about
import AboutHero from '@/app/components/nikom/AboutHero'
import AboutManifest from '@/app/components/nikom/AboutManifest'
import AboutEngagement from '@/app/components/nikom/AboutEngagement'
import AboutSectors from '@/app/components/nikom/AboutSectors'
import AboutManufacturers from '@/app/components/nikom/AboutManufacturers'
import AboutCerts from '@/app/components/nikom/AboutCerts'

// NIKOM services
import ServicesHero from '@/app/components/nikom/ServicesHero'
import ServicesCatalog from '@/app/components/nikom/ServicesCatalog'
import ServicesArchitecture from '@/app/components/nikom/ServicesArchitecture'
import ServicesProject from '@/app/components/nikom/ServicesProject'
import ServicesProcess from '@/app/components/nikom/ServicesProcess'
import ServicesFaq from '@/app/components/nikom/ServicesFaq'

// NIKOM projects
import ProjectsHero from '@/app/components/nikom/ProjectsHero'
import ProjectsFeature from '@/app/components/nikom/ProjectsFeature'
import ProjectsMasonry from '@/app/components/nikom/ProjectsMasonry'
import ProjectsSectorStats from '@/app/components/nikom/ProjectsSectorStats'

// NIKOM blog
import BlogHero from '@/app/components/nikom/BlogHero'
import BlogFeatured from '@/app/components/nikom/BlogFeatured'
import BlogList from '@/app/components/nikom/BlogList'

// NIKOM contact
import ContactHero from '@/app/components/nikom/ContactHero'
import ContactInfo from '@/app/components/nikom/ContactInfo'
import ContactMaps from '@/app/components/nikom/ContactMaps'
import ContactForm from '@/app/components/nikom/ContactForm'

type BlockProps = {
  index: number
  block: PageBuilderSection
  pageId: string
  pageType: string
}

type BlocksType = {
  [key: string]: React.FC<BlockProps>
}

const Blocks = {
  callToAction: CTA,
  infoSection: InfoSection,
  // NIKOM shared
  nikomCta: NikomCta,
  // NIKOM home
  homeHero: HomeHero,
  homeTicker: HomeTicker,
  homeSolutions: HomeSolutions,
  homeProcess: HomeProcess,
  homeWhy: HomeWhy,
  homeIndustries: HomeIndustries,
  homeProjectsFeatured: HomeProjectsFeatured,
  homeIntegration: HomeIntegration,
  homePartners: HomePartners,
  homeContact: HomeContact,
  // NIKOM about
  aboutHero: AboutHero,
  aboutManifest: AboutManifest,
  aboutEngagement: AboutEngagement,
  aboutSectors: AboutSectors,
  aboutManufacturers: AboutManufacturers,
  aboutCerts: AboutCerts,
  // NIKOM services
  servicesHero: ServicesHero,
  servicesCatalog: ServicesCatalog,
  servicesArchitecture: ServicesArchitecture,
  servicesProject: ServicesProject,
  servicesProcess: ServicesProcess,
  servicesFaq: ServicesFaq,
  // NIKOM projects
  projectsHero: ProjectsHero,
  projectsFeature: ProjectsFeature,
  projectsMasonry: ProjectsMasonry,
  projectsSectorStats: ProjectsSectorStats,
  // NIKOM blog
  blogHero: BlogHero,
  blogFeatured: BlogFeatured,
  blogList: BlogList,
  // NIKOM contact
  contactHero: ContactHero,
  contactInfo: ContactInfo,
  contactMaps: ContactMaps,
  contactForm: ContactForm,
} as BlocksType

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export const BlockRenderer = ({ block, index, pageId, pageType }: BlockProps) => {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block: block,
          index: index,
          pageId: pageId,
          pageType: pageType,
        })}
      </div>
    )
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-600 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key }
  )
}
