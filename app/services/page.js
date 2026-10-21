import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wrench, Sparkles, Shield, Truck, Compass, CheckCircle2 } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import ServiceCard from '@/components/ui/ServiceCard';
import ProcessTimeline from '@/components/ui/ProcessTimeline';
import SectionHeading from '@/components/ui/SectionHeading';
import CTABanner from '@/components/ui/CTABanner';
import { SERVICES, PROCESS_STEPS } from '@/lib/constants';
import { generateMetadata as genMeta } from '@/lib/seo';
import DarkCanvas from '@/components/layout/DarkCanvas';

export const metadata = genMeta('services');

export default function ServicesPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jangidtuffglassespvtltd.com';

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${siteUrl}/services`,
      },
    ],
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {/* Page Hero */}
      <PageHero
        eyebrow="EXPERTISE & COORDINATION"
        title="Consultation, Sizing"
        titleAccent="& Execution"
        description="From preliminary blueprint analysis and glass thickness selection to custom CNC fabrication and site delivery coordination across Jodhpur and Rajasthan."
        primaryAction={{ label: 'Request Consultation', href: '/contact#quote' }}
        secondaryAction={{ label: 'Explore Products', href: '/products' }}
        backgroundImage="/images/optimized/processing-cnc-edge-polishing.webp"
        showCategories={true}
        showWatchWork={true}
      />

      <DarkCanvas images={['/images/optimized/processing-tempering-furnace-line.webp', '/images/optimized/railing-floating-staircase-glass.webp', '/images/optimized/commercial-atrium-canopy-entrance.webp', '/images/optimized/architectural-villa-coastal-estate.webp']}>

      {/* Services Grid */}
      <section className="py-20 bg-[#f6f8fa]" aria-label="Services List">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            eyebrow="What we provide"
            title="Specialized Glass Services"
            description="Every glass installation requires tailored attention. Explore our structured service offerings designed to prevent costly site errors."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.id || index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* 4-Stage Project Workflow */}
      <section className="py-20 sm:py-28 bg-white" aria-label="Project Workflow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            dark
            centered
            eyebrow="Our working workflow"
            title="How We Execute Your Project"
            description="A transparent, 4-stage process ensuring accuracy from first contact to glass delivery."
          />

          <ProcessTimeline steps={PROCESS_STEPS} />
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner glass />
      </DarkCanvas>
    </div>
  );
}
