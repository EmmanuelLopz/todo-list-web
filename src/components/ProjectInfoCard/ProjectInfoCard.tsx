const BookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const tags = ["REACT 18", "TAILWIND CSS", "COMPONENT-DRIVEN DESIGN"];

const ProjectInfoCard = () => {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2 rounded-lg">
          <BookIcon />
        </div>
        <h2 className="text-xl font-bold text-gray-900">About the Project</h2>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        Scholarly Atelier is more than just a task manager; it is an educational
        endeavor built to explore the boundaries of modern frontend development.
      </p>

      <blockquote className="border-l-4 border-blue-500 bg-gray-50 rounded-r-lg px-5 py-4 mb-6">
        <p className="text-gray-700 italic leading-relaxed">
          "An educational todo application designed as a practical playground for
          mastering React's component-based architecture and state management."
        </p>
      </blockquote>

      <p className="text-gray-600 leading-relaxed mb-8">
        By blending the focused environment of a private library with contemporary
        web technologies, this project demonstrates how aesthetic design and
        functional logic can coexist harmoniously. It serves as a living laboratory
        for React hooks, context APIs, and responsive UI patterns.
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-600 text-xs font-semibold tracking-wider px-4 py-2 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectInfoCard;
