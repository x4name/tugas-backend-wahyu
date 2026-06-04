'use strict'; 

const jwt = require('jsonwebtoken');
const { User } = require('../models'); 

// Helper: buat token JWT 
const generateToken = (userId) => jwt.sign(
  { id: userId }, 
  process.env.JWT_SECRET, 
  { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
);

// POST /api/auth/register — Daftarkan user baru 
const register = async (req, res) => { 
  try { 
    const { nama, email, password } = req.body;
    
    if (!nama || !email || !password) 
      return res.status(400).json({ success: false, message: 'Semua field wajib diisi' });
      
    const existing = await User.findOne({ where: { email } });
    if (existing) 
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar' }); 
      
    const user = await User.create({ nama, email, password });
    
    // password otomatis di-hash 
    const token = generateToken(user.id); 
    
    res.status(201).json({ 
      success: true, 
      message: 'Registrasi berhasil', 
      token, 
      user: { id: user.id, nama: user.nama, email: user.email, role: user.role } 
    });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message }); 
  } 
};

// POST /api/auth/login — Masuk aplikasi 
const login = async (req, res) => { 
  try { 
    const { email, password } = req.body; 
    
    if (!email || !password) 
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' }); 
      
    const user = await User.findOne({ where: { email } }); 
    if (!user) 
      return res.status(401).json({ success: false, message: 'Email atau password salah' }); 
      
    const isMatch = await user.comparePassword(password); 
    if (!isMatch) 
      return res.status(401).json({ success: false, message: 'Email atau password salah' }); 
      
    const token = generateToken(user.id); 
    
    res.json({ 
      success: true, 
      message: 'Login berhasil', 
      token, 
      user: { id: user.id, nama: user.nama, email: user.email, role: user.role } 
    });
  } catch (error) { 
    res.status(500).json({ success: false, message: error.message }); 
  } 
};

// GET /api/auth/me — Lihat data user yang sedang login 
const getMe = async (req, res) => res.json({ success: true, user: req.user });

// POST /api/auth/logout — Konfirmasi logout (hapus token di sisi client) 
const logout = async (req, res) => res.json({ 
  success: true, 
  message: 'Logout berhasil. Hapus token dari penyimpanan lokal.' 
});

module.exports = { register, login, getMe, logout };