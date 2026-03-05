'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { doctors, posts as seedPosts } from '@/data/mockData';
import { useRole } from '@/components/AppShell';

export default function FeedPage() {
  const { role } = useRole();
  const [draft, setDraft] = useState('Sharing key lessons from this week\'s patient rounds.');
  const [enhancing, setEnhancing] = useState(false);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [posts] = useState(seedPosts);
  const [doctorSkills, setDoctorSkills] = useState(() => doctors);
  const [endorsed, setEndorsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoadingFeed(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const roleNotice = useMemo(() => {
    if (role === 'Doctor') return null;
    return role === 'Organization'
      ? 'You are viewing the doctor networking feed in Organization mode. Use this to discover clinical leaders.'
      : 'You are viewing the doctor networking feed in Patient mode. Use this to evaluate doctor expertise and communication style.';
  }, [role]);

  const enhanceContent = () => {
    setEnhancing(true);
    setTimeout(() => {
      setDraft(
        'This week\'s multidisciplinary rounds reinforced how transparent care plans, early mobilization targets, and family education can measurably improve clinical outcomes and patient satisfaction.'
      );
      setEnhancing(false);
    }, 2000);
  };

  const endorseSkill = (doctorId: string, skill: string) => {
    const key = `${doctorId}-${skill}`;
    if (endorsed[key]) return;
    setDoctorSkills((current) =>
      current.map((doctor) =>
        doctor.id === doctorId ? { ...doctor, skills: { ...doctor.skills, [skill]: doctor.skills[skill] + 1 } } : doctor
      )
    );
    setEndorsed((current) => ({ ...current, [key]: true }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {roleNotice && <div className="rounded-xl border border-brand-100 bg-brand-50 p-3 text-sm text-brand-700">{roleNotice}</div>}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-2 text-lg font-semibold">Feature Overview</h2>
        <p className="text-sm text-slate-700">
          This feed simulates how a clinical networking platform could operationalize content posting, implicit feedback (likes), and skill
          endorsements in a data-driven way. The current implementation uses seeded data and deterministic UI logic, but is designed to
          approximate how a production system might capture interaction signals and prepare them for downstream ranking or recommendation
          models.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Post Content</h3>
            <p className="mt-1 text-xs text-slate-600">
              The &quot;Create Clinical Insight&quot; composer models a structured content authoring workflow. In a real deployment, each draft
              would be stored with metadata such as specialty tags, ICD-based condition groups, and temporal markers, enabling algorithms like
              TF–IDF or transformer-based embeddings to cluster similar posts and surface clinically relevant threads. The AI enhance action
              represents a natural language generation layer that could standardize tone, highlight measurable outcomes, and enforce privacy
              constraints before publishing.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">View Content</h3>
            <p className="mt-1 text-xs text-slate-600">
              The AI-enhanced feed renders posts with engagement counts to illustrate a ranking-ready schema. A production system could apply
              learning-to-rank models that weigh factors such as specialty match, historical click-through rate, dwell time, and patient safety
              flags to order the feed. Business-wise, this supports discovery of credible clinical voices while ensuring that organizations and
              patients see content that is both contextually relevant and aligned with governance policies.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Add Like</h3>
            <p className="mt-1 text-xs text-slate-600">
              Although likes are currently displayed as static counts, they represent a canonical implicit feedback signal. In an analytics
              pipeline, each like event would be logged with hashed user identifiers, timestamps, and device context, then aggregated into
              engagement features such as rolling 7-day like velocity, specialty-normalized popularity scores, and anomaly detection for
              suspicious spikes. From a business perspective, these metrics help identify high-impact educators, measure campaign performance,
              and guide product decisions around which content formats drive sustained clinician engagement.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Endorse</h3>
            <p className="mt-1 text-xs text-slate-600">
              The endorsement controls attached to each skill simulate a trust graph between clinicians. Each endorsement increment can be
              treated as a weighted edge in this graph, where weights could be adjusted by role (peer vs. organization vs. patient), recency,
              and historical reliability of the endorser. Graph algorithms such as PageRank or community detection can then be used to surface
              domain experts, while fraud-detection models monitor for endorsement rings or unnatural patterns. This creates business value by
              making it easier for hospitals to identify credible leaders for key roles and for patients to discover trustworthy specialists.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Create Clinical Insight</h2>
        <textarea
          className="h-28 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none ring-brand-500 focus:ring"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <button
          onClick={enhanceContent}
          disabled={enhancing}
          className="mt-3 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed"
        >
          <Sparkles className={`h-4 w-4 ${enhancing ? 'animate-spin' : ''}`} />
          {enhancing ? 'Enhancing...' : '✨ AI Enhance'}
        </button>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">AI-Enhanced Feed</h2>
        {loadingFeed ? (
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="h-24 animate-pulse rounded-xl bg-slate-100" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <p className="text-sm text-slate-500">No posts yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <article key={post.id} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{post.author}</h3>
                  <span className="text-xs text-slate-500">{post.timestamp}</span>
                </div>
                <p className="text-sm text-slate-700">{post.content}</p>
                <div className="mt-2 text-xs text-slate-500">{post.likes} likes · {post.comments.length} comments</div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Peer Directory</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {doctorSkills.map((doctor) => (
            <div key={doctor.id} className="rounded-xl border border-slate-100 p-4">
              <div className="mb-3 flex items-center gap-3">
                <Image src={doctor.profilePicture} alt={doctor.name} width={44} height={44} className="rounded-full" />
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-xs text-slate-500">{doctor.specialty}</p>
                </div>
                <button className="ml-auto rounded-lg border border-brand-300 px-3 py-1 text-xs text-brand-700">Connect</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(doctor.skills).map(([skill, count]) => {
                  const key = `${doctor.id}-${skill}`;
                  const isEndorsed = endorsed[key];
                  return (
                    <button
                      key={skill}
                      onClick={() => endorseSkill(doctor.id, skill)}
                      className={`rounded-full px-3 py-1 text-xs ${
                        isEndorsed ? 'bg-trust-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-brand-100'
                      }`}
                    >
                      Endorse {skill} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
