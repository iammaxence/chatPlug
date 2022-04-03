import SearchBar from "../components/SearchBar/SearchBar";

const HomePage = () => {
  const title = "ChatPlug";

  return (
    <div className="flex flex-col items-center w-full">
        <span
          className="font-home text-forest text-5xl mt-24"
        >
          { title }
        </span>
        <SearchBar />
        <div
          className="text-forest"
        >
          In progress
        </div>
    </div>
  )
}

export default HomePage;