const express = require('express');
const router = express.Router();
const {
  createRequest,
  getUserRequests,
  getAllRequests,
  approveRequest,
  rejectRequest,
  markReturned,
  getAdminStats,
} = require('../controllers/requestController');
const { authenticate, adminOnly, studentOnly } = require('../middleware/authMiddleware');

/**
 * Request Routes
 * POST   /api/requests/create              - Create borrow request
 * GET    /api/requests/user/:userId        - Get user's requests
 * GET    /api/requests                     - Get all requests (admin)
 * POST   /api/requests/:requestId/approve  - Approve request (admin)
 * POST   /api/requests/:requestId/reject   - Reject request (admin)
 * POST   /api/requests/:requestId/return   - Mark as returned (admin)
 * GET    /api/admin/stats                  - Get admin statistics (admin)
 */

// ============================================================
// STUDENT/STAFF ROUTES
// ============================================================

/**
 * POST /api/requests/create
 * Create new borrow request (Student/Staff only)
 * 
 * Body: {
 *   studentId,
 *   studentName,
 *   studentEmail,
 *   equipmentId,
 *   equipmentName,
 *   borrowFromDate,
 *   borrowToDate,
 *   notes
 * }
 * Response: { requestId, status }
 */
router.post('/create', authenticate, studentOnly, createRequest);

/**
 * GET /api/requests/user/:userId
 * Get all requests for a specific user
 * 
 * Query: ?status=pending&page=1&limit=10
 * Response: { requests, pagination }
 */
router.get('/user/:userId', authenticate, getUserRequests);

// ============================================================
// ADMIN ONLY ROUTES
// ============================================================

/**
 * GET /api/requests
 * Get all borrow requests (Admin only)
 * 
 * Query: ?status=pending&studentName=John&equipmentName=Basketball&page=1&limit=10
 * Response: { requests, pagination }
 */
router.get('/', authenticate, adminOnly, getAllRequests);

/**
 * POST /api/requests/:requestId/approve
 * Approve a pending request (Admin only)
 * 
 * Body: { approvalNotes }
 * Response: { request }
 */
router.post('/:requestId/approve', authenticate, adminOnly, approveRequest);

/**
 * POST /api/requests/:requestId/reject
 * Reject a pending request (Admin only)
 * 
 * Body: { reason }
 * Response: { request }
 */
router.post('/:requestId/reject', authenticate, adminOnly, rejectRequest);

/**
 * POST /api/requests/:requestId/return
 * Mark approved equipment as returned (Admin only)
 * 
 * Body: { condition, returnNotes }
 * Response: { request }
 */
router.post('/:requestId/return', authenticate, adminOnly, markReturned);

// ============================================================
// ADMIN STATISTICS ROUTES
// ============================================================

/**
 * GET /api/admin/stats
 * Get admin dashboard statistics (Admin only)
 * 
 * Response: { stats, userBreakdown, requestBreakdown }
 */
router.get('/admin/stats', authenticate, adminOnly, getAdminStats);

module.exports = router;