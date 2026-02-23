'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useState } from 'react';
import { doctors, posts as seedPosts } from '@/data/mockData';

export default function FeedPage() {
  const [draft, setDraft] = useState('Sharing key lessons from this week\'s patient rounds.');
  const [enhancing, setEnhancing] = useState(false);
  const [posts] = useState(seedPosts);
  const [doctorSkills, setDoctorSkills] = useState(() => doctors);
  const [endorsed, setEndorsed] = useState<Record<string, boolean>>({});

  const enhanceContent = () => {
    setEnhancing(true);
    setTimeout(() => {
      setDraft(
        'This week\'s multidisciplinary rounds reinforced how transparent care plans and daily mobility goals can measurably improve patient outcomes and satisfaction.'
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
        {posts.length === 0 ? (
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
