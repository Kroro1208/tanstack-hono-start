import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import { db } from '../db';
import { users, type NewUser } from '../db/schema';
import { eq } from 'drizzle-orm';

const auth = new Hono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

// Register endpoint
auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, name } = c.req.valid('json');
  
  try {
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (existingUser.length > 0) {
      return c.json({ error: 'User already exists' }, 409);
    }
    
    // Create new user (in production, hash the password!)
    const newUser: NewUser = {
      email,
      name,
      // TODO: Hash password before saving
      // password: await bcrypt.hash(password, 10),
    };
    
    const [user] = await db.insert(users).values(newUser).returning();
    
    // Remove password from response
    const { ...userResponse } = user;
    
    return c.json({ user: userResponse }, 201);
  } catch (error) {
    console.error('Registration error:', error);
    return c.json({ error: 'Registration failed' }, 500);
  }
});

// Login endpoint
auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
    
    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    // TODO: Verify password hash
    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //   return c.json({ error: 'Invalid credentials' }, 401);
    // }
    
    // Remove password from response
    const { ...userResponse } = user;
    
    return c.json({ user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get current user
auth.get('/me', async (c) => {
  // TODO: Implement JWT token validation middleware
  return c.json({ message: 'Protected route - implement JWT validation' });
});

export { auth };