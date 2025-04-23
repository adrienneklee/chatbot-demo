import { helpOptions, helpLinks, helpMessages } from './resources.js';

export const flow = {
	start: {
		message: `Hello, it's us at Point Blank Creative 👋! We heard you had some questions about this elections upcoming Candidates, I'm excited that you are using our Make a Plan to Vote Bot 😊!`,
		transition: {duration: 1000},
		path: "ask_name"
	},
	ask_name: {
		message: "First off, what is your name?",
		path: "show_options",
	},
	show_options: {
		message: (params) => `Nice to meet you, ${params.userInput}! What are some of the issues you are hoping to learn more about for the upcoming election? Here are some helpful topics you might want to check out to get started:`,
		options: helpOptions,
		path: "process_options"
	},
	prompt_again: {
		message: "Want to learn about something else?",
		options: helpOptions,
		path: "process_options"
	},
	unknown_input: {
		message: `Sorry, I do not understand your message 😢.`,
		options: helpOptions,
		path: "process_options"
	},
	process_options: {
		transition: {duration: 1000},
		chatDisabled: true,
		path: async (params) => {
			const input = params.userInput;

			if (helpMessages[input]) {
				await params.injectMessage(helpMessages[input]);
				return "prompt_again";
			}

			if (helpLinks[input]) {
				await params.injectMessage(`Sit tight, let me take you to some more information.`);
				setTimeout(()=> {
					window.open(helpLinks[input]);
				}, 2000);
				return "repeat";
			}

			return "unknown_input";
		},
	},
	repeat: {
		transition: {duration: 3000},
		path: "prompt_again"
	},
};