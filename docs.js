export const UV_DOCS = `Now I have all the content. Here is the complete organized knowledge base from all pages:

---

# UV Documentation Knowledge Base

---

## PAGE 1: uv Homepage (https://docs.astral.sh/uv/)

**uv** -- An extremely fast Python package and project manager, written in Rust.

### Highlights
- Single tool replacing \`pip\`, \`pip-tools\`, \`pipx\`, \`poetry\`, \`pyenv\`, \`twine\`, \`virtualenv\`, and more
- 10-100x faster than pip
- Comprehensive project management with universal lockfile
- Script execution with inline dependency metadata support
- Python version installation and management capabilities
- Tool installation and execution for Python packages
- Pip-compatible interface for performance improvements
- Cargo-style workspace support for scalable projects
- Disk-space efficient global cache for dependency deduplication
- Installable without Rust or Python via curl or pip
- Cross-platform support: macOS, Linux, Windows
- Backed by Astral, creators of Ruff

### Installation

macOS and Linux:
\`\`\`
$ curl -LsSf https://astral.sh/uv/install.sh | sh
\`\`\`

Windows:
\`\`\`
PS> powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
\`\`\`

Additional installation methods available via Homebrew and pip.

---

## PAGE 2: Installation (https://docs.astral.sh/uv/getting-started/installation/)

### Standalone Installer

For macOS and Linux users:
\`\`\`
curl -LsSf https://astral.sh/uv/install.sh | sh
\`\`\`

Alternatively with wget:
\`\`\`
wget -qO- https://astral.sh/uv/install.sh | sh
\`\`\`

For specific versions, append the version number to the URL (example: \`0.10.9\`).

Windows users:
\`\`\`
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
\`\`\`

"Changing the execution policy allows running a script from the internet."

Users can inspect scripts before execution using \`less\` or \`more\` commands.

### PyPI Installation

"For convenience, uv is published to PyPI." Installation with \`pipx install uv\` or \`pip install uv\`.

"uv ships with prebuilt distributions (wheels) for many platforms; if a wheel is not available for a given platform, uv will be built from source, which requires a Rust toolchain."

### Package Manager Options

- **Homebrew:** \`brew install uv\`
- **MacPorts:** \`sudo port install uv\`
- **WinGet:** \`winget install --id=astral-sh.uv -e\`
- **Scoop:** \`scoop install main/uv\`
- **Cargo:** \`cargo install --locked uv\`

### Docker and GitHub Releases

Docker image available at \`ghcr.io/astral-sh/uv\`. GitHub Releases provide direct binary downloads for all supported platforms.

### Upgrading uv

"When uv is installed via the standalone installer, it can update itself on-demand:" using \`uv self update\`

Tip: "Updating uv will re-run the installer and can modify your shell profiles. To disable this behavior, set UV_NO_MODIFY_PATH=1."

For other installation methods, use the package manager's upgrade functionality (e.g. \`pip install --upgrade uv\`).

### Shell Autocompletion

Commands for Bash, Zsh, fish, Elvish, and PowerShell are provided to enable autocompletion for both \`uv\` and \`uvx\`. Users must restart their shell or source configuration files after setup.

### Uninstallation

1. Optional cleanup commands:
   - \`uv cache clean\`
   - \`rm -r "$(uv python dir)"\`
   - \`rm -r "$(uv tool dir)"\`
2. Remove binaries from \`~/.local/bin/\` on Unix-like systems or \`$HOME\\.local\\bin\\\` on Windows

"Prior to 0.5.0, uv was installed into ~/.cargo/bin."

---

## PAGE 3: First Steps (https://docs.astral.sh/uv/getting-started/first-steps/)

After installing uv, verify installation by running the \`uv\` command:

\`\`\`
$ uv
An extremely fast Python package manager.

Usage: uv [OPTIONS] <COMMAND>
...
\`\`\`

The command displays a help menu showing available commands.

Once uv is confirmed working, users can:
- Review an overview of features
- Learn how to get help if problems arise
- Jump to guides to begin using uv

---

## PAGE 4: Projects Concept (https://docs.astral.sh/uv/concepts/projects/)

"Projects help manage Python code spanning multiple files."

The page outlines eight key areas for working with projects:
1. Understanding project structure and files
2. Creating new projects
3. Managing project dependencies
4. Running commands and scripts in a project
5. Using lockfiles and syncing the environment
6. Configuring the project for advanced use cases
7. Building distributions to publish a project
8. Using workspaces to work on multiple projects simultaneously

---

## PAGE 4a: Project Structure and Files (https://docs.astral.sh/uv/concepts/projects/layout/)

### The \`pyproject.toml\`

Python project metadata is defined in a \`pyproject.toml\` file. uv requires this file to identify the root directory of a project. \`uv init\` can be used to create a new project.

A minimal project definition includes a name and version:

\`\`\`
[project]
name = "example"
version = "0.1.0"
\`\`\`

Additional project metadata and configuration includes Python version requirement, dependencies, build system, and entry points (commands).

### The project environment

When working on a project with uv, uv will create a virtual environment as needed. uv manages a persistent environment with the project and its dependencies in a \`.venv\` directory next to the \`pyproject.toml\`. It is stored inside the project to make it easy for editors to find -- they need the environment to give code completions and type hints. It is not recommended to include the \`.venv\` directory in version control; it is automatically excluded from \`git\` with an internal \`.gitignore\` file.

To run a command in the project environment, use \`uv run\`. Alternatively the project environment can be activated as normal for a virtual environment.

When \`uv run\` is invoked, it will create the project environment if it does not exist yet or ensure it is up-to-date if it exists. The project environment can also be explicitly created with \`uv sync\`.

It is _not_ recommended to modify the project environment manually, e.g., with \`uv pip install\`. For project dependencies, use \`uv add\` to add a package to the environment. For one-off requirements, use \`uvx\` or \`uv run --with\`.

If you don't want uv to manage the project environment, set \`managed = false\`:
\`\`\`
[tool.uv]
managed = false
\`\`\`

### The lockfile

uv creates a \`uv.lock\` file next to the \`pyproject.toml\`.

\`uv.lock\` is a _universal_ or _cross-platform_ lockfile that captures the packages across all operating systems, architectures, and Python versions.

Unlike the \`pyproject.toml\`, which specifies broad project requirements, the lockfile contains the exact resolved versions installed in the project environment. This file should be checked into version control, allowing for consistent and reproducible installations across machines.

The lockfile is automatically created and updated during uv invocations that use the project environment, i.e., \`uv sync\` and \`uv run\`. The lockfile may also be explicitly updated using \`uv lock\`.

\`uv.lock\` is a human-readable TOML file but is managed by uv and should not be edited manually. The \`uv.lock\` format is specific to uv and not usable by other tools.

### Relationship to \`pylock.toml\`

In PEP 751, Python standardized a new resolution file format, \`pylock.toml\`.

\`pylock.toml\` is a resolution output format intended to replace \`requirements.txt\` (e.g., in the context of \`uv pip compile\`). \`pylock.toml\` is standardized and tool-agnostic.

Some of uv's functionality cannot be expressed in the \`pylock.toml\` format; as such, uv will continue to use the \`uv.lock\` format within the project interface.

However, uv supports \`pylock.toml\` as an export target and in the \`uv pip\` CLI:
- To export a \`uv.lock\` to the \`pylock.toml\` format: \`uv export -o pylock.toml\`
- To generate a \`pylock.toml\` from requirements: \`uv pip compile requirements.in -o pylock.toml\`
- To install from a \`pylock.toml\` file: \`uv pip sync pylock.toml\` or \`uv pip install -r pylock.toml\`

---

## PAGE 4b: Configuring Projects (https://docs.astral.sh/uv/concepts/projects/config/)

### Python version requirement

Projects may declare the Python versions supported in the \`project.requires-python\` field:

\`\`\`
[project]
name = "example"
version = "0.1.0"
requires-python = ">=3.12"
\`\`\`

The Python version requirement determines the Python syntax allowed and affects selection of dependency versions (they must support the same Python version range).

### Entry points

Entry points are the official term for an installed package to advertise interfaces: command line interfaces, graphical user interfaces, and plugin entry points. Using the entry point tables requires a build system to be defined.

**Command-line interfaces:**

\`\`\`
[project.scripts]
hello = "example:hello"
\`\`\`

Then run: \`uv run hello\`

**Graphical user interfaces:**

\`\`\`
[project.gui-scripts]
hello = "example:app"
\`\`\`

These are only different from CLIs on Windows, where they are wrapped by a GUI executable so they can be started without a console.

**Plugin entry points:**

\`\`\`
[project.entry-points.'example.plugins']
a = "example_plugin_a"
\`\`\`

Plugins loaded with:
\`\`\`python
from importlib.metadata import entry_points
for plugin in entry_points(group='example.plugins'):
    plugin.load()
\`\`\`

### Build systems

A build system determines how the project should be packaged and installed. Projects may declare and configure a build system in the \`[build-system]\` table.

uv uses the presence of a build system to determine if a project contains a package that should be installed in the project virtual environment. If a build system is not defined, uv will not attempt to build or install the project itself, just its dependencies. If a build system is defined, uv will build and install the project into the project environment.

The \`--build-backend\` option can be provided to \`uv init\` to create a packaged project with an appropriate layout. The \`--package\` option can create a packaged project with the default build system.

While uv will not build the current project without a build system definition, for legacy reasons, if a build system is not defined in other packages, then \`setuptools.build_meta:__legacy__\` is used.

Build systems power: file inclusion/exclusion, editable installation, dynamic metadata, native code compilation, and vendoring shared libraries.

### Project packaging

You probably need a package if you want to:
- Add commands to the project
- Distribute the project to others
- Use a \`src\` and \`test\` layout
- Write a library

You probably do not need a package if you are:
- Writing scripts
- Building a simple application
- Using a flat layout

Setting \`tool.uv.package = true\` will force a project to be built and installed. Setting \`tool.uv.package = false\` will force it not to be built and installed.

### Project environment path

The \`UV_PROJECT_ENVIRONMENT\` environment variable can be used to configure the project virtual environment path (\`.venv\` by default).

If a relative path is provided, it will be resolved relative to the workspace root. If an absolute path is provided, it will be used as-is.

This option can be used to write to the system Python environment, though it is not recommended. \`uv sync\` will remove extraneous packages from the environment by default.

By default, uv does not read the \`VIRTUAL_ENV\` environment variable during project operations. The \`--active\` flag can be used to opt-in to respecting \`VIRTUAL_ENV\`.

### Build isolation

By default, uv builds all packages in isolated virtual environments alongside their declared build dependencies, as per PEP 517.

Some packages are incompatible with build isolation (e.g., \`flash-attn\` and \`deepspeed\` need to build against the same version of PyTorch installed in the project environment).

uv supports two approaches:

1. **Augmenting build dependencies:** Install in isolated environment with additional build dependencies via \`extra-build-dependencies\` setting. Supports \`match-runtime = true\` to ensure build dependency versions match runtime versions.

Example:
\`\`\`
[tool.uv.extra-build-dependencies]
flash-attn = [{ requirement = "torch", match-runtime = true }]
\`\`\`

2. **Disabling build isolation for specific packages:** Via \`no-build-isolation-package\` setting. uv performs two-phase install -- first packages with isolation, then those without.

Example:
\`\`\`
[tool.uv]
no-build-isolation-package = ["cchardet"]
\`\`\`

### Editable mode

By default, the project will be installed in editable mode, such that changes to the source code are immediately reflected in the environment. \`uv sync\` and \`uv run\` accept a \`--no-editable\` flag for deployment use-cases.

### Conflicting dependencies

uv resolves all project dependencies together, including optional dependencies and dependency groups. If dependencies in one section are incompatible with those in another, uv will fail with an error.

uv supports explicit declaration of conflicting groups:
\`\`\`
[tool.uv]
conflicts = [
    [
      { extra = "extra1" },
      { extra = "extra2" },
    ],
]
\`\`\`

### Limited resolution environments

Constrain the set of solved platforms via the \`environments\` setting:
\`\`\`
[tool.uv]
environments = [
    "sys_platform == 'darwin'",
    "sys_platform == 'linux'",
]
\`\`\`

### Required environments

Mark platforms as required via \`required-environments\`:
\`\`\`
[tool.uv]
required-environments = [
    "sys_platform == 'darwin' and platform_machine == 'x86_64'",
]
\`\`\`

---

## PAGE 4c: Running Commands in Projects (https://docs.astral.sh/uv/concepts/projects/run/)

When working on a project, it is installed into the virtual environment at \`.venv\`. This environment is isolated from the current shell by default, so invocations that require the project (e.g., \`python -c "import example"\`) will fail. Instead, use \`uv run\`:

\`\`\`
$ uv run python -c "import example"
\`\`\`

When using \`run\`, uv will ensure that the project environment is up-to-date before running the given command. The given command can be provided by the project environment or exist outside of it:

\`\`\`
$ uv run example-cli foo
$ uv run bash scripts/foo.sh
\`\`\`

### Requesting additional dependencies

The \`--with\` option includes a dependency for the invocation:
\`\`\`
$ uv run --with httpx==0.26.0 python -c "import httpx; print(httpx.__version__)"
0.26.0
\`\`\`

The requested version will be respected regardless of the project's requirements.

### Running scripts

Scripts that declare inline metadata are automatically executed in environments isolated from the project:

\`\`\`python
# /// script
# dependencies = [
#   "httpx",
# ]
# ///
import httpx
resp = httpx.get("https://peps.python.org/api/peps.json")
\`\`\`

The invocation \`uv run example.py\` would run isolated from the project with only the given dependencies.

### Legacy scripts on Windows

Support for legacy setuptools scripts with \`.ps1\`, \`.cmd\`, and \`.bat\` extensions. uv will automatically look for files ending in these extensions.

### Signal handling

On Unix, uv forwards most signals to the child process. Since terminals send SIGINT to the foreground process group on Ctrl-C, uv will only forward a SIGINT if sent more than once or the child process group differs from uv's.

On Windows, uv ignores Ctrl-C events, deferring handling to the child process.

---

## PAGE 5: Managing Dependencies (https://docs.astral.sh/uv/concepts/projects/dependencies/)

### Dependency Fields

Dependencies are organized across several fields:
- \`project.dependencies\`: Published dependencies
- \`project.optional-dependencies\`: Published optional dependencies or "extras"
- \`dependency-groups\`: Local dependencies for development
- \`tool.uv.sources\`: Alternative sources for dependencies during development

\`project.dependencies\` and \`project.optional-dependencies\` can be used even when a project won't be published. \`dependency-groups\` are a recently standardized feature and may lack universal tool support.

uv supports modifying dependencies using \`uv add\` and \`uv remove\`, though metadata can also be updated by directly editing \`pyproject.toml\`.

### Adding Dependencies

Basic command: \`$ uv add httpx\`

Creates an entry in \`project.dependencies\` with version constraints like \`httpx>=0.27.2\`. The constraint type can be adjusted using \`--bounds\` or by specifying constraints directly: \`$ uv add "httpx>=0.20"\`

When adding from non-registry sources (like GitHub):
\`\`\`
$ uv add "httpx @ git+https://github.com/encode/httpx"
\`\`\`

This creates both a dependency entry and a \`[tool.uv.sources]\` section.

#### Importing from Requirements Files
\`\`\`
uv add -r requirements.txt
\`\`\`

### Removing Dependencies
\`\`\`
$ uv remove httpx
\`\`\`

The \`--dev\`, \`--group\`, or \`--optional\` flags target specific tables.

### Changing Dependencies
\`\`\`
$ uv add "httpx>0.1.0"
\`\`\`

Locked versions only change if necessary to satisfy new constraints. To force an update to the latest compatible version:
\`\`\`
$ uv add "httpx>0.1.0" --upgrade-package httpx
\`\`\`

### Platform-Specific Dependencies

Uses environment markers:
\`\`\`
$ uv add "jax; sys_platform == 'linux'"
$ uv add "numpy; python_version >= '3.11'"
\`\`\`

### Project Dependencies

The \`project.dependencies\` table represents dependencies used when uploading to PyPI or building wheels. Dependencies follow PEP 508 dependency specifiers syntax and PEP 621 standards.

\`\`\`
[project]
name = "albatross"
version = "0.1.0"
dependencies = [
  "tqdm >=4.66.2,<5",
  "torch ==2.2.2",
  "transformers[torch] >=4.39.3,<5",
  "importlib_metadata >=7.1.0,<8; python_version < '3.10'",
  "mollymawk ==0.1.0"
]
\`\`\`

### Dependency Sources (\`tool.uv.sources\`)

Provides alternative dependency sources used during development, supporting patterns not in standard project tables like editable installations and relative paths.

\`\`\`
[project]
dependencies = ["foo"]

[tool.uv.sources]
foo = { path = "./packages/foo" }
\`\`\`

Sources are only respected by uv. Other tools use standard project table definitions.

#### Index Source
\`\`\`
$ uv add torch --index pytorch=https://download.pytorch.org/whl/cpu
\`\`\`

Using an index source pins a package to that index -- it won't download from others. An optional \`explicit\` flag restricts the index to only packages explicitly specifying it.

#### Git Source

HTTP(S): \`$ uv add git+https://github.com/encode/httpx\`
SSH: \`$ uv add git+ssh://[email protected]/encode/httpx\`

Specific Git references:
- Tag: \`--tag 0.27.0\`
- Branch: \`--branch main\`
- Revision/Commit: \`--rev 326b9431c761...\`
- Subdirectory: \`#subdirectory=libs/langchain\`

**Git LFS Support:** Configurable per source with \`lfs = true\`, \`lfs = false\`, or omitted (uses \`UV_GIT_LFS\` environment variable).

#### URL Source

Accepts \`https://\` URLs to wheels (\`.whl\`) or source distributions (\`.tar.gz\`, \`.zip\`).

#### Path Source

Accepts paths to wheels, source distributions, or directories containing \`pyproject.toml\`. Supports absolute and relative paths.

Editable installation for project directories:
\`\`\`
$ uv add --editable ../projects/bar/
\`\`\`

#### Workspace Member Source
\`\`\`
[tool.uv.sources]
foo = { workspace = true }
\`\`\`

All workspace members must be explicitly stated and are always editable.

#### Platform-Specific Sources

Limit sources to specific platforms using PEP 508 markers:
\`\`\`
[tool.uv.sources]
httpx = { git = "https://github.com/encode/httpx", tag = "0.27.2", marker = "sys_platform == 'darwin'" }
\`\`\`

#### Multiple Sources

Specify multiple sources for single dependencies using markers:
\`\`\`
[tool.uv.sources]
httpx = [
  { git = "...", tag = "0.27.2", marker = "sys_platform == 'darwin'" },
  { git = "...", tag = "0.24.1", marker = "sys_platform == 'linux'" },
]
\`\`\`

#### Disabling Sources
\`\`\`
$ uv lock --no-sources
\`\`\`

### Optional Dependencies

Projects can make features optional using extras syntax like \`package[<extra>]\`.

\`\`\`
[project.optional-dependencies]
plot = ["matplotlib>=3.6.3"]
excel = ["odfpy>=1.4.1", "openpyxl>=3.1.0", ...]
\`\`\`

To add: \`$ uv add httpx --optional network\`

Sources can apply to specific optional dependencies using the \`extra\` field:
\`\`\`
[tool.uv.sources]
torch = [
  { index = "torch-cpu", extra = "cpu" },
  { index = "torch-gpu", extra = "gpu" },
]
\`\`\`

### Development Dependencies

Local-only, not included in published project requirements to PyPI. Uses \`[dependency-groups]\` table (PEP 735).

\`\`\`
$ uv add --dev pytest
\`\`\`

Creates:
\`\`\`
[dependency-groups]
dev = ["pytest >=8.1.1,<9"]
\`\`\`

The \`dev\` group is special-cased with \`--dev\`, \`--only-dev\`, and \`--no-dev\` flags. The \`dev\` group syncs by default.

#### Dependency Groups

Divide development dependencies into multiple groups:
\`\`\`
$ uv add --group lint ruff
\`\`\`

Options: \`--all-groups\`, \`--no-default-groups\`, \`--group\`, \`--only-group\`, \`--no-group\`.

\`--dev\`, \`--only-dev\`, and \`--no-dev\` are equivalent to \`--group dev\`, \`--only-group dev\`, and \`--no-group dev\`.

uv requires all dependency groups to be compatible and resolves all groups together.

#### Nesting Groups
\`\`\`
[dependency-groups]
dev = [
  {include-group = "lint"},
  {include-group = "test"}
]
lint = ["ruff"]
test = ["pytest"]
\`\`\`

#### Default Groups

uv includes the \`dev\` group by default. Change with:
\`\`\`
[tool.uv]
default-groups = ["dev", "foo"]
\`\`\`

Enable all: \`default-groups = "all"\`

#### Group \`requires-python\`

Specify different Python version ranges per group:
\`\`\`
[tool.uv.dependency-groups]
dev = {requires-python = ">=3.12"}
\`\`\`

#### Legacy \`dev-dependencies\`

Before standardization, uv used \`tool.uv.dev-dependencies\`. These combine with \`dependency-groups.dev\` contents. This field will eventually be deprecated.

### Build Dependencies

Declared in \`[build-system]\` table under \`build-system.requires\` (PEP 518):
\`\`\`
[build-system]
requires = ["setuptools>=42"]
build-backend = "setuptools.build_meta"
\`\`\`

uv respects \`tool.uv.sources\` when resolving build dependencies. Recommendation: Run \`uv build --no-sources\` when publishing.

### Editable Dependencies

Editable installations add a link (\`.pth\` file) directing the interpreter to include source files directly. uv uses editable installation for workspace packages by default.

\`\`\`
$ uv add --editable ./path/foo
$ uv add --no-editable ./path/foo
\`\`\`

### Virtual Dependencies

Dependencies that are "virtual" -- not installed as packages themselves, but their dependencies are.

Path source with \`package = false\`:
\`\`\`
[tool.uv.sources]
bar = { path = "../projects/bar", package = false }
\`\`\`

Non-dependency workspace members without build systems are virtual by default.

### Dependency Specifiers

uv uses standard dependency specifiers (PEP 508). Composed of:
1. Dependency name
2. Extras (optional)
3. Version specifier
4. Environment marker (optional)

Version specifiers: \`foo >=1.2.3,<2,!=1.4.0\`. Padding with zeros: \`foo ==2\` matches 2.0.0. Star: \`foo ==2.1.*\`. Tilde: \`foo ~=1.2\` equals \`foo >=1.2,<2\`.

Extras in square brackets: \`pandas[excel,plot] ==2.2\`.

Platform-specific: \`importlib-metadata >=7.1.0,<8; python_version < '3.10'\`

Markers combine with \`and\`, \`or\`, and parentheses. Versions within markers must be quoted; versions outside must not be.

---

## PAGE 7: Tools (https://docs.astral.sh/uv/concepts/tools/)

Python packages that provide command-line interfaces.

### The \`uv tool\` Interface

uv provides a dedicated interface for interacting with tools. Tools can be executed without installation via \`uv tool run\`, with dependencies installed in temporary isolated virtual environments. The \`uvx\` alias equals \`uv tool run\` exactly. Tools can also be installed with \`uv tool install\`, making executables available on PATH while maintaining isolation.

### Execution vs Installation

In most cases, executing tools with \`uvx\` is preferable to installing them. Installation becomes useful when tools must be available to other system programs or within Docker images.

### Tool Environments

When running tools via \`uvx\`, virtual environments are stored in the uv cache directory and treated as disposable. Cache cleaning removes these environments; new ones rebuild automatically. Installing tools with \`uv tool install\` creates persistent environments in the uv tools directory, not removed unless uninstalled. "Tool environments are _not_ intended to be mutated directly."

### Tool Versions

Without specified versions, \`uv tool install\` installs the latest available version. \`uvx\` uses the latest version on first invocation, then caches it. Version specifications use syntax like \`ruff@0.6.0\` or \`ruff@latest\`. Installed tools persist specific versions; \`uvx\` can override with \`@latest\` or \`--isolated\` flags.

### Upgrading Tools

Use \`uv tool upgrade\` to update tool environments or \`uv tool install\` to recreate them. Single packages upgrade via \`--upgrade-package\`. Version constraints from initial installation persist through upgrades unless reinstalled.

### Additional Dependencies

Include extra packages during execution with \`uvx --with <package>\` or installation with \`uv tool install --with <package>\`. The \`-w\` shorthand works equivalently.

### Installing from Additional Packages

The \`--with-executables-from\` option installs executables from multiple related packages in a single environment. This differs from \`--with\`, which adds packages as dependencies without installing their executables.

### Python Versions

Tool environments link to specific Python versions using standard discovery logic, ignoring local \`.python-version\` files. The \`--python\` option requests specific versions.

### Tool Executables

Executables include console entry points, script entry points, and binary scripts. They symlink on Unix systems and copy on Windows. The executable directory must be in PATH; \`uv tool update-shell\` adds it to shell configuration.

### Overwriting Executables

Tool installation won't overwrite pre-existing executables from other sources. The \`--force\` flag overrides this behavior.

### Relationship to \`uv run\`

"\`uv tool run <name>\` is nearly equivalent to \`uv run --no-project --with <name> -- <name>\`" but with key differences: the \`--with\` option is inferred, environments cache separately, \`--no-project\` is implicit, and installed tools are prioritized. For non-isolated tools like pytest or mypy, use \`uv run\` instead.

---

## PAGE 8: Python Versions (https://docs.astral.sh/uv/concepts/python-versions/)

"A Python version is composed of a Python interpreter (i.e. the \`python\` executable), the standard library, and other supporting files."

### Managed and System Python Installations

uv distinguishes between managed Python installations (those installed by uv) and system Python installations (all others, including those managed by tools like pyenv).

### Requesting a Version

Users can request specific Python versions using the \`--python\` flag. Supported formats:
- Simple versions: \`3\`, \`3.12\`, \`3.12.3\`
- Version specifiers: \`>=3.12,<3.13\`
- Variants: \`3.13t\`, \`3.12.0d\`
- Implementation formats: \`cpython\`, \`pypy@3.11\`
- Full specifications: \`cpython-3.12.3-macos-aarch64-none\`
- System paths or executable names

#### Python Version Files

\`.python-version\` files establish default version requests. Created with \`uv python pin\` commands (local or global). uv searches parent directories but respects project boundaries.

### Installing Python Versions

uv bundles downloadable CPython and PyPy distributions for macOS, Linux, and Windows.

- Specific versions: \`uv python install 3.12.3\`
- Latest patches: \`uv python install 3.12\`
- Constrained versions: \`uv python install '>=3.8,<3.10'\`
- Multiple versions: \`uv python install 3.9 3.10 3.11\`
- Implementations: \`uv python install pypy\`

#### Installing Python Executables

"uv installs Python executables into your \`PATH\` by default, e.g., on Unix \`uv python install 3.12\` will install a Python executable into \`~/.local/bin\`, e.g., as \`python3.12\`."

The \`--default\` flag installs \`python\` and \`python3\` executables. uv prefers latest patch versions and only overwrites managed executables without the \`--force\` flag.

### Upgrading Python Versions

"uv allows transparently upgrading Python versions to the latest patch release, e.g., 3.13.4 to 3.13.5. uv does not allow transparently upgrading across minor Python versions, e.g., 3.12 to 3.13, because changing minor versions can affect dependency resolution."

Use \`uv python upgrade 3.12\` for individual versions or \`uv python upgrade\` for all versions. Minor version directories use symbolic links (Unix) or junctions (Windows) to manage automatic upgrades.

### Project Python Versions

uv respects \`requires-python\` specifications in pyproject.toml, using the first compatible version unless otherwise specified.

### Viewing Available Versions

\`uv python list\` with filtering options:
- Filter by version: \`uv python list 3.13\`
- Filter by implementation: \`uv python list pypy\`
- Show all versions: \`--all-versions\`
- Show other platforms: \`--all-platforms\`
- Only installed: \`--only-installed\`

### Finding Python Executables

\`uv python find\` locates executables, supporting version specifiers like \`'>=3.11'\`. The \`--system\` flag ignores virtual environments.

### Discovery of Python Versions

uv checks these locations in order:
1. Managed Python in \`UV_PYTHON_INSTALL_DIR\`
2. System PATH for \`python\`, \`python3\`, \`python3.x\` (macOS/Linux) or \`python.exe\` (Windows)
3. Windows registry and Microsoft Store Python interpreters

"When searching for a managed Python version, uv will prefer newer versions first. When searching for a system Python version, uv will use the first compatible version -- not the newest version."

### Python Pre-releases

Pre-releases aren't selected by default but will be used if no other matching installation exists.

### Free-threaded Python

uv supports free-threaded Python variants in CPython 3.13+. For 3.13, explicit selection is required (\`3.13t\` or \`3.13+freethreaded\`). For 3.14+, GIL-enabled builds are preferred but free-threaded versions are allowed. Use \`+gil\` to require GIL-enabled variants.

### Debug Python Variants

Debug builds are used only when no other version matches. Explicit requests use \`3.13d\` or \`3.13+debug\`.

### Disabling Automatic Downloads

The \`python-downloads\` setting (default: \`automatic\`) can be set to \`manual\`. Use \`--no-python-downloads\` flag or configure in persistent configuration files.

### Managed vs System Preference

\`--managed-python\` ignores system versions; \`--no-managed-python\` ignores managed versions. The \`python-preference\` setting offers options:
- \`managed\` (default): Prefers managed installations
- \`only-managed\`: Exclusively uses managed versions
- \`system\`: Prefers system installations
- \`only-system\`: Exclusively uses system versions

### Python Implementation Support

uv supports CPython (\`cpython\`, \`cp\`), PyPy (\`pypy\`, \`pp\`), GraalPy (\`graalpy\`, \`gp\`), and Pyodide (\`pyodide\`).

### Managed Python Distributions

**CPython:** Uses pre-built distributions from Astral's \`python-build-standalone\` project -- self-contained, portable, and performant.

**PyPy:** "PyPy is not actively developed anymore and only supports Python versions up to 3.11."

**Pyodide:** CPython port for WebAssembly/Emscripten platforms.

### Transparent x86_64 Emulation on aarch64

Both macOS (Rosetta 2) and Windows support running x86_64 binaries on aarch64. Either uv binary can use either Python interpreter, but packages must match the interpreter's architecture.

### Windows Registry Registration

Managed Python versions register with the Windows registry per PEP 514, enabling selection via the \`py\` launcher.

---

## PAGE 9: Running Scripts (https://docs.astral.sh/uv/guides/scripts/)

A Python script is a file intended for standalone execution. Using uv to execute scripts ensures that script dependencies are managed without manually managing environments.

### Running a script without dependencies

\`\`\`
$ uv run example.py
Hello world
\`\`\`

Scripts using standard library modules work similarly. Arguments may be provided. Scripts can be read from stdin using \`uv run -\` or here-documents.

Important: "if you use \`uv run\` in a project, i.e., a directory with a \`pyproject.toml\`, it will install the current project before running the script." Use \`--no-project\` to skip this.

### Running a script with dependencies

\`\`\`
$ uv run --with rich example.py
$ uv run --with 'rich>12,<13' example.py
\`\`\`

Multiple dependencies can be requested by repeating \`--with\`.

### Creating a Python script

\`\`\`
$ uv init --script example.py --python 3.12
\`\`\`

### Declaring script dependencies

The inline metadata format allows declaring dependencies in the script itself:

\`\`\`
$ uv add --script example.py 'requests<3' 'rich'
\`\`\`

Creates:
\`\`\`
# /// script
# dependencies = [
#   "requests<3",
#   "rich",
# ]
# ///
\`\`\`

"When using inline script metadata, even if \`uv run\` is used in a project, the project's dependencies will be ignored."

Python version requirements are also respected:
\`\`\`
# /// script
# requires-python = ">=3.12"
# dependencies = []
# ///
\`\`\`

### Using a shebang to create an executable file

\`\`\`
#!/usr/bin/env -S uv run --script
print("Hello, world!")
\`\`\`

Make executable with \`chmod +x greet\`, then run \`./greet\`.

### Using alternative package indexes

\`\`\`
$ uv add --index "https://example.com/simple" --script example.py 'requests<3' 'rich'
\`\`\`

### Locking dependencies

\`\`\`
$ uv lock --script example.py
\`\`\`

Creates a \`.lock\` file adjacent to the script (e.g., \`example.py.lock\`).

### Improving reproducibility

Add \`exclude-newer\` field in inline metadata:
\`\`\`
# /// script
# dependencies = ["requests"]
# [tool.uv]
# exclude-newer = "2023-10-16T00:00:00Z"
# ///
\`\`\`

### Using different Python versions

\`\`\`
$ uv run --python 3.10 example.py
\`\`\`

### Using GUI scripts

On Windows, \`uv\` runs scripts with \`.pyw\` extension using \`pythonw\`. GUI dependencies work with the same approach: \`$ uv run --with PyQt5 example_pyqt.pyw\`.

---

## PAGE 10: Working on Projects Guide (https://docs.astral.sh/uv/guides/projects/)

uv supports managing Python projects, which define their dependencies in a \`pyproject.toml\` file.

### Creating a new project

\`\`\`
$ uv init hello-world
$ cd hello-world
\`\`\`

Or initialize in the working directory:
\`\`\`
$ mkdir hello-world
$ cd hello-world
$ uv init
\`\`\`

uv creates:
\`\`\`
.gitignore
.python-version
README.md
main.py
pyproject.toml
\`\`\`

Try it: \`$ uv run main.py\` outputs "Hello from hello-world!"

### Project structure

A complete listing includes \`.venv\`, \`.python-version\`, \`README.md\`, \`main.py\`, \`pyproject.toml\`, and \`uv.lock\`.

**pyproject.toml:**
\`\`\`
[project]
name = "hello-world"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
dependencies = []
\`\`\`

Use \`uv add\` and \`uv remove\` to manage dependencies from the terminal. Use \`[tool.uv]\` section for uv configuration options.

**.python-version:** Contains the project's default Python version for creating the virtual environment.

**.venv:** The project's virtual environment, isolated from the rest of the system.

**uv.lock:** Cross-platform lockfile with exact resolved versions. Human-readable TOML, managed by uv, should not be edited manually. Should be checked into version control.

### Managing dependencies

\`\`\`
$ uv add requests
$ uv add 'requests==2.31.0'
$ uv add git+https://github.com/psf/requests
$ uv add -r requirements.txt -c constraints.txt
$ uv remove requests
$ uv lock --upgrade-package requests
\`\`\`

### Viewing your version

\`\`\`
$ uv version
hello-world 0.7.0

$ uv version --short
0.7.0

$ uv version --output-format json
{
    "package_name": "hello-world",
    "version": "0.7.0",
    "commit_info": null
}
\`\`\`

### Running commands

\`uv run\` verifies the lockfile and environment are up-to-date before running. \`uv run\` guarantees your command runs with all required dependencies at their locked versions.

Note: \`uv run\` does not remove extraneous packages by default.

\`\`\`
$ uv add flask
$ uv run -- flask run -p 3000
$ uv run example.py
\`\`\`

Alternatively, manually sync and activate:
\`\`\`
$ uv sync
$ source .venv/bin/activate
$ flask run -p 3000
\`\`\`

### Building distributions

\`\`\`
$ uv build
$ ls dist/
hello-world-0.1.0-py3-none-any.whl
hello-world-0.1.0.tar.gz
\`\`\`

---

## PAGE 11: Compatibility with pip (https://docs.astral.sh/uv/pip/compatibility/)

"uv is designed as a drop-in replacement for common pip and pip-tools workflows." Existing users can "switch to uv without making meaningful changes to their packaging workflows; and, in most cases, swapping out \`pip install\` for \`uv pip install\` should 'just work'."

However, "uv is not intended to be an exact clone of pip."

### Configuration Files and Environment Variables

uv does not read pip-specific configuration files like \`pip.conf\` or environment variables like \`PIP_INDEX_URL\`. This avoids requiring bug-for-bug compatibility, lock-in, version management complications, and user confusion. Instead, uv supports \`UV_INDEX_URL\` and persistent configuration in \`uv.toml\` or \`[tool.uv.pip]\` sections.

### Pre-release Compatibility

uv accepts pre-releases in two cases:
1. Direct dependencies with pre-release specifiers (e.g., \`flask>=2.0.0rc1\`)
2. When all published versions are pre-releases

If resolution fails due to transitive pre-releases, use \`--prerelease allow\` or add the dependency with a pre-release specifier.

### Multiple Index Handling

uv iterates over indexes in order (preferring \`--extra-index-url\` over the default index) and stops at the first match. pip combines candidate versions from all indexes. uv's approach prevents "dependency confusion" attacks.

As of v0.1.39, \`--index-strategy\` supports:
- \`first-index\` (default)
- \`unsafe-first-match\`
- \`unsafe-best-match\`

### PEP 517 Build Isolation

uv uses PEP 517 build isolation by default (akin to \`pip install --use-pep517\`).

### Transitive URL Dependencies

uv assumes non-URL dependencies do not introduce URL dependencies. Provide URL dependencies as direct dependencies.

### Virtual Environments by Default

\`uv pip install\` and \`uv pip sync\` work with virtual environments by default. uv will install into the currently active virtual environment, or search for one named \`.venv\`. To install into non-virtual environments, use \`--python /path/to/python\` or \`--system\`.

### Resolution Strategy

Neither pip nor uv guarantee the exact set of packages installed; only that the resolution will be consistent, deterministic, and compliant with the specifiers. Different resolutions are both equally valid.

### pip check

\`uv pip check\` surfaces diagnostics for: missing/unparseable METADATA, incompatible \`Requires-Python\`, missing/incompatible dependencies, and multiple installed versions.

### --user and User Install Scheme

uv does not support \`--user\`. Virtual environments are recommended for isolation.

### --only-binary Enforcement

When \`--only-binary :all:\` is provided, uv refuses to build source distributions from PyPI and also enforces this for direct URLs (unlike pip), with exceptions.

### --no-binary Enforcement

uv refuses to install pre-built binaries but reuses cached ones. uv's resolver still reads metadata from pre-built binaries.

### Bytecode Compilation

uv doesn't compile \`.py\` to \`.pyc\` during installation by default. Use \`--compile-bytecode\` or \`UV_COMPILE_BYTECODE=1\`.

### Strictness and Spec Enforcement

"uv tends to be stricter than pip, and will often reject packages that pip would install." For example, uv rejects HTML indexes with invalid URL fragments.

### pip Command-line Options

uv does not support the complete set of pip's options, although it supports a large subset.

### Registry Authentication

uv only supports the \`subprocess\` option for \`--keyring-provider\`. Unlike pip, uv does not enable keyring authentication by default and does not wait for HTTP 401 before searching for authentication.

### egg Support

uv does not support \`.egg\`-style distributions but has partial support for \`.egg-info\` and \`.egg-link\` distributions.

### Build Constraints

\`--constraint\` does not apply to build dependencies. Use \`--build-constraint\` instead.

### pip compile Defaults

Three notable differences:
1. uv requires explicit output file with \`-o\` or \`--output-file\`
2. uv defaults to \`--strip-extras\` (pip-compile defaults to \`--no-strip-extras\`)
3. uv doesn't write index URLs by default; use \`--emit-index-url\`

### requires-python Upper Bounds

uv only considers lower bounds and ignores upper bounds entirely. \`>=3.8, <4\` is treated as \`>=3.8\`. Respecting upper bounds "often leads to formally correct but practically incorrect resolutions."

### requires-python Specifiers

uv truncates candidate versions to major.minor.patch, ignoring pre-release identifiers. Python 3.13.0b1 satisfies \`requires-python: >=3.13\`.

### Package Priority

\`uv pip install foo bar\` prioritizes newer versions of \`foo\` over \`bar\` and could produce different results than \`uv pip install bar foo\`.

### Wheel Filename and Metadata Validation

uv rejects wheels whose filenames are inconsistent with the wheel metadata. To force acceptance, set \`UV_SKIP_WHEEL_FILENAME_CHECK=1\`.

### Package Name Normalization

uv normalizes package names to PEP 503-compliant forms.

---

## PAGE 12: CLI Reference (https://docs.astral.sh/uv/reference/cli/)

### Main Command Structure

**Authentication & Credentials:**
- \`uv auth\` - Manage authentication (login, logout, token, dir)
- \`uv auth login\` - Login to a service
- \`uv auth logout\` - Logout of a service
- \`uv auth token\` - Show authentication token
- \`uv auth dir\` - Show path to credentials directory

**Project Management:**
- \`uv init\` - Create a new project
- \`uv add\` - Add dependencies to the project
- \`uv remove\` - Remove dependencies from the project
- \`uv version\` - Read or update the project's version
- \`uv sync\` - Update the project's environment
- \`uv lock\` - Update the project's lockfile
- \`uv export\` - Export the project's lockfile to alternate format
- \`uv tree\` - Display the project's dependency tree

**Execution & Tools:**
- \`uv run\` - Run a command or script
- \`uv tool\` - Run and install commands provided by Python packages
- \`uv format\` - Format Python code in the project

**Python Management:**
- \`uv python list\` - List available Python versions
- \`uv python install\` - Install Python version
- \`uv python upgrade\` - Upgrade Python installation
- \`uv python find\` - Find Python interpreter
- \`uv python pin\` - Pin Python version
- \`uv python dir\` - Show Python directory
- \`uv python uninstall\` - Uninstall Python version
- \`uv python update-shell\` - Update shell configuration

**Package Management (pip-compatible):**
- \`uv pip compile\` - Compile requirements
- \`uv pip sync\` - Sync environment with requirements
- \`uv pip install\` - Install packages
- \`uv pip uninstall\` - Uninstall packages
- \`uv pip freeze\` - Show installed packages
- \`uv pip list\` - List packages
- \`uv pip show\` - Show package information
- \`uv pip tree\` - Display dependency tree
- \`uv pip check\` - Check for compatibility issues

**Virtual Environments & Building:**
- \`uv venv\` - Create a virtual environment
- \`uv build\` - Build Python packages into distributions and wheels
- \`uv publish\` - Upload distributions to an index

**Maintenance:**
- \`uv cache clean\` - Clean cache
- \`uv cache prune\` - Prune cache
- \`uv cache dir\` - Show cache directory
- \`uv cache size\` - Show cache size
- \`uv self update\` - Update uv executable
- \`uv self version\` - Show version
- \`uv generate-shell-completion\` - Generate shell completion
- \`uv help\` - Display documentation

### Common Global Options

- \`--help\` / \`-h\` - Display help
- \`--verbose\` / \`-v\` - Use verbose output
- \`--quiet\` / \`-q\` - Use quiet output
- \`--color\` - Control color output (auto/always/never)
- \`--directory\` - Change working directory
- \`--project\` - Discover project in given directory
- \`--config-file\` - Use specific uv.toml file
- \`--no-config\` - Avoid discovering configuration files
- \`--no-cache\` / \`-n\` - Avoid using cache
- \`--offline\` - Disable network access
- \`--managed-python\` - Require uv-managed Python versions
- \`--no-managed-python\` - Disable uv-managed Python
- \`--native-tls\` - Use platform's native certificate store
- \`--no-python-downloads\` - Disable automatic Python downloads
- \`--allow-insecure-host\` / \`--trusted-host\` - Allow insecure connections
- \`--keyring-provider\` - Configure keyring for authentication

### Dependency Resolution Options

- \`--index\` - Specify package index URLs
- \`--default-index\` - Set default index (PyPI by default)
- \`--extra-index-url\` - Additional index URLs
- \`--find-links\` / \`-f\` - Locations for distributions
- \`--no-index\` - Ignore registry indexes
- \`--index-strategy\` - Strategy for multiple indexes
- \`--prerelease\` - Handle pre-release versions
- \`--resolution\` - Version selection strategy (highest/lowest/lowest-direct)

### Build & Installation Options

- \`--no-binary\` - Don't install pre-built wheels
- \`--no-build\` - Don't build source distributions
- \`--no-build-isolation\` - Disable build isolation
- \`--compile-bytecode\` / \`--compile\` - Compile to bytecode
- \`--link-mode\` - Method for installing from cache
- \`--config-setting\` / \`-C\` - PEP 517 settings

### UV Run Command Details

Usage: \`uv run [OPTIONS] [COMMAND]\`

Key features: treats \`.py\` files as scripts, handles HTTP(S) URLs for remote scripts, reads from stdin with \`-\`, runs in project environment or discovered virtual environment, supports inline dependency metadata.

Run-specific options:
- \`--active\` - Prefer active virtual environment
- \`--all-extras\` - Include all optional dependencies
- \`--all-groups\` - Include all dependency groups
- \`--all-packages\` - Run with all workspace members
- \`--extra\` - Include optional dependencies
- \`--group\` - Include specific dependency group
- \`--no-dev\` - Exclude development dependencies
- \`--no-editable\` - Install editable dependencies as non-editable
- \`--only-dev\` - Only include development group
- \`--only-group\` - Only include specified group
- \`--exact\` - Perform exact sync
- \`--module\` / \`-m\` - Run a Python module
- \`--script\` / \`-s\` - Run as PEP 723 script
- \`--gui-script\` - Run as GUI script (Windows only)
- \`--python\` / \`-p\` - Specify Python interpreter
- \`--with\` / \`-w\` - Run with packages installed
- \`--with-editable\` - Run with editable packages
- \`--with-requirements\` - Run with packages from files
- \`--env-file\` - Load environment from .env file
- \`--isolated\` - Run in isolated environment
- \`--no-sync\` - Avoid syncing environment
- \`--no-project\` / \`--no_workspace\` - Avoid project discovery
- \`--refresh\` - Refresh cached data
- \`--reinstall\` / \`--force-reinstall\` - Reinstall all packages
- \`--upgrade\` / \`-U\` - Allow upgrades
- \`--no-sources\` - Ignore tool.uv.sources table
- \`--package\` - Run in specific workspace package

### UV Init Command Details

Usage: \`uv init [OPTIONS] [PATH]\`

Project types:
- \`--app\` / \`--application\` - Create application project (default)
- \`--lib\` / \`--library\` - Create library project
- \`--script\` - Create PEP 723 script

Customization:
- \`--name\` - Set project name
- \`--description\` - Set project description
- \`--author-from\` - Fill author information (auto/git/none)
- \`--python\` / \`-p\` - Specify Python version
- \`--no-pin-python\` - Don't create .python-version file
- \`--build-backend\` - Choose build backend (uv/hatch/flit/pdm/poetry/setuptools/maturin/scikit)
- \`--package\` - Setup as distributable package
- \`--no-package\` - Don't setup as package
- \`--vcs\` - Initialize version control (git/none)
- \`--readme\` / \`--no-readme\` - Create README file
- \`--bare\` - Only create pyproject.toml
- \`--no-workspace\` / \`--no-project\` - Create standalone project

### UV Add Command Details

Usage: \`uv add [OPTIONS] <PACKAGES|--requirements <REQUIREMENTS>>\`

- \`--dev\` - Add to development group
- \`--group\` - Add to specified group
- \`--optional\` - Add as optional dependency
- \`--editable\` - Add as editable
- \`--marker\` / \`-m\` - Apply marker to packages
- \`--extra\` - Enable extras for dependency
- \`--branch\` - Use Git branch
- \`--lfs\` - Use Git LFS
- \`--bounds\` - Kind of version specifier (lower/major/minor/exact)
- \`--frozen\` - Add without re-locking
- \`--requirements\` - Add from requirements file

### Authentication Commands

**uv auth login:** Arguments: SERVICE. Options: \`--username\`/\`-u\`, \`--password\`, \`--token\`/\`-t\`. Supports reading credentials from stdin with \`-\`. Uses system keyring for secure storage.

**uv auth logout:** Arguments: SERVICE. Options: \`--username\`/\`-u\`.

**uv auth token:** Arguments: SERVICE. Options: \`--username\`/\`-u\`. Displays stored authentication token.

**uv auth dir:** Shows path to credentials directory. Default: \`$XDG_DATA_HOME/uv/credentials\` (Unix) or \`%APPDATA%\\uv\\data\\credentials\` (Windows). Override with \`$UV_CREDENTIALS_DIR\`.

### Key Environment Variables

\`UV_CACHE_DIR\`, \`UV_CONFIG_FILE\`, \`UV_WORKING_DIR\`, \`UV_PROJECT\`, \`UV_INSECURE_HOST\`, \`UV_NO_CACHE\`, \`UV_NO_CONFIG\`, \`UV_NO_PROGRESS\`, \`UV_OFFLINE\`, \`UV_MANAGED_PYTHON\`, \`UV_NO_MANAGED_PYTHON\`, \`UV_NATIVE_TLS\`, \`UV_FROZEN\`, \`UV_LOCKED\`, \`UV_NO_SYNC\`, \`UV_NO_SOURCES\`, \`UV_PYTHON\`, \`UV_INDEX\`, \`UV_DEFAULT_INDEX\`, \`UV_NO_INDEX\`, \`UV_FIND_LINKS\`, \`UV_EXTRA_INDEX_URL\`, \`UV_INDEX_URL\` (deprecated), \`UV_CONSTRAINT\`, \`UV_PRERELEASE\`, \`UV_RESOLUTION\`, \`UV_FORK_STRATEGY\`, \`UV_INDEX_STRATEGY\`, \`UV_EXCLUDE_NEWER\`, \`UV_KEYRING_PROVIDER\`, \`UV_NO_BINARY\`, \`UV_NO_BUILD\`, \`UV_NO_BUILD_ISOLATION\`, \`UV_NO_BINARY_PACKAGE\`, \`UV_NO_BUILD_PACKAGE\`, \`UV_LINK_MODE\`, \`UV_COMPILE_BYTECODE\`, \`UV_ENV_FILE\`, \`UV_NO_ENV_FILE\`, \`UV_DEV\`, \`UV_NO_DEV\`, \`UV_NO_DEFAULT_GROUPS\`, \`UV_NO_GROUP\`, \`UV_ISOLATED\`, \`UV_NO_EDITABLE\`, \`UV_INIT_BUILD_BACKEND\`, \`UV_CREDENTIALS_DIR\`.

### Platform-Specific Notes

**Windows:** \`--gui-script\` option available. Cache: \`%LOCALAPPDATA%\\uv\\cache\`. Data: \`%APPDATA%\\uv\\data\`.

**macOS & Linux:** Cache: \`$XDG_CACHE_HOME/uv\` or \`$HOME/.cache/uv\`. Data: \`$XDG_DATA_HOME/uv\` or \`$HOME/.local/share/uv\`.

---

That is the complete knowledge base from all 12 requested pages (plus 3 additional sub-pages that the original URLs redirected to or linked from). The two URLs that failed were \`/uv/concepts/dependencies/\` (which redirected to \`/uv/concepts/projects/dependencies/\`, successfully fetched) and \`/uv/concepts/environments/\` (which returned 404 -- this content is now found within the project structure/layout page, which was successfully fetched).
`;
