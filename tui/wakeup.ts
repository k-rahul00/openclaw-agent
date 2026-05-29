import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";

const BANNER_FONT = "ANSI Shadow";
const SHADOW = chalk.hex("#5b4d9e");
const FACE = chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii: string) {
  const terminalWidth = process.stdout.columns || 80;
  const borderLine = SHADOW("═".repeat(terminalWidth));

  // Top border
  console.log(borderLine);

  // Content (ASCII art, centered)
  const lines = ascii.split("\n").filter((l) => l.trim());

  for (const line of lines) {
    const padding = Math.max(0, Math.floor((terminalWidth - line.length) / 2));

    console.log(FACE(" ".repeat(padding) + line));
  }

  // Bottom border
  console.log(borderLine);
}
export async function runWakeup() {
  let ascii: string;
  try {
    ascii = figlet.textSync("openclaw", { font: BANNER_FONT });
  } catch (error) {
    ascii = figlet.textSync("openclaw", { font: "Standard" });
  }

  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode do you want to procced with?",
    options: [
      {
        value: "cli",
        label: "CLI",
      },
      {
        value: "telegram",
        label: "Telegram",
      },
      {
        value: "exit",
        label: "Exit",
      },
    ],
  });

  if (isCancel(mode || mode === "exit")) {
    console.log(chalk.dim("Exiting..."));
    return;
  }

  if (mode === "cli") {
    await runCliMode();
  } else if(mode === "telegram") {
    console.log(
      chalk.dim("You have selected Telegram Mode. Starting Telegram..."),
    );
  }
}
