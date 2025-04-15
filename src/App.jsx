import { useState } from 'react'
import ChatBot from 'react-chatbotify'
import './App.css'

function App() {

  const themes = [
		{id: "solid_purple_haze", version: "0.1.0"},
		{id: "simple_blue", version: "0.1.0"}
	]


	const helpOptions = ["The Environment", "Healthcare", "Affordability & Infrastructure", "Housing", "Education"];
	const flow = {
		start: {
			message: "Hello, it's us at Point Blank Creative 👋! We heard you had some questions about this elections upcoming Candidates, I'm excited that you are using our " +
				"Make a Plan to Vote Bot 😊!",
			transition: {duration: 1000},
			path: "ask_name"
		},
    ask_name: {
      message: "First off, what is your name?",
      path: "show_options",
    },
    // greet: {
    //   message: (params) => `Nice to meet you, ${params.userInput}!`,
    //   path: "show_options",
    // },
		show_options: {
			message: (params) => `Nice to meet you, ${params.userInput}! `+ "What are some of the issues you are hoping to learn more about for the upcoming election? " +
				"Here are some helpful topics you might want to check out to get started:",
			options: helpOptions,
			path: "process_options"
		},
		prompt_again: {
			message: "Do you need any other help?",
			options: helpOptions,
			path: "process_options"
		},
		unknown_input: {
			message: "Sorry, I do not understand your message 😢! If you require further assistance, you may click on " +
				"the Github option and open an issue there or visit our discord.",
			options: helpOptions,
			path: "process_options"
		},
		process_options: {
			transition: {duration: 0},
			chatDisabled: true,
			path: async (params) => {
				let link = "";
				switch (params.userInput) {
				case "The Environment":
					link = "https://calgarysfuture.ca/";
					break;
				case "Healthcare":
					link = "https://calgarysfuture.ca/";
					break;
				case "Affordability & Infrastructure":
					link = "https://calgarysfuture.ca/actions/save-the-greenline/";
					break;
				case "Housing":
					link = "https://calgarysfuture.ca/actions/sign-on-for-housing/";
					break;
				case "Education":
					link = "https://calgarysfuture.ca/actions/safe_schools/";
					break;
				default:
					return "unknown_input";
				}
				await params.injectMessage("Sit tight! I'll send you right there!");
				setTimeout(() => {
					window.open(link);
				}, 1000)
				return "repeat"
			},
		},
		repeat: {
			transition: {duration: 3000},
			path: "prompt_again"
		},
	}
	return (
		<ChatBot settings={{general: {embedded: true}, chatHistory: {storageKey: "example_faq_bot"}}} themes={themes} flow={flow}/>
	);
};

export default App
