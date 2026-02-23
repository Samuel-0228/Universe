import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, BookOpen, MapPin, X, Plus, Trash2, Info } from 'lucide-react';
import { toast } from 'sonner';

export const StudentTools = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="space-y-8" id="student">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { id: 'gpa', label: 'GPA Calculator', icon: Calculator, color: 'bg-orange-500' },
          { id: 'lost-mode', label: 'Campus Finder', icon: MapPin, color: 'bg-red-500' },
          { id: 'planner', label: 'Semester Planner', icon: Calendar, color: 'bg-purple-500' },
          { id: 'courses', label: 'Course Tracker', icon: BookOpen, color: 'bg-yellow-500' },
        ].map(tool => (
          <button 
            key={tool.id} 
            onClick={() => setActiveTool(tool.id)}
            className="flex flex-col items-center justify-center p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/10 transition-all hover:translate-y-[-2px] group"
          >
            <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4 shadow-lg shadow-${tool.color.split('-')[1]}-900/20`}>
              <tool.icon className="text-white" size={24} />
            </div>
            <span className="text-xs font-black uppercase tracking-widest group-hover:text-blue-400 transition-colors">{tool.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeTool === 'gpa' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 text-orange-500">
              <Calculator size={120} />
            </div>
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div>
                <h3 className="text-2xl font-black flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center text-orange-500">
                    <Calculator size={20} />
                  </div>
                  Institutional GPA Calculator
                </h3>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 ml-1">Official AAU Academic Standards</p>
              </div>
              <button 
                onClick={() => setActiveTool(null)} 
                className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <GPACalculator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ id: 1, credit: '', grade: '', score: '' }]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), credit: '', grade: '', score: '' }]);
  };

  const removeCourse = (id: number) => {
    if (courses.length === 1) {
      toast.error('At least one course is required');
      return;
    }
    setCourses(courses.filter(c => c.id !== id));
  };

  const getGradeFromScore = (num: number) => {
    if (num >= 90 && num <= 100) return "A+";
    if (num >= 85) return "A";
    if (num >= 80) return "A-";
    if (num >= 75) return "B+";
    if (num >= 70) return "B";
    if (num >= 65) return "B-";
    if (num >= 60) return "C+";
    if (num >= 50) return "C";
    if (num >= 45) return "C-";
    if (num >= 40) return "D";
    return "F";
  };

  const getPointsFromGrade = (grade: string) => {
    const points: Record<string, number> = { 
      'A+': 4, 'A': 4, 'A-': 3.75, 
      'B+': 3.5, 'B': 3, 'B-': 2.75, 
      'C+': 2.5, 'C': 2, 'C-': 1.75, 
      'D': 1, 'F': 0 
    };
    return points[grade] ?? 0;
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const credit = parseFloat(c.credit);
      const grade = c.grade || (c.score ? getGradeFromScore(parseFloat(c.score)) : '');
      
      if (credit && grade) {
        totalPoints += credit * getPointsFromGrade(grade);
        totalCredits += credit;
      }
    });

    if (totalCredits === 0) {
      toast.error('Please enter valid credits and grades');
      return;
    }

    const gpa = (totalPoints / totalCredits).toFixed(2);
    toast.success(`SGPA Calculated: ${gpa}`, {
      description: `Based on ${totalCredits} ECTS credits.`,
    });
  };

  return (
    <div className="space-y-6 relative z-10">
      <div className="hidden md:grid grid-cols-12 gap-4 text-[10px] font-black text-gray-500 uppercase tracking-widest px-2 mb-2">
        <div className="col-span-4">ECTS / Credits</div>
        <div className="col-span-4">Numerical Score (0-100)</div>
        <div className="col-span-3">Letter Grade</div>
        <div className="col-span-1 text-center"></div>
      </div>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {courses.map((course, idx) => (
          <div key={course.id} className="grid grid-cols-12 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="col-span-12 md:col-span-4 space-y-2">
              <label className="md:hidden text-[10px] font-black text-gray-500 uppercase tracking-widest">ECTS / Credits</label>
              <input
                type="number"
                placeholder="ECTS"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-orange-500 outline-none"
                value={course.credit}
                onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[idx].credit = e.target.value;
                  setCourses(newCourses);
                }}
              />
            </div>
            
            <div className="col-span-12 md:col-span-4 space-y-2">
              <label className="md:hidden text-[10px] font-black text-gray-500 uppercase tracking-widest">Numerical Score</label>
              <input
                type="number"
                placeholder="Score (e.g. 85)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-orange-500 outline-none"
                value={course.score}
                onChange={(e) => {
                  const newCourses = [...courses];
                  const val = e.target.value;
                  newCourses[idx].score = val;
                  if (val) {
                    newCourses[idx].grade = getGradeFromScore(parseFloat(val));
                  }
                  setCourses(newCourses);
                }}
              />
            </div>

            <div className="col-span-12 md:col-span-3 space-y-2">
              <label className="md:hidden text-[10px] font-black text-gray-500 uppercase tracking-widest">Letter Grade</label>
              <select
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-1 focus:ring-orange-500 outline-none"
                value={course.grade}
                onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[idx].grade = e.target.value;
                  newCourses[idx].score = ''; // Clear score if manual grade selection
                  setCourses(newCourses);
                }}
              >
                <option value="" className="bg-[#0a0a0a]">Select</option>
                {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].map(g => (
                  <option key={g} value={g} className="bg-[#0a0a0a]">{g}</option>
                ))}
              </select>
            </div>

            <div className="col-span-12 md:col-span-1 flex items-end justify-center">
              <button 
                onClick={() => removeCourse(course.id)}
                className="p-3 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                title="Remove Course"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          onClick={addCourse}
          className="flex-1 flex items-center justify-center gap-2 border border-orange-500/30 text-orange-400 py-4 rounded-2xl hover:bg-orange-500/10 transition-all font-black uppercase tracking-widest text-xs"
        >
          <Plus size={18} /> Add Entry
        </button>
        <button 
          onClick={calculateGPA}
          className="flex-[1.5] bg-orange-600 text-white py-4 rounded-2xl hover:bg-orange-500 transition-all font-black uppercase tracking-widest text-xs shadow-xl shadow-orange-900/40"
        >
          Calculate SGPA
        </button>
      </div>

      <div className="bg-white/[0.03] p-4 rounded-xl border border-white/5 flex items-start gap-3">
        <Info size={16} className="text-orange-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-gray-500 font-medium leading-relaxed uppercase tracking-tighter">
          Note: You can enter either a numerical score (0-100) or select a letter grade directly. The system automatically maps numerical scores to the official institutional grading scale.
        </p>
      </div>
    </div>
  );
};