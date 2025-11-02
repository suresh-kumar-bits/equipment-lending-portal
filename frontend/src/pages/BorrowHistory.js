import React, { useState } from 'react';

/**
 * BorrowHistory Page
 * 
 * This page displays:
 * - All borrowing requests made by the user
 * - Status of each request (pending, approved, rejected, returned)
 * - Request details and history
 * - Filter and search functionality
 * 
 * Props:
 * - user: Current logged-in user object
 * 
 * Future Integration with Backend:
 * - Get requests: GET /api/requests/user/:userId
 * - Cancel request: DELETE /api/requests/:requestId
 * - Return equipment: POST /api/requests/:requestId/return
 */

const BorrowHistory = ({ user }) => {
  // Mock borrow history data
  const mockBorrowHistory = [
    {
      id: 1,
      equipmentName: 'Basketball Set',
      equipmentId: 1,
      category: 'Sports',
      borrowDate: '2025-11-01',
      returnDate: '2025-11-05',
      requestedDate: '2025-10-31',
      status: 'approved',
      approvedBy: 'Admin User',
      notes: 'Return in good condition',
    },
    {
      id: 2,
      equipmentName: 'Microscope',
      equipmentId: 2,
      category: 'Lab',
      borrowDate: '2025-10-28',
      returnDate: '2025-10-30',
      requestedDate: '2025-10-27',
      status: 'returned',
      approvedBy: 'Admin User',
      notes: 'Used for biology lab',
    },
    {
      id: 3,
      equipmentName: 'Digital Camera',
      equipmentId: 3,
      category: 'Camera',
      borrowDate: null,
      returnDate: null,
      requestedDate: '2025-11-02',
      status: 'pending',
      approvedBy: null,
      notes: 'Awaiting approval',
    },
    {
      id: 4,
      equipmentName: 'Guitar',
      equipmentId: 4,
      category: 'Musical',
      borrowDate: null,
      returnDate: null,
      requestedDate: '2025-11-01',
      status: 'rejected',
      approvedBy: 'Admin User',
      notes: 'Equipment currently unavailable',
    },
    {
      id: 5,
      equipmentName: 'Laptop',
      equipmentId: 5,
      category: 'Computing',
      borrowDate: '2025-10-20',
      returnDate: '2025-10-25',
      requestedDate: '2025-10-19',
      status: 'returned',
      approvedBy: 'Admin User',
      notes: 'Used for project work',
    },
  ];

  // State management
  const [borrowHistory, setBorrowHistory] = useState(mockBorrowHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewDetails, setViewDetails] = useState(null);

  /**
   * Filter history based on search and status
   */
  const getFilteredHistory = () => {
    let filtered = borrowHistory;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter((item) => item.status === filterStatus);
    }

    return filtered;
  };

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: { bg: 'bg-warning', icon: 'fa-hourglass-half', text: 'Pending' },
      approved: { bg: 'bg-info', icon: 'fa-check-circle', text: 'Approved' },
      returned: { bg: 'bg-success', icon: 'fa-check-double', text: 'Returned' },
      rejected: { bg: 'bg-danger', icon: 'fa-times-circle', text: 'Rejected' },
    };
    return statusStyles[status] || statusStyles.pending;
  };

  /**
   * Count requests by status
   */
  const getStatusCount = (status) => {
    return borrowHistory.filter((item) => item.status === status).length;
  };

  const filteredHistory = getFilteredHistory();

  return (
    <div className="container-fluid py-4">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h3 fw-bold text-dark">
            <i className="fa fa-history me-2 text-primary"></i>Borrow History
          </h1>
          <p className="text-muted">View all your borrowing requests and history</p>
        </div>
      </div>

      {/* Status Summary Cards */}
      <div className="row mb-4 g-3">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-hourglass-half me-1 text-warning"></i>Pending
                  </p>
                  <h4 className="fw-bold text-warning mb-0">
                    {getStatusCount('pending')}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-check-circle me-1 text-info"></i>Approved
                  </p>
                  <h4 className="fw-bold text-info mb-0">
                    {getStatusCount('approved')}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-check-double me-1 text-success"></i>Returned
                  </p>
                  <h4 className="fw-bold text-success mb-0">
                    {getStatusCount('returned')}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-0 shadow-sm bg-light">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div>
                  <p className="text-muted small mb-1">
                    <i className="fa fa-times-circle me-1 text-danger"></i>Rejected
                  </p>
                  <h4 className="fw-bold text-danger mb-0">
                    {getStatusCount('rejected')}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="row mb-4">
        <div className="col-md-8">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-search me-2"></i>Search Equipment
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by equipment name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-600 text-dark">
            <i className="fa fa-filter me-2"></i>Filter by Status
          </label>
          <select
            className="form-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="returned">Returned</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="row mb-3">
        <div className="col-12">
          <p className="text-muted small">
            Showing <strong>{filteredHistory.length}</strong> of{' '}
            <strong>{borrowHistory.length}</strong> requests
          </p>
        </div>
      </div>

      {/* Borrow History Table */}
      {filteredHistory.length > 0 ? (
        <div className="row mb-4">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-hover border">
                <thead className="table-light">
                  <tr>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-box me-2"></i>Equipment
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-calendar me-2"></i>Requested Date
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-calendar-check me-2"></i>Borrow Date
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-calendar-times me-2"></i>Return Date
                    </th>
                    <th className="fw-600 text-dark">
                      <i className="fa fa-info-circle me-2"></i>Status
                    </th>
                    <th className="fw-600 text-dark text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((item) => {
                    const status = getStatusBadge(item.status);
                    return (
                      <tr key={item.id}>
                        <td>
                          <div>
                            <p className="fw-600 text-dark mb-1">{item.equipmentName}</p>
                            <small className="text-muted">{item.category}</small>
                          </div>
                        </td>
                        <td className="text-muted">{item.requestedDate}</td>
                        <td className="text-muted">{item.borrowDate || '-'}</td>
                        <td className="text-muted">{item.returnDate || '-'}</td>
                        <td>
                          <span className={`badge ${status.bg}`}>
                            <i className={`fa ${status.icon} me-1`}></i>
                            {status.text}
                          </span>
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setViewDetails(item)}
                            title="View details"
                          >
                            <i className="fa fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fa fa-inbox fa-3x text-muted mb-3 d-block"></i>
          <h5 className="text-muted">No requests found</h5>
          <p className="text-muted small">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Details Modal */}
      {viewDetails && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-light border-bottom">
                <h5 className="modal-title fw-bold">
                  <i className="fa fa-info-circle me-2 text-primary"></i>Request Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewDetails(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Equipment</h6>
                  <p className="mb-1">
                    <strong>{viewDetails.equipmentName}</strong>
                  </p>
                  <small className="text-muted">Category: {viewDetails.category}</small>
                </div>

                <hr />

                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Request Status</h6>
                  <div className="mb-2">
                    <span className={`badge ${getStatusBadge(viewDetails.status).bg}`}>
                      <i className={`fa ${getStatusBadge(viewDetails.status).icon} me-1`}></i>
                      {getStatusBadge(viewDetails.status).text}
                    </span>
                  </div>
                  <small className="text-muted">
                    Requested: {viewDetails.requestedDate}
                  </small>
                </div>

                <hr />

                <div className="mb-3">
                  <h6 className="fw-600 text-dark mb-2">Dates</h6>
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-muted">Borrow Date:</span>
                    <strong className="text-dark">{viewDetails.borrowDate || '-'}</strong>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-muted">Return Date:</span>
                    <strong className="text-dark">{viewDetails.returnDate || '-'}</strong>
                  </div>
                </div>

                <hr />

                {viewDetails.approvedBy && (
                  <div className="mb-3">
                    <h6 className="fw-600 text-dark mb-2">Approved By</h6>
                    <p className="mb-0 text-muted">{viewDetails.approvedBy}</p>
                  </div>
                )}

                {viewDetails.notes && (
                  <div className="mb-3">
                    <h6 className="fw-600 text-dark mb-2">Notes</h6>
                    <p className="mb-0 text-muted">{viewDetails.notes}</p>
                  </div>
                )}
              </div>
              <div className="modal-footer border-top">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewDetails(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BorrowHistory;