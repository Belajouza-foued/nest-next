'use client';
import React from 'react';
import useUserStore from '@/app/store/useStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './UserProfile.module.css'
import imageProfile from '../../../public/images/profile-user.png'
export default function UserProfile() {
  const user = useUserStore((state) => state.user);
   const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }
  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <div className={styles.containerProfile} style={{ maxWidth: '600px', margin: 'auto' }}>
       <Image
      src={imageProfile}
      alt="Photo de profil"
      width={80}
      height={80}
      className="rounded-full border border-white-300"
    />
      <h2>Profil Utilisateur</h2>
      <p><strong>ID :</strong> {user._id}</p>
      <p><strong>Nom :</strong> {user.name}</p>
      <p><strong>Email :</strong> {user.email}</p>
       <button className='btn btn-warning ps-3 pe-3 mt-2' onClick={handleLogout}>logout</button>
    </div>
   
  );
}
