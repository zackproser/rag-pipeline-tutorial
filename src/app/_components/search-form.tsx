interface SearchFormProps {
  suggestedSearches: string[];
  onSearch: (query: string) => void;
  setIsLoading: (loading: boolean) => void;
}

export default function SearchForm({ suggestedSearches, onSearch, setIsLoading }: SearchFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    setIsLoading(true);
    await onSearch(input.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          name="query"
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded-md"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Send
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {suggestedSearches.map((q) => (
          <button
            key={q}
            onClick={() => onSearch(q)}
            className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
} 