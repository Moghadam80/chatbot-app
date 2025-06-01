import React, { Suspense } from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';

export const revalidate = 3600; // Revalidate every hour

const PersonalInfoPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Personal Information</h1>
      <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading...</div>}>
        <PersonalInfoForm />
      </Suspense>
    </div>
  );
};

export default PersonalInfoPage; 