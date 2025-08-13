'use client';

import React, { useState } from 'react';
import { z } from 'zod';
import axios from 'axios';
import UserStore from '../store/useStore';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Login.module.css'

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Mot de passe trop court'),
});

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
 const login = UserStore((state) => state.login);
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      loginSchema.parse(form);

     const res = await axios.post('http://localhost:4050/auth/login', form);// adapte selon ton API backend

  login(res.data.user, res.data.access_token);
      alert('Connexion réussie');
        router.push('/userProfile');  // ← redirection ici
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
    <form onSubmit={handleSubmit} className={styles.login}>
        <div className={styles.loginForm}>
      <h1 className='text-center pt-5'style={{fontSize:"50px",color:"#fff"}}>Connexion</h1>
      <input name="email" placeholder="Email" value={form.email} className={styles.emailLogin} onChange={handleChange} />
      <input name="password" type="password" placeholder="Mot de passe" className={styles.passLogin} value={form.password} onChange={handleChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div className='text-center mt-5 '>
      <button type="submit" className='btn btn-success form-control pt-2 pb-2' style={{width:"30%",fontSize:"20px"}}>Se connecter</button>
      </div>
      </div>
    </form>
  );
}
