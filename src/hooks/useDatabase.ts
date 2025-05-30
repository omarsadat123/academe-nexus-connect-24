
import { useState, useCallback } from 'react';
import { supabase } from '../contexts/AuthContext';
import { Course, Assignment, Announcement, Resource } from '../types';

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);

  const fetchCourses = useCallback(async (userId?: string, role?: string) => {
    setLoading(true);
    try {
      let query = supabase.from('courses').select(`
        *,
        course_enrollments!inner(student_id)
      `);

      if (role === 'faculty') {
        query = query.eq('faculty_id', userId);
      } else if (role === 'student') {
        query = query.eq('course_enrollments.student_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching courses:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchCourses:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAssignments = useCallback(async (courseId: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .eq('course_id', courseId)
        .order('due_date', { ascending: true });

      if (error) {
        console.error('Error fetching assignments:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchAssignments:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchAnnouncements = useCallback(async (courseId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });

      if (courseId) {
        query = query.eq('course_id', courseId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching announcements:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchAnnouncements:', error);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(async (courseData: Partial<Course>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('courses')
        .insert([courseData])
        .select()
        .single();

      if (error) {
        console.error('Error creating course:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createCourse:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const createAssignment = useCallback(async (assignmentData: Partial<Assignment>) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assignments')
        .insert([assignmentData])
        .select()
        .single();

      if (error) {
        console.error('Error creating assignment:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in createAssignment:', error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    fetchCourses,
    fetchAssignments,
    fetchAnnouncements,
    createCourse,
    createAssignment,
  };
};
