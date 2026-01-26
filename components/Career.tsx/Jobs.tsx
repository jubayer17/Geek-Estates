"use client";

import { useState } from "react";
import careersData from "../../public//data/career.json";
import { motion, AnimatePresence } from "framer-motion";
import { format, isAfter } from "date-fns";
import CareerForm from "./Careerform";

type Career = {
  id: number;
  title: string;
  description: string;
  salary: string;
  experience: string;
  location: string;
  deadline: string;
};

export default function CareersSection() {
  const [selectedJob, setSelectedJob] = useState<Career | null>(null);
  const today = new Date();

  return (
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold">
        Join Our Team
      </h2>
       <p className='text-gray-500 text-center py-1'>On going jobs</p>
      </div>
      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {careersData.map((job: Career) => {
          const deadlineDate = new Date(job.deadline);
          const isActive = isAfter(deadlineDate, today);

          return (
            <motion.div
              key={job.id}
              className={`p-6 rounded-2xl shadow-lg relative ${
                isActive
                  ? "bg-white hover:shadow-2xl cursor-pointer"
                  : "bg-gray-300 opacity-60 cursor-not-allowed"
              }`}
              whileHover={isActive ? { scale: 1.03 } : {}}
              onClick={() => isActive && setSelectedJob(job)}
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-600 mb-2">{job.description}</p>

              <div className="text-sm text-gray-500 mb-1">
                <strong>Salary:</strong> {job.salary}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Experience:</strong> {job.experience}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Location:</strong> {job.location}
              </div>
              <div className="text-sm text-gray-400 mt-2">
                <strong>Deadline:</strong> {format(deadlineDate, "dd MMM yyyy")}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Career Form Panel */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 w-full md:w-1/2 h-full bg-white shadow-2xl p-8 overflow-auto z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">{selectedJob.title}</h3>
              <button
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 font-bold text-xl"
              >
                ✕
              </button>
            </div>
            <CareerForm job={selectedJob} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
