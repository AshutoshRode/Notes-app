


import React from "react";

function AboutScreen() {
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-semibold text-blue-700 mb-4">About Notes App</h1>
      
      <p className="text-gray-700 leading-relaxed mb-4">
        Welcome to <span className="font-medium text-blue-600">Notes App</span> – 
        your simple, fast, and secure way to keep track of your ideas, tasks, and important information.
        Whether you’re organizing your daily to-do list, jotting down creative thoughts, or
        saving key details, Notes App makes it effortless.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Our Mission</h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        We believe that productivity tools should be simple yet powerful.
        Our goal is to provide a clean and intuitive platform that lets you focus on your ideas,
        without unnecessary distractions.
      </p>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Features You’ll Love</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Create, edit, and delete notes instantly.</li>
        <li>Organize notes by categories or tags.</li>
        <li>Secure account login and personalized experience.</li>
        <li>Responsive design – access your notes from any device.</li>
      </ul>

      <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Why Choose Notes App?</h2>
      <p className="text-gray-700 leading-relaxed">
        We focus on speed, simplicity, and user experience.
        No unnecessary clutter – just the tools you need to keep your life organized.
        Your notes are stored securely, and you can access them anytime, anywhere.
      </p>

      <p className="text-gray-700 mt-6">
        Thank you for choosing <span className="font-medium text-blue-600">Notes App</span>.
        We’re excited to help you stay organized and productive every day.
      </p>
    </div>
  );
}

export default AboutScreen;

