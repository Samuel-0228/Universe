import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Calendar, BookOpen, MapPin, X, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export const StudentTools = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="space-y-8">
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
            className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group"
          >
            <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4 shadow-lg`}>
              <tool.icon className="text-white" size={24} />
            </div>
            <span className="text-sm font-bold group-hover:text-blue-400 transition-colors">{tool.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {activeTool === 'gpa' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <Calculator className="text-orange-500" />
                Institutional GPA Calculator
              </h3>
              <button onClick={() => setActiveTool(null)} className="p-2 hover:bg-white/10 rounded-full"><X size={16} /></button>
            </div>
            <GPACalculator />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GPACalculator = () => {
  const [courses, setCourses] = useState([{ id: 1, credit: '', grade: '' }]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), credit: '', grade: '' }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const credit = parseFloat(c.credit);
      const gradePoints: Record<string, number> = { 'A+': 4, 'A': 4, 'A-': 3.75, 'B+': 3.5, 'B': 3, 'B-': 2.75, 'C+': 2.5, 'C': 2, 'C-': 1.75, 'D': 1, 'F': 0 };
      if (credit && gradePoints[c.grade] !== undefined) {
        totalPoints += credit * gradePoints[c.grade];
        totalCredits += credit;
      }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    toast.success(`Calculated GPA: ${gpa}`);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest px-2">
        <div className="col-span-6">Credit Hours</div>
        <div className="col-span-4">Grade</div>
        <div className="col-span-2 text-center">Action</div>
      </div>
      {courses.map((course, idx) => (
        <div key={course.id} className="grid grid-cols-12 gap-4">
          <input
            type="number"
            placeholder="3"
            className="col-span-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={course.credit}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[idx].credit = e.target.value;
              setCourses(newCourses);
            }}
          />
          <select
            className="col-span-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
            value={course.grade}
            onChange={(e) => {
              const newCourses = [...courses];
              newCourses[idx].grade = e.target.value;
              setCourses(newCourses);
            }}
          >
            <option value="" className="bg-slate-900">Grade</option>
            {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'].map(g => (
              <option key={g} value={g} className="bg-slate-900">{g}</option>
            ))}
          </select>
          <button 
            onClick={() => removeCourse(course.id)}
            className="col-span-2 flex items-center justify-center text-red-500 hover:bg-red-500/10 rounded-xl"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ))}
      <div className="flex gap-4 pt-4">
        <button 
          onClick={addCourse}
          className="flex-1 flex items-center justify-center gap-2 border border-blue-500/50 text-blue-400 py-4 rounded-xl hover:bg-blue-500/10 transition-all font-bold"
        >
          <Plus size={18} /> Add Course
        </button>
        <button 
          onClick={calculateGPA}
          className="flex-1 bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-500 transition-all font-bold shadow-lg shadow-blue-900/20"
        >
          Calculate Result
        </button>
      </div>
    </div>
  );
};