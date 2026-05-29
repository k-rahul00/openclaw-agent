import chalk from "chalk";
import { select, isCancel } from "@clack/prompts";

export async function runCliMode() {
  while (true) {
    const mode = await select({
      message: "Choose CLI sub mode",
      options: [
        { value: "agent", label: "Agent CLI" },
        { value: "plan", label: "Plan CLI" },
        { value: "ask", label: "Ask CLI" },
        { value: "back", label: "Back to main menu" },
      ],
    });

    if (isCancel(mode) || mode === "back") return;

    if(mode === "agent"){
        console.log("agent");
    }
    if(mode === "plan"){
        console.log("plan");
    }
    if(mode === "ask"){
        console.log("ask");
    }
    if(mode !== "agent" && mode !== "plan" && mode !== "ask"){
        console.log(chalk.red("Invalid option, please select again."));
    }
  }
}
