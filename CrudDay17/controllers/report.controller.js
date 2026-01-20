// Import DB pool
const { pool } = require('../db');

/* =================================
   CREATE REPORT
================================= */
const createReport = async (req, res) => {
  try {
    // Get data from request body
    const { title, description, category } = req.body;

    // Validation
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required'
      });
    }

    // Insert report into database
    const result = await pool.query(
      `INSERT INTO reports (title, description, category)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, category]
    );

    // Send response
    res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create report',
      error: error.message
    });
  }
};

/* =================================
   GET ALL REPORTS
================================= */
const getAllReports = async (req, res) => {
  try {
    // Fetch reports from DB
    const result = await pool.query(
      'SELECT * FROM reports ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      total: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reports',
      error: error.message
    });
  }
};

/* =================================
   UPDATE REPORT (EDIT)
================================= */
const updateReport = async (req, res) => {
  try {
    // Get ID from URL
    const { id } = req.params;

    // Fields to update
    const { title, description, category, status } = req.body;

    // Ensure at least one field is provided
    if (!title && !description && !category && !status) {
      return res.status(400).json({
        success: false,
        message: 'At least one field is required'
      });
    }

    // Update query (partial update)
    const result = await pool.query(
      `UPDATE reports
       SET
         title = COALESCE($1, title),
         description = COALESCE($2, description),
         category = COALESCE($3, category),
         status = COALESCE($4, status)
       WHERE id = $5
       RETURNING *`,
      [title, description, category, status, id]
    );

    // If no record found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    res.json({
      success: true,
      message: 'Report updated successfully',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update report',
      error: error.message
    });
  }
};

/* =================================
   DELETE REPORT
================================= */
const deleteReport = async (req, res) => {
  try {
    // Get ID from URL params
    const { id } = req.params;

    // Delete report from DB
    const result = await pool.query(
      `DELETE FROM reports
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    // If no report found
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Report not found'
      });
    }

    // Success response
    res.json({
      success: true,
      message: 'Report deleted successfully',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete report',
      error: error.message
    });
  }
};


// Export controllers
module.exports = {
  createReport,
  getAllReports,
  updateReport,
  deleteReport
};
