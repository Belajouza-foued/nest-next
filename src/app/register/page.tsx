'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserStore from '../store/useStore';
import styles from './Register.module.css'

const registerSchema = z.object({
  name: z.string().min(2, 'Le nom est trop court'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Le mot de passe doit avoir au moins 6 caractères'),
});

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
   const login = UserStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      registerSchema.parse(form);

   const res = await axios.post('http://localhost:4050/auth/register', form);

 login(res.data.user, res.data.access_token); 
      alert('Inscription réussie');
    } catch (err: any) {
      if (err.errors) {
        setError(err.errors.map((e: any) => e.message).join(', '));
      } else if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Erreur inconnue');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.container}>
      <h1>Inscription</h1>
      <input name="name" placeholder="Nom" value={form.name} className={styles.Name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email}  className={styles.Name} onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe"  className={styles.Name} value={form.password} onChange={handleChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" className='btn btn-success'>S'inscrire</button>
      </div>
    </form>
  );
}

