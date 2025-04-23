import ChatBot from 'react-chatbotify';
import CustomHeader from './components/CustomHeader.jsx';
import {flow} from './botFlow.js';

import './App.css';


function App() {
//   const themes = [
//     {id: "sunset_orange", version: "0.1.0"},
//     // {id: "simple_blue", version: "0.1.0"}
//   ]
	return (
		<ChatBot 
		settings={{
			general: {
				embedded: true,
				header: CustomHeader,
			}, 
			chatHistory: {storageKey: "example_faq_bot"},
		}}
		// themes={
		// 	themes
		// }
			flow={flow}
		/>
	);
};

export default App
