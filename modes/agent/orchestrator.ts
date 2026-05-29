import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";

export async function runAgentCLI() {
    console.log(chalk.bold("Welcome to the Agent CLI!"));

    const goal = await text({
        message: "What would you like the agent to do?",
        placeholder: "Concrete task for this code base",
    });

    if(isCancel(goal) || !goal.trim()) return;

    const config = defaultAgentConfig();
    const tracker = new ActionTracker();
}