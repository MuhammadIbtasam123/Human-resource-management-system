### Summary of "50 Cloud Code Tips"

This video provides an extensive and practical guide on using **Cloud Code**—a powerful AI-assisted coding environment—based on the host’s six months of daily usage experience. The content covers foundational setup, essential commands, workflow optimizations, and advanced features, emphasizing **context management** as the core to maximizing Cloud Code’s effectiveness.

---

### Key Insights and Concepts

- **Root Directory Usage**: Always run Cloud Code from the root directory of your project. This ensures that the context—including rule files and codebase—is zipped and tokenized correctly, avoiding unexpected token usage.

- **Initialization and Claw.md File**:
  - Use `/init` to analyze your codebase, which generates a foundational **claw.md** rules file.
  - The **claw.md** file governs AI behavior and operates hierarchically: project-specific rules override global user rules.
  - Keep the claw.md concise (~300 lines) to minimize token bloat and improve AI precision.
  - Important content for claw.md includes:
    - **Technical architecture**
    - **Domain context** (e.g., SwiftUI usage)
    - **Build and validation flows**, which enable the AI to self-improve by iterating until the code passes validation.

- **Validation Loop**: A crucial concept. Defining a clear build and validation process (e.g., compile checks, unit tests) allows Cloud Code to autonomously fix and refine generated code until it works correctly, vastly improving output quality.

- **Keyboard Shortcuts and Modes**:
  - `Shift + Tab`: Toggle between **Plan Mode** (used for outlining and reasoning) and **Accept Edits Mode** (used for code generation).
  - `Escape`: Interrupt ongoing AI processing if it goes off track.
  - Double `Escape`: Clear current input or rewind to a previous context checkpoint.
  - Vim mode is available but optional.

- **Essential Slash Commands**:

| Command    | Description                                             | Use Case / Notes                                           |
| ---------- | ------------------------------------------------------- | ---------------------------------------------------------- |
| `/init`    | Initializes the claw.md file by analyzing the codebase  | Run once per project                                       |
| `/clear`   | Clears the current AI context                           | Start fresh when switching tasks or features               |
| `/context` | Shows the current AI context and token usage            | Useful for auditing token bloat and managing context       |
| `/compact` | Summarizes and compresses context to save tokens        | Rarely needed; useful for saving context snapshots         |
| `/models`  | Displays or switches AI models (e.g., Opus 4.5, Sonnet) | Opus recommended for best results if cost is not an issue  |
| `/resume`  | Recovers a previously lost Cloud Code session           | To avoid losing work after accidental closure              |
| `/mcp`     | Lists installed Model Context Protocols (MCPs)          | Use sparingly due to token bloat; install only needed MCPs |
| `/help`    | Displays available slash commands                       | Good for exploring functionality                           |

- **MCPs (Model Context Protocols)**:
  - MCPs extend Cloud Code’s capabilities, enabling integration with third-party tools (e.g., Xcode, Figma).
  - They significantly increase token usage, so use them selectively.
  - Cloud Code can find and install MCPs automatically.

- **Skills and Commands**:
  - **Skills** are user-defined workflows combining multiple tasks (e.g., fetching Hacker News and saving summaries).
  - Skills can be triggered via slash commands; this composability enables automation.
  - Skills persist as markdown system prompts within dedicated directories.
  - Users should avoid manual edits of skills and instead use Cloud Code to update them dynamically.

- **Sub Agents**:
  - Lightweight parallel workers designed to run atomic or side-effect tasks without overloading the main context.
  - Best for isolated tasks that do not require deep contextual integration.
  - Avoid using sub agents for tasks needing intimate knowledge of recent code changes (e.g., testing or validation), which should remain in the main session.

- **Context Management**:
  - **Fresh, condensed context beats bloated context**. Overloading context degrades AI performance.
  - Use commands like `/clear`, `/compact`, and mindful claw.md design to keep context efficient.
  - Implement a **“second brain”** system to persist and reload relevant context across sessions, facilitating project-to-project switching without losing key information.
  - Context engineering is the biggest skill to master for effective Cloud Code usage.

- **Workflows and Parallel Development**:
  - The presenter advocates using terminal multiplexers (e.g., iTerm) to juggle multiple Cloud Code instances simultaneously.
  - This allows working on multiple features or projects in parallel, improving productivity.
  - Use **git worktrees** to manage multiple versions or branches of the same codebase concurrently.
  - Keyboard shortcuts facilitate fast switching between instances, resembling a "Starcraft"-style multitasking experience.

- **SlashChrome**:
  - A built-in command to control and navigate web browsers programmatically.
  - Useful for scraping web data or automating browser-based workflows when API access is unavailable.
  - It can be composed with other commands to create powerful automation pipelines.

- **Hooks and Automation**:
  - Cloud Code supports **pre-hooks** and **post-hooks** similar to GitHub workflows.
  - Useful for automated linting, formatting, or safety checks (e.g., preventing destructive commands).
  - Recommended to automate routine safety or quality tasks without manual intervention.

- **Dangerously Skip Mode**:
  - A command-line flag (`--dangerously-skip-permissions`) disables confirmation prompts for actions.
  - Useful for throwaway environments or rapid testing but risky for production or destructive operations.
  - Use with caution, especially when dealing with file system or OS-level commands.

- **Final Emphasis**:
  - **Context is king**: provide Cloud Code the minimal but sufficient context it needs—no more, no less.
  - Spend time upfront in planning and context-building (Plan Mode) to ensure smooth and efficient code generation.
  - Explore and leverage Cloud Code’s composability (skills, MCPs, sub agents, hooks, plugins) to tailor workflows.
  - Use Cloud Code as a collaborative engineering partner, not just a code generator, by actively questioning and refining its outputs.

---

### Timeline of Notable Topics

| Time Range    | Topic Summary                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------- |
| 00:00 - 03:00 | Introduction, running Cloud Code from root, `/init` command to generate claw.md                             |
| 03:00 - 06:00 | Understanding claw.md hierarchy, content guidelines, importance of build/validation flows                   |
| 06:00 - 10:00 | Keyboard shortcuts: Plan Mode, Accept Edits, interrupts, clearing input, context rewind                     |
| 10:00 - 15:00 | Essential slash commands explained: `/clear`, `/context`, `/compact`, `/models`, `/resume`, `/mcp`, `/help` |
| 15:00 - 20:00 | Deep dive into claw.md rule file structure, updating via Cloud Code, rule priority                          |
| 20:00 - 25:00 | Using keywords to trigger skills and MCPs, compound engineering and committing claw.md                      |
| 25:00 - 30:00 | Cloud Code workflows: plan mode usage, multi-instance juggling, context switching, second brain concept     |
| 30:00 - 35:00 | Skills, commands, MCPs, and creating/updating composable workflows                                          |
| 35:00 - 40:00 | Sub agents usage, common misuse, context considerations                                                     |
| 40:00 - 45:00 | Advanced workflows: parallel development, terminal multiplexing, git worktrees                              |
| 45:00 - 47:00 | SlashChrome browser automation and web scraping                                                             |
| 47:00 - 48:30 | Hooks and automation (pre-hooks, post-hooks) for linting, safety                                            |
| 48:30 - End   | Final recommendations: plugin ecosystem, context importance, encouragement to build with Cloud Code         |

---

### Core Concepts Table

| Term                             | Definition / Description                                                                                   |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **claw.md**                      | A hierarchical rules file that guides the AI’s behavior based on the project context and coding standards. |
| **Plan Mode**                    | A Cloud Code mode focused on planning and reasoning before code generation.                                |
| **Accept Edits Mode**            | Default mode where Cloud Code generates or edits code based on the plan.                                   |
| **MCP (Model Context Protocol)** | Plugins or extensions that provide specialized knowledge or integration with tools (e.g., Xcode, Figma).   |
| **Skill**                        | A saved workflow or macro composed of multiple commands or actions, reusable via slash commands.           |
| **Sub Agent**                    | A lightweight parallel AI instance for isolated or atomic tasks without loading full context.              |
| **Second Brain**                 | User-managed local context snapshots for persisting and lazy-loading project knowledge across sessions.    |
| **SlashChrome**                  | Browser automation tool integrated into Cloud Code for navigation, scraping, and interaction.              |
| **Hooks**                        | Automation triggers that run pre- or post-execution of commands to enforce safety or quality checks.       |

---

### Final Recommendations

- Prioritize **context engineering** to keep AI interactions effective.
- Use **Plan Mode** extensively for upfront reasoning.
- Limit MCP usage to essential cases to control token costs.
- Leverage **skills, sub agents, and plugins** for composability and workflow automation.
- Adopt **git and worktrees** for parallel version control.
- Use **slash commands** frequently to manage context, clear sessions, and control AI models.
- Always validate with build/compilation and automated tests to enable AI self-correction.
- Experiment with **SlashChrome** for tasks lacking APIs.
- Explore the Cloud Code ecosystem for shared plugins and workflows.

---

This summary captures the comprehensive approach to mastering Cloud Code, emphasizing **context management, composability, and iterative validation** as keys to becoming a productive AI-assisted developer.
