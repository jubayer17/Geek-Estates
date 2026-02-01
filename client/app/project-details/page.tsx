"use client"

import ProjectHero from "@/components/project-details/ProjectHero"
import ProjectOverview from "@/components/project-details/ProjectOverview"
import ProjectFeatures from "@/components/project-details/ProjectFeatures"
import ProjectGallery from "@/components/project-details/ProjectGallery"
import FeaturedProjects from "@/components/project-details/FeaturedProjects"
import LetsConnect from "@/components/home/LetsConnect"
import { projectData } from "@/data/projectData"

export default function ProjectDetailsPage() {
  return (
    <main className="bg-white">
      <ProjectHero
        title={projectData.title}
        location={projectData.location}
        category={projectData.category}
        image={projectData.image}
      />

      <ProjectOverview
        description={projectData.description}
        address={projectData.address}
        stats={projectData.stats}
        details={projectData.details}
        image={projectData.image}
      />

      <ProjectFeatures
        features={projectData.features}
        image={projectData.featureImage}
      />

      <ProjectGallery
        images={projectData.galleryImages}
      />

      <FeaturedProjects
        projects={projectData.relatedProjects}
      />

      <LetsConnect />
    </main>
  )
}
