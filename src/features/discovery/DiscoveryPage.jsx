import { useState, useEffect, useCallback } from 'react';
import { getStudents, getUniqueDepartments } from '../../services/peerService';
import { addConnection, addSentRequest, checkConnectionStatus } from '../../services/connectionService';
import StudentCard from '../../components/common/StudentCard';
import Toast from '../../components/common/Toast';

// Accept onConnectionsChange and connectionCountTrigger props
function DiscoveryPage({ onConnectionsChange, connectionCountTrigger }) {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');

  const [departmentFilter, setDepartmentFilter] = useState('');
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('info');
  const [forceUpdate, setForceUpdate] = useState(0); // Add this for forcing re-renders

  const fetchStudents = useCallback(async (
    pageToFetch,
    isLoadMore = false,
    currentSearchTerm = appliedSearchTerm,
    currentFilters = { department: departmentFilter }
  ) => {
    setIsLoading(true);
    try {
      const response = await getStudents(pageToFetch, currentSearchTerm, currentFilters);
      setStudents(prevStudents =>
        isLoadMore ? [...prevStudents, ...response.students] : response.students
      );
      setHasMore(response.hasMore);
      if (response.nextPage) {
        setCurrentPage(response.nextPage);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setToastMessage('Failed to load students. Please try again.');
      setToastType('error');
    } finally {
      setIsLoading(false);
    }
  }, [appliedSearchTerm, departmentFilter]);

  // Fetch students when search term or filters change
  useEffect(() => {
    fetchStudents(1, false, appliedSearchTerm, { department: departmentFilter });
  }, [appliedSearchTerm, departmentFilter, fetchStudents]);

  // Force re-render when connection count changes (without refetching)
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [connectionCountTrigger]);

  useEffect(() => {
    if (availableDepartments.length === 0) {
        setAvailableDepartments(getUniqueDepartments());
    }
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchStudents(currentPage, true, appliedSearchTerm, { department: departmentFilter });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== appliedSearchTerm) {
      setAppliedSearchTerm(searchTerm);
      setCurrentPage(1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === 'departmentFilter') {
      if (value !== departmentFilter) {
        setDepartmentFilter(value);
        setCurrentPage(1);
      }
    }
  };
  const handleConnect = (studentToConnect) => {
    const status = checkConnectionStatus(studentToConnect.id);

    if (status === 'connected' || status === 'request_sent') { // Check both
      setToastMessage(`You are already connected with ${studentToConnect.name}.`);
      setToastType('info');
      return;
    }

    const success = addConnection(studentToConnect);
    if (success) {
      addSentRequest(studentToConnect.id);
      setToastMessage(`Connection request sent to ${studentToConnect.name}! (Auto-accepted)`);
      setToastType('success');
      // Call the callback from DashboardPage to update connection count
      if (onConnectionsChange) {
        onConnectionsChange();
      }
    } else {
      setToastMessage(`Could not connect with ${studentToConnect.name}.`);
      setToastType('info');
    }
  };

  return (
    <div className=" md:p-6 bg-gray-50 min-h-full">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 border-b pb-3">
          Browse Students
        </h2>

        {/* Search and Filter Section (from previous correct version) */}        <div className="mb-6 p-4 border rounded-md bg-gray-50 shadow-sm" role="search" aria-labelledby="search-heading">
          <h3 id="search-heading" className="text-lg font-medium text-gray-800 mb-3">Search and Filter</h3>
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <label htmlFor="search-students" className="block text-sm font-medium text-gray-700 mb-1">Search students</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="search-students"
                type="text"
                placeholder="Search by name, skill, department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Search for students"
                autoComplete="off"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                disabled={isLoading && appliedSearchTerm !== searchTerm}
                aria-label="Submit search"
                aria-busy={isLoading && searchTerm === appliedSearchTerm ? "true" : "false"}
              >
                {isLoading && searchTerm === appliedSearchTerm ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
          <div>
            <label htmlFor="departmentFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Department</label>
            <select
              id="departmentFilter"
              name="departmentFilter"
              value={departmentFilter}
              onChange={handleFilterChange}
              disabled={isLoading}
              className="w-full sm:w-auto p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              aria-label="Filter students by department"
              aria-disabled={isLoading ? "true" : "false"}
            >
              <option value="">All Departments</option>
              {availableDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>


        {isLoading && students.length === 0 && (
          <div className="text-center py-10"><p className="text-gray-500 text-lg">Loading students...</p></div>
        )}
        {!isLoading && students.length === 0 && (
          <p className="text-gray-600 text-center py-10 text-lg">No students found matching your criteria.</p>
        )}        {students.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {students.map((student) => (
              <StudentCard
                key={`${student.id}-${connectionCountTrigger}`}
                student={student}
                onConnect={handleConnect}
                connectionStatus={checkConnectionStatus(student.id)} // Pass current status
              />
            ))}
          </div>
        )}

        {isLoading && students.length > 0 && (
          <div className="text-center py-6"><p className="text-gray-500">Loading more students...</p></div>
        )}
        {hasMore && !isLoading && students.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={handleLoadMore}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              disabled={isLoading}
            >
              Load More Students
            </button>
          </div>
        )}
        {!hasMore && students.length > 0 && !isLoading && (
          <p className="text-center mt-8 text-gray-500">You've reached the end of the list.</p>
        )}
      </div>
    </div>
  );
}

export default DiscoveryPage;