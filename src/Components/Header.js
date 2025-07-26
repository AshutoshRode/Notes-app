import React from 'react';

function Header({ title }) {
  return (
    <header className="bg-blue-500 text-white py-4 shadow-md ">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
    </header>
  );
}

Header.defaultProps = {
  title: '',
};

export default Header;
