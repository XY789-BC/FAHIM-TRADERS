import React, { useState } from 'react';
import { PROJECT_SHOWCASE } from '../data/companyData';
import { ProjectShowcase } from '../types';
import { Layers, ShieldCheck, Clock, Hammer, X, Maximize2 } from 'lucide-react';

interface ProjectGalleryProps {
  onSelectProjectForEstimate: (category: string) => void;
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onSelectProjectForEstimate }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectShowcase | null>(null);

  return (
    <section id="projects" className="py-20 bg-slate-900/40 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold">
            Proof of Workmanship & Recent Installations
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2 font-display">
            Completed Gates, Solar Mounts & Structural Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
            Excellence in every weld joint. Review our portfolio of custom residential gates, elevated rooftop solar frameworks, 
            and commercial structural steel fabrication across Pakistan.
          </p>
        </div>

        {/* Gallery Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECT_SHOWCASE.map((project: ProjectShowcase) => (
            <div
              key={project.id}
              className="group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Zero-Broken Fallback */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Subtle Contrast Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                  {/* Clean unboxed category overlay */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-amber-400 border border-slate-800">
                    {project.category}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-slate-950/80 text-white hover:bg-amber-400 hover:text-slate-950 transition-colors cursor-pointer"
                    aria-label="View project details"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white font-display mb-2 group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technical Specifications */}
                  <div className="grid grid-cols-2 gap-3 p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Scope & Sizing</span>
                      <span className="font-medium text-white">{project.dimensionsOrScope}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase">Gauge Spec</span>
                      <span className="font-mono text-amber-400 font-semibold">{project.gaugeSpec}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-slate-800/60">
                      <span className="text-slate-500 block text-[10px] uppercase">Material Profile</span>
                      <span className="text-slate-300 truncate block">{project.materialsUsed}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/60">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>Fabricated in {project.completionTime}</span>
                </div>

                <button
                  onClick={() => onSelectProjectForEstimate(project.category)}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 cursor-pointer underline underline-offset-2"
                >
                  Estimate Similar Design
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-2xl w-full p-6 text-white relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {selectedProject.category} Specification
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-lg overflow-hidden mb-5 border border-slate-800 aspect-[16/10]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <h3 className="text-xl font-bold font-display mb-2">{selectedProject.title}</h3>
            <p className="text-sm text-slate-300 leading-relaxed mb-5">{selectedProject.description}</p>

            <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs sm:text-sm">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Materials Applied:</span>
                <span className="text-white text-right max-w-sm">{selectedProject.materialsUsed}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Installation Dimensions:</span>
                <span className="text-white font-medium">{selectedProject.dimensionsOrScope}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400">Sheet / Section Gauge:</span>
                <span className="text-amber-400 font-mono font-semibold">{selectedProject.gaugeSpec}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Turnaround Time:</span>
                <span className="text-white">{selectedProject.completionTime}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  onSelectProjectForEstimate(selectedProject.category);
                  setSelectedProject(null);
                }}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Calculate Cost For This Project
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
