import { Router, Request, Response } from 'express';

const router = Router();

// Mock user data
const USERS = [
  { id: '1', username: 'admin', role: 'admin', name: 'Admin User', email: 'admin@palaisrouge.ma', avatar: null, phone: '+212 524 43 00 00', createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', username: 'agent', role: 'agent', name: 'Agent Smith', email: 'agent@palaisrouge.ma', avatar: null, phone: '+212 524 43 00 01', bio: 'Experienced real estate agent with 10+ years in luxury properties.', listings: 6, soldProperties: 45, createdAt: '2024-01-01T00:00:00Z' },
  { id: '3', username: 'user', role: 'user', name: 'John Doe', email: 'user@palaisrouge.ma', avatar: null, phone: '+212 524 43 00 02', createdAt: '2024-01-01T00:00:00Z' }
];

// Get all users (admin only)
router.get('/', (_req: Request, res: Response) => {
  const usersWithoutPasswords = USERS.map(({ ...user }) => user);
  return res.json({ users: usersWithoutPasswords });
});

// Get user by ID
router.get('/:id', (req: Request, res: Response) => {
  const user = USERS.find(u => u.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  return res.json({ user });
});

// Get agent profile
router.get('/agent/:id', (req: Request, res: Response) => {
  const agent = USERS.find(u => u.id === req.params.id && u.role === 'agent');
  
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }

  return res.json({ agent });
});

// Update user
router.put('/:id', (req: Request, res: Response) => {
  const index = USERS.findIndex(u => u.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  USERS[index] = { ...USERS[index], ...req.body };
  return res.json({ user: USERS[index] });
});

// Analytics (admin only)
router.get('/admin/analytics', (_req: Request, res: Response) => {
  return res.json({
    totalUsers: USERS.length,
    totalAgents: USERS.filter(u => u.role === 'agent').length,
    totalAdmins: USERS.filter(u => u.role === 'admin').length,
    newUsersThisMonth: 12,
    activeListings: 6,
    pendingApprovals: 3,
    totalViews: 1523,
    totalInquiries: 89
  });
});

export default router;
