export default function FilterWorks({
  categories,
  onCategorySelect,
  selectedCategory,
  currentLanguage,
}) {
  return (
    <div className="w-full flex justify-center md:w-1/4 mx-auto z-[100] text-sm md:fixed md:top-8 inset-x-0 mt-4 md:mt-0">
      <div className="w-auto space-x-2">
        {/* Apply underline style if selectedCategory is null or 'all' */}
        <button
          className={`lowercase ${selectedCategory === null ? 'underline' : ''}`}
          onClick={() => onCategorySelect(null)}
        >
          All
        </button>
        {categories &&
          categories.map((category) => (
            <button
              key={category._id}
              // Apply underline style if this category is the selected one
              className={`lowercase ${selectedCategory === category._id ? 'underline' : ''}`}
              onClick={() => onCategorySelect(category._id)}
            >
              {category.categoryName[currentLanguage]}
            </button>
          ))}
      </div>
    </div>
  )
}
