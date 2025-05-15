const logincredential = require('../model/logincredential');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Add SPOC user
exports.addSpocUser = async (req, res) => {
  console.log('Inside Add SPOC User Controller');

  const { username, email, password, name } = req.body;

  // Basic validation
  if (!username || !email || !password || !name) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await logincredential.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new logincredential({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'spoc',
    });

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    console.error('Error saving SPOC user:', error);
    res.status(500).json({ message: `User creation failed: ${error.message}` });
  }
};


//get

// exports.getSpocUsers = async (req, res) => {
//     console.log('Inside get SPOC User Controller');

//     try {
//       const users = await logincredential.find({ role: 'spoc' }); // Filter by role 'spoc'
//       res.status(200).json(users);
//     } catch (error) {
//       console.error("Error fetching SPOC users:", error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
exports.getSpocUsers = async (req, res) => {
    console.log('Inside get SPOC and Admin User Controller');
  
    try {
      // Find users whose role is either 'spoc' or 'admin'
      const users = await logincredential.find({
        role: { $in: ['spoc', 'admin'] }
      });
  
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching SPOC and Admin users:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

// Edit SPOC user
exports.editSpocUser = async (req, res) => {
    const { id } = req.params; // Get user ID from the request params
    const { username, email, name, password } = req.body; // Get updated data from the request body
  
    try {
      const user = await logincredential.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'SPOC user not found' });
      }
  
      // Update fields
      user.username = username || user.username;
      user.email = email || user.email;
      user.name = name || user.name;
  
      // If a password is provided, hash it and save
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the new password
        user.password = hashedPassword;
      }
  
      await user.save(); // Save the updated user
  
      // Return updated user data (without password)
      const userResponse = {
        username: user.username,
        email: user.email,
        name: user.name,
      };
  
      res.status(200).json({ message: 'SPOC user updated successfully', user: userResponse });
    } catch (error) {
      console.error("Error editing SPOC user:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Delete SPOC user
exports.deleteSpocUser = async (req, res) => {
    const { id } = req.params; // Get user ID from request params
  
    try {
      // Attempt to find and delete the user in one step
      const user = await logincredential.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'SPOC user not found' });
      }
  
      // Successfully deleted the user
      res.status(200).json({ message: 'SPOC user deleted successfully' });
    } catch (error) {
      console.error("Error deleting SPOC user:", error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};

  
  // Get a single user (admin or spoc) by ID
exports.getSingleSpocUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await logincredential.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Update user password
exports.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body; // this should be already hashed on the frontend
  
    try {
      const user = await logincredential.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.password = password; // Already hashed on frontend
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  