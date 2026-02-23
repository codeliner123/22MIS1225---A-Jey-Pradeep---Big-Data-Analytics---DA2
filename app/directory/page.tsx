'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { doctors, posts } from '@/data/mockData';

const slots = ['09:00 AM', '10:30 AM', '12:00 PM', '03:00 PM', '05:00 PM'];
const days = Array.from({ length: 14 }, (_, index) => index + 1);

export default function DirectoryPage() {
  const [query, setQuery] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id ?? '');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredDoctors = useMemo(() => {
    const search = query.toLowerCase();
    return doctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(search) ||
        doctor.specialty.toLowerCase().includes(search) ||
        doctor.location.toLowerCase().includes(search)
    );
  }, [query]);

  const selectedDoctor = doctors.find((doctor) => doctor.id === selectedDoctorId) ?? filteredDoctors[0];
  const doctorPosts = posts.filter((post) => post.author === selectedDoctor?.name);

  const confirmBooking = () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot) return;
    setShowSuccess(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Find Your Doctor</h2>
        <input
          placeholder="Search by specialty, location, or name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {filteredDoctors.map((doctor) => (
            <button
              key={doctor.id}
              onClick={() => setSelectedDoctorId(doctor.id)}
              className={`rounded-lg border p-3 text-left ${
                selectedDoctorId === doctor.id ? 'border-brand-500 bg-brand-50' : 'border-slate-200 bg-white'
              }`}
            >
              <p className="font-medium">{doctor.name}</p>
              <p className="text-xs text-slate-500">{doctor.specialty} · {doctor.location}</p>
            </button>
          ))}
        </div>
        {filteredDoctors.length === 0 && <p className="mt-3 text-sm text-slate-500">No doctors match your search.</p>}
      </section>

      {selectedDoctor && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold">Doctor Profile</h2>
          <p className="mt-1 text-sm text-slate-600">{selectedDoctor.credentials} · {selectedDoctor.specialty}</p>
          <p className="mt-2 text-sm text-slate-700">{selectedDoctor.about}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(selectedDoctor.skills).map(([skill, count]) => (
              <span key={skill} className="rounded-full bg-trust-500/10 px-3 py-1 text-xs text-trust-600">{skill} ({count})</span>
            ))}
          </div>
          <h3 className="mt-4 text-sm font-semibold">Educational Posts</h3>
          <div className="mt-2 space-y-2">
            {doctorPosts.length === 0 ? (
              <p className="text-sm text-slate-500">No posts yet.</p>
            ) : (
              doctorPosts.map((post) => (
                <article key={post.id} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{post.content}</article>
              ))
            )}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold">Appointment Booking</h2>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDate(day)}
              className={`rounded-md p-2 text-sm ${selectedDate === day ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {slots.map((slot) => (
            <button
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`rounded-full px-3 py-1 text-xs ${
                selectedSlot === slot ? 'bg-trust-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        <button
          onClick={confirmBooking}
          className="mt-4 rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Confirm Appointment
        </button>
      </section>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="w-full max-w-md rounded-2xl bg-white p-6 text-center"
            >
              <h3 className="text-lg font-semibold text-trust-600">Appointment Confirmed</h3>
              <p className="mt-2 text-sm text-slate-600">
                You are booked with {selectedDoctor?.name} on day {selectedDate} at {selectedSlot}.
              </p>
              <button
                onClick={() => setShowSuccess(false)}
                className="mt-4 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
