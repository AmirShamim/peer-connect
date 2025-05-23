import { mockStudents } from '../data/mockStudents'; // Assuming TOTAL_STUDENTS is not strictly needed here

const ITEMS_PER_PAGE = 6; // Adjusted for potentially better grid display

export const getStudents = (page = 1, searchTerm = '', filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredStudents = [...mockStudents];

      // Apply search term
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredStudents = filteredStudents.filter(student =>
          student.name.toLowerCase().includes(lowerSearchTerm) ||
          (student.skills && student.skills.toLowerCase().includes(lowerSearchTerm)) ||
          (student.department && student.department.toLowerCase().includes(lowerSearchTerm)) ||
          (student.projectAreas && student.projectAreas.toLowerCase().includes(lowerSearchTerm))
        );
      }

      // Apply filters (example: department filter)
      if (filters.department && filters.department !== "") {
        filteredStudents = filteredStudents.filter(
          student => student.department.toLowerCase() === filters.department.toLowerCase()
        );
      }
      // Add more filters here (e.g., year, skills)
      // if (filters.year && filters.year !== "") { ... }

      const totalFilteredStudents = filteredStudents.length;
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const paginatedStudents = filteredStudents.slice(start, end);

      resolve({
        students: paginatedStudents,
        hasMore: end < totalFilteredStudents,
        nextPage: paginatedStudents.length > 0 && end < totalFilteredStudents ? page + 1 : null,
        totalStudents: totalFilteredStudents,
      });
    }, 300); // Simulate network delay
  });
};

// Helper to get unique departments for filter dropdown
export const getUniqueDepartments = () => {
  // Ensure mockStudents is available and has data
  if (!mockStudents || mockStudents.length === 0) {
    return [];
  }
  const departments = new Set(mockStudents.map(student => student.department).filter(Boolean)); // Filter out undefined/null departments
  return Array.from(departments).sort();
};