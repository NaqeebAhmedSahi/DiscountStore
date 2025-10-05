// components/common/ViewToggle/ViewToggle.jsx
"use client";

export default function ViewToggle({ viewMode, setViewMode }) {
  const views = [
    { id: 'grid', icon: '⊞', label: 'Grid' },
    { id: 'list', icon: '☰', label: 'List' },
    { id: 'masonry', icon: '⊡', label: 'Masonry' }
  ];

  return (
    <div className="flex items-center space-x-2 bg-gray-100 rounded-full p-1">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => setViewMode(view.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
            viewMode === view.id
              ? 'bg-white text-purple-600 shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{view.icon}</span>
          <span className="hidden sm:inline">{view.label}</span>
        </button>
      ))}
    </div>
  );
}

