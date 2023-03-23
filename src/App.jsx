import "./App.css";
import { TalentCard } from "./components/TalentCard/TalentCard";

const testTalent = {
	id: 11,
	name: "Maksym",
	surname: "Khudoliy",
	profilePicture: "https://upload.wikimedia.org/wikipedia/uk/4/4a/%D0%9F%D0%BE%D1%81%D1%82%D0%B5%D1%80_%D0%B4%D0%BE_%D1%84%D1%96%D0%BB%D1%8C%D0%BC%D1%83_%C2%AB%D0%9B%D1%8E%D0%B4%D0%B8%D0%BD%D0%B0-%D0%BF%D0%B0%D0%B2%D1%83%D0%BA%2C_%D0%9F%D0%BE%D0%B2%D0%B5%D1%80%D0%BD%D0%B5%D0%BD%D0%BD%D1%8F_%D0%B4%D0%BE%D0%B4%D0%BE%D0%BC%D1%83%C2%BB.jpg",
	kindOfTalent: "Web Developer"
};

function App() {
	return (
		<>
			<TalentCard {...testTalent}/>
		</>
	);
}

export default App;
