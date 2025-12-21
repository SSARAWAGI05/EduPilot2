import React, { useEffect, useState } from 'react';
import {
  Star,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/colors';
import { supabase } from '../../supabaseClient';

interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | null;
  duration_weeks: number | null;
  thumbnail_url: string | null;
}

export const CoursesPage: React.FC = () => {
  const { isDark, isFocusMode } = useTheme();
  const themeColors = getThemeColors(isDark, isFocusMode);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const coursesPerPage = 6;
  const totalPages = Math.ceil(courses.length / coursesPerPage);

  /* ================= FETCH COURSES ================= */
  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  /* ================= ENROLL ================= */
  const enrollInCourse = async (courseId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from('course_enrollments')
      .insert({
        course_id: courseId,
        user_id: user.id,
        status: 'active',
      });
  };

  const getCurrentCourses = () => {
    const start = currentPage * coursesPerPage;
    return courses.slice(start, start + coursesPerPage);
  };

  const getLevelColor = (level: string | null) => {
  switch (level) {
    case 'beginner':
      return themeColors.accent.green;
    case 'intermediate':
      return themeColors.accent.yellow;
    case 'advanced':
      return themeColors.accent.red;
    default:
      return themeColors.accent.orange;
  }
};


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-lg font-semibold">Loading courses...</span>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: themeColors.primary.lightGray }} className="min-h-screen">
      <div className="ccontainer mx-auto px-4 sm:px-6 pt-28 sm:pt-36 pb-8 sm:pb-12">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3" style={{ color: themeColors.text.primary }}>
            Explore Our Courses
          </h1>
          <p className="text-base" style={{ color: themeColors.text.secondary }}>
            Learn industry-ready skills from expert-designed programs
          </p>
        </div>

        {/* STATS BAR */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: themeColors.accent.blue }}>
            <div className="text-2xl font-bold" style={{ color: themeColors.primary.w2 }} >{courses.length}</div>
            <div className="text-sm" style={{ color: themeColors.primary.w2 }} >Courses Available</div>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: themeColors.accent.yellow }}>
            <div 
            className="text-2xl font-bold"
            style={{ color: themeColors.primary.w2 }} 
            >Live</div>
            <div className="text-sm" style={{ color: themeColors.primary.w2 }} >Expert Led</div>
          </div>
          <div className="rounded-xl p-4 text-center" style={{ backgroundColor: themeColors.accent.red }}>
            <div className="text-2xl font-bold" style={{ color: themeColors.primary.w2 }} >4.8</div>
            <div className="text-sm" style={{ color: themeColors.primary.w2 }} >Avg Rating</div>
          </div>
        </div>

        {/* COURSE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentCourses().map(course => (
            <div
              key={course.id}
              className="rounded-2xl p-4 shadow-lg hover:scale-105 transition cursor-pointer"
              style={{ backgroundColor: themeColors.background.white }}
            >
              {/* IMAGE */}
              <div
                className="h-40 rounded-xl flex items-center justify-center relative"
                style={{ backgroundColor: '#6b7280' }}
              >
                <PlayCircle className="w-10 h-10 text-white" />
                <span
                  className="absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full"
                  style={{
                    backgroundColor: getLevelColor((course.level ?? 'beginner')),
                    color: '#000',
                  }}
                >
                  {(course.level ?? 'beginner').toUpperCase()}
                </span>
              </div>

              {/* CONTENT */}
              <div className="mt-4">
                <h3 className="font-bold mb-2" style={{ color: themeColors.text.primary }}>
                  {course.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: themeColors.text.secondary }}>
                  {course.description}
                </p>

                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration_weeks ? `${course.duration_weeks} weeks` : 'Flexible'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Enrolled
                  </span>
                </div>

                <button
                  onClick={() => enrollInCourse(course.id)}
                  className="w-full py-2 rounded-lg font-bold transition hover:scale-105"
                  style={{ backgroundColor: themeColors.primary.black, color: themeColors.text.white }}
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-3 mt-10">
          <button
            disabled={currentPage === 0}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: themeColors.accent.blue }}
          >
            <ChevronLeft />
          </button>

          <span className="flex items-center font-semibold">
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-2 rounded-lg"
            style={{ backgroundColor: themeColors.accent.blue }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};
