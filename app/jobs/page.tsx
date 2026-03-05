'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { doctors, organizations } from '@/data/mockData';
import { useRole } from '@/components/AppShell';

export default function JobsPage() {
  const { role } = useRole();
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [loadingCandidates, setLoadingCandidates] = useState(true);
  const [activeJobs, setActiveJobs] = useState(() =>
    organizations.flatMap((org) => org.jobOpenings.map((opening) => `${opening} · ${org.hospitalName} (${org.location})`))
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoadingCandidates(false), 650);
    return () => clearTimeout(timer);
  }, []);

  const specialties = ['All', ...new Set(doctors.map((doctor) => doctor.specialty))];
  const filteredDoctors = useMemo(
    () => doctors.filter((doctor) => specialtyFilter === 'All' || doctor.specialty === specialtyFilter),
    [specialtyFilter]
  );

  const submitJob = (event: React.FormEvent) => {
    event.preventDefault();
    if (!jobTitle.trim() || !jobLocation.trim()) return;
    setActiveJobs((current) => [`${jobTitle.trim()} · New Posting (${jobLocation.trim()})`, ...current]);
    setJobTitle('');
    setJobLocation('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {role !== 'Organization' && (
        <div className="rounded-xl border border-brand-100 bg-brand-50 p-3 text-sm text-brand-700">
          You are previewing hiring workflows outside Organization mode. Switch role to Organization for recruitment-focused context.
        </div>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">Post Job Opening — Technical and Business View</h2>
        <p className="text-sm text-slate-700">
          This page demonstrates how a hospital or healthcare organization could publish structured job openings and use them as inputs to a
          talent matching pipeline. The current implementation keeps all state in memory, but the form and listing layout are aligned with an
          architecture where each posting is persisted with rich metadata and then consumed by search and recommendation services.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Data and Algorithms</h3>
            <p className="mt-1 text-xs text-slate-600">
              Each job opening can be modelled as a document containing fields such as role title, location, required skills, and seniority.
              In a production system, these structured fields feed into search indices and matching algorithms that compare openings to doctor
              profiles using techniques like cosine similarity over skill embeddings, specialty-normalized scoring, and constraint-based
              filters (for example, on-call requirements or licensing geography). Time-based decay functions and historical acceptance rates
              can be applied so that stale roles are deprioritized and highly convertible roles are surfaced more frequently.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Business and Operational Benefits</h3>
            <p className="mt-1 text-xs text-slate-600">
              From a business perspective, centralizing job posting in this manner reduces manual coordination between HR, department heads,
              and clinicians. Analytics built on top of the underlying event stream—such as time-to-fill, funnel drop-off by specialty, and
              geographic demand heatmaps—enable leadership to plan hiring budgets and training programs more accurately. The same data model
              also supports compliance reporting by recording which candidates were surfaced, which were contacted, and how final hiring
              decisions were made.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Organization Dashboard</h2>
        <ul className="space-y-2 text-sm">
          {activeJobs.map((job) => (
            <li key={job} className="rounded-lg bg-slate-50 p-3">
              {job}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Post a Job</h2>
        <form className="grid gap-3 md:grid-cols-3" onSubmit={submitJob}>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={jobTitle}
            placeholder="Role title"
            onChange={(event) => setJobTitle(event.target.value)}
          />
          <input
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
            value={jobLocation}
            placeholder="Location"
            onChange={(event) => setJobLocation(event.target.value)}
          />
          <button className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700">Create Opening</button>
        </form>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Candidate Search</h2>
          <select
            value={specialtyFilter}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
            onChange={(event) => setSpecialtyFilter(event.target.value)}
          >
            {specialties.map((specialty) => (
              <option key={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        {loadingCandidates ? (
          <div className="space-y-2">
            {[1, 2, 3].map((row) => (
              <div key={row} className="h-14 animate-pulse rounded-lg bg-slate-100" />
            ))}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-sm text-slate-500">No candidates match this specialty.</p>
        ) : (
          <div className="space-y-2">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-xs text-slate-500">
                    {doctor.specialty} · {doctor.location}
                  </p>
                </div>
                <button className="rounded-lg border border-trust-500 px-3 py-1 text-xs text-trust-600">Message Candidate</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
