import { Router } from 'express';

const router = Router();

// Mock login endpoint
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Mock user validation
  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      error: 'Username and password required' 
    });
  }

  // Mock user data
  const users = {
    admin: { username: 'admin', password: '123', role: 'admin', name: 'Admin User' },
    agent: { username: 'agent', password: '123', role: 'agent', name: 'Agent Smith' },
    user: { username: 'user', password: '123', role: 'user', name: 'John Doe' }
  };

  const user = users[username as keyof typeof users];
  
  if (user && user.password === password) {
    return res.json({
      success: true,
      user: {
        id: username,
        username: user.username,
        name: user.name,
        role: user.role
      },
      token: 'mock-jwt-token-' + username
    });
  }

  return res.status(401).json({ 
    success: false, 
    error: 'Invalid credentials' 
  });
});

// Mock register endpoint
router.post('/register', (req, res) => {
  const { username, password, name, email } = req.body;
  
  if (!username || !password || !name || !email) {
    return res.status(400).json({ 
      success: false, 
      error: 'All fields required' 
    });
  }

  // In a real app, you'd hash the password and save to database
  return res.json({
    success: true,
    message: 'User registered successfully',
    user: {
      id: 'new-user-' + Date.now(),
      username,
      name,
      email,
      role: 'user'
    }
  });
});

// Mock logout endpoint
router.post('/logout', (req, res) => {
  return res.json({ success: true, message: 'Logged out successfully' });
});

// Mock profile endpoint
router.get('/profile', (req, res) => {
  // In a real app, you'd verify the JWT token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ 
      success: false, 
      error: 'Authentication required' 
    });
  }

  // Mock profile data
  return res.json({
    success: true,
    user: {
      id: 'user-123',
      username: 'johndoe',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2024-01-01T00:00:00Z'
    }
  });
});

export default router;