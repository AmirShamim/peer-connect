import { mockStudents } from '../data/mockStudents'; // grabbing all the fake student data

const ITEMS_PER_PAGE = 6; // figured 6 looks good in a grid layout

export const getStudents = (page = 1, searchTerm = '', filters = {}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredStudents = [...mockStudents];

      // time to filter by search terms (this was trickier than I thought)
      if (searchTerm) {
        const lowerSearchTerm = searchTerm.toLowerCase();
        filteredStudents = filteredStudents.filter(student =>
          student.name.toLowerCase().includes(lowerSearchTerm) ||
          (student.skills && student.skills.toLowerCase().includes(lowerSearchTerm)) ||
          (student.department && student.department.toLowerCase().includes(lowerSearchTerm)) ||
          (student.projectAreas && student.projectAreas.toLowerCase().includes(lowerSearchTerm))
        );
      }

      // department filter stuff (seems to work fine)
      if (filters.department && filters.department !== "") {
        filteredStudents = filteredStudents.filter(
          student => student.department.toLowerCase() === filters.department.toLowerCase()
        );
      }
      // TODO: maybe add year and skills filters later? idk
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
    }, 300); // fake loading delay so it feels more real
  });
};

// helper function to get all the departments for the dropdown
export const getUniqueDepartments = () => {
  // better check if the data actually exists first
  if (!mockStudents || mockStudents.length === 0) {
    return [];
  }
  const departments = new Set(mockStudents.map(student => student.department).filter(Boolean)); // getting rid of any empty ones
  return Array.from(departments).sort();
};