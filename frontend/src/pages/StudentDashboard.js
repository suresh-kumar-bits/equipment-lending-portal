import React, { useState, useEffect } from 'react';
import EquipmentCard from '../components/EquipmentCard';

/**
 * StudentDashboard Page
 * 
 * This page displays:
 * - All available equipment in a grid/list format
 * - Search and filter functionality
 * - Ability to borrow equipment
 * - View borrow history
 * 
 * Props:
 * - user: Current logged-in user object
 * 
 * Future Integration with Backend:
 * - Equipment list from: GET /api/equipment
 * - Borrow request: POST /api/requests/create
 * - Search: GET /api/equipment?search=query&category=category
 */

const StudentDashboard = ({ user }) => {
  // Mock equipment data - Phase 1
  const mockEquipmentData = [
    {
      id: 1,
      name: 'Basketball Set',
      category: 'Sports',
      description: 'Professional basketball set with 5 balls and pump',
      condition: 'Good',
      quantity: 5,
      available: 3,
      image: null,
    },
    {
      id: 2,
      name: 'Microscope',
      category: 'Lab',
      description: 'Advanced optical microscope for laboratory work',
      condition: 'Excellent',
      quantity: 10,
      available: 8,
      image: null,
    },
    {
      id: 3,
      name: 'Digital Camera',
      category: 'Camera',
      description: '24MP DSLR camera with lenses',
      condition: 'Good',
      quantity: 4,
      available: 2,
      image: null,
    },
    {
      id: 4,
      name: 'Guitar',
      category: 'Musical',
      description: 'Acoustic guitar with case and accessories',
      condition: 'Good',
      quantity: 3,
      available: 1,
      image: null,
    },
    {
      id: 5,
      name: 'Laptop',
      category: 'Computing',
      description: 'Intel i7 laptop for project work',
      condition: 'Excellent',
      quantity: 6,
      available: 4,
      image: null,
    },
    {
      id: 6,
      name: 'Toolkit',
      category: 'Tools',
      description: 'Complete toolkit with 50+ tools',
      condition: 'Good',
      quantity: 2,
      available: 0,
      image: null,
    },
    {
      id: 7,
      name: 'Projector',
      category: 'Computing',
      description: '4K projector for presentations',
      condition: 'Good',
      quantity: 3,
      available: 2,
      image: null,
    },
    {
      id: 8,
      name: 'Volleyball Set',
      category: 'Sports',
      description: 'Professional volleyball set with net',
      condition: 'Fair',
      quantity: 4,
      available: 2,
      image: null,
    },
  ];

  // State management
  const [equipment, setEquipment] = useState(mockEquipmentData);
  const [filteredEquipment, setFilteredEquipment] = useState(mockEquipmentData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAvailability, setSelectedAvailability] = useState('all');
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [selectedEquipmentForBorrow, setSelectedEquipmentForBorrow] = useState(null);

  /**
   * Get unique categories from equipment
   */
  const getCategories = () => {
    const categories = [...new Set(equipment.map((item) => item.category))];
    return categories;
  };

  /**
   * Filter equipment based on search, category, and availability
   */
  useEffect(() => {
    let filtered = equipment;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by availability
    if (selectedAvailability === 'available') {
      filtered = filtered.filter((item) => item.available > 0);
    } else if (selectedAvailability === 'unavailable') {
      filtered = filtered.filter((item) => item.available === 0);
    }

    setFilteredEquipment(filtered);
  }, [searchTerm, selectedCategory, selectedAvailability, equipment]);

  /**
   * Handle equipment borrow button click
   * Opens modal to confirm borrow request
   */
  const handleBorrowClick = (equipmentItem) => {
    setSelectedEquipmentForBorrow(equipmentItem);
    setShowBorrowModal(true);
  };

  /**
   * Submit borrow request
   * In Phase 2: Will call POST /api/requests/create
   */
  const handleSubmitBorrow = () => {
    if (!selectedEquipmentForBorrow) return;

    // Create borrow request object
    const newRequest = {
      id: borrowRequests.length + 1,
      studentId: user.id,
      studentName: user.name,
      equipmentId: selectedEquipmentForBorrow.id,
      equipmentName: selectedEquipmentForBorrow.name,
      borrowDate: new Date().toLocaleDateString(),
      requestDate: new Date().toLocaleDateString(),
      status: 'pending',
    };

    // Add to borrow requests
    setBorrowRequests([...borrowRequests, newRequest]);

    // Close modal
    setShowBorrowModal(false);
    setSelectedEquipmentForBorrow(null);

    // Show success message
    alert(`Borrow request submitted for ${selectedEquipmentForBorrow.name}`);
  };

  /**
   * Clear all filters
   */
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedAvailability('all');
  };

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="h3 fw-bold text-dark">
            <i className="fa fa-box me-2 text-primary"></i>Available Equipment
          </h1>
          <p className="text-muted">Browse and borrow equipment from our inventory</p>
        </div>
        <div className="col-md-4 text-end">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn btn-sm ${viewType === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewType('grid')}
              title="Grid view"
            >
              <i className="fa fa-th"></i> Grid
            </button>
            <button
              type="button"
              className={`btn btn-sm ${viewType === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setViewType('list')}
              title="List view"
            >
              <i className="fa fa-list"></i> List
            </button>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-search me-2"></i>Search Equipment
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-filter me-2"></i>Category
          </label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {getCategories().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 mb-3">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-check-circle me-2"></i>Availability
          </label>
          <select
            className="form-select"
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
          >
            <option value="all">All Items</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Unavailable Only</option>
          </select>
        </div>

        <div className="col-md-2 mb-3 d-flex align-items-end">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={handleClearFilters}
          >
            <i className="fa fa-times me-1"></i>Clear
          </button>
        </div>
      </div>

      {/* Results Counter */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted small">
            Showing <strong>{filteredEquipment.length}</strong> of{' '}
            <strong>{equipment.length}</strong> items
          </p>
        </div>
      </div>

      {/* Equipment Grid/List */}
      {filteredEquipment.length > 0 ? (
        <div
          className={
            viewType === 'grid'
              ? 'row g-4'
              : 'row'
          }
        >
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className={viewType === 'grid' ? 'col-md-6 col-lg-4' : 'col-12'}
            >
              <EquipmentCard
                equipment={item}
                onBorrow={handleBorrowClick}
                userRole={user.role}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fa fa-inbox fa-3x text-muted mb-3 d-block"></i>
          <h5 className="text-muted">No equipment found</h5>
          <p className="text-muted small">
            Try adjusting your search filters or check back later
          </p>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleClearFilters}
          >
            <i className="fa fa-refresh me-1"></i>Clear Filters
          </button>
        </div>
      )}

      {/* Borrow Modal */}
      {showBorrowModal && selectedEquipmentForBorrow && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className="fa fa-plus-circle me-2 text-success"></i>Borrow Equipment
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowBorrowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info alert-sm mb-3">
                  <i className="fa fa-info-circle me-2"></i>
                  <strong>Equipment:</strong> {selectedEquipmentForBorrow.name}
                </div>
                <p className="text-muted">
                  Are you sure you want to request to borrow this equipment? An administrator will
                  review your request.
                </p>
                <div className="bg-light p-3 rounded mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">Available:</span>
                    <strong className="text-success">{selectedEquipmentForBorrow.available}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Condition:</span>
                    <strong className="text-dark">{selectedEquipmentForBorrow.condition}</strong>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowBorrowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmitBorrow}
                >
                  <i className="fa fa-check me-1"></i>Confirm Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;