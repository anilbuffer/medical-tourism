
# Git Branching and Committing Standards

Strictly adhere to the following Creative Buffer Consultancy Pvt. Ltd. Git Standards whenever creating git branches, proposing branch names, or writing git commit messages.

---

## 1. Branch Naming Convention

### Format
`<type>/<ticket_no>-<description>__<parent_branch>__<yymmdd>_<name_initials>`

### Rules
- **type**: Choose from the fixed list: `feat`, `fix`, `hotfix`, `chore`, `docs`, `refactor`, `test`, `release`.
- **ticket_no**: The exact ticket ID (e.g., `CB-142`). If ticket ID is unknown/unspecified, ask the user or use standard placeholder as instructed.
- **description**: Kebab-case description (a few concise words about the work, NOT the ticket title).
- **parent_branch**: The branch branched from (e.g., `develop`, `main`, `staging`).
- **yymmdd**: The date the branch was cut in 2-digit format (e.g., `260827` for Aug 27, 2026).
- **name_initials**: Initials in lowercase (e.g., `dk` for Deepak / user's initials).
- **Separators**:
  - Single slash `/` after `<type>`
  - Double underscore `__` before `<parent_branch>`
  - Double underscore `__` before `<yymmdd>`
  - Single underscore `_` before `<name_initials>`
- **One task = one branch**.

### Example
`feat/CB-142-oauth-login__develop__260803_dk`

---

## 2. Commit Message Template

### Template
```text
<type>(<scope>): <imperative subject under 50 chars>

<Why this change was needed. What the behavior was before and what it is now. Include anything a reviewer cannot easily infer from the diff.>

Branch: <branch_name>
```

### Rules
- **Subject**:
  - Imperative mood (e.g., `"add"`, `"fix"`, `"update"` — NOT `"added"`, `"adds"`, `"fixing"`).
  - Strictly under 50 characters.
  - No trailing period/full stop.
- **Scope**: Keep it short in lowercase parentheses (e.g., `payments`, `auth`, `ci`, `ui`, `permits`).
- **Body**:
  - Wrap lines at ~72 characters.
  - Explain the **why**, the **before**, and the **after**.
- **Branch trailer**:
  - The last line MUST be the full branch name prefixed with `Branch: `:
  `Branch: <branch_name>`

### Example
```text
feat(payments): add Stripe webhook retry

Adds retry handling for failed Stripe webhook events to improve
reliability during temporary network or service failures.

Branch: feat/CB-311-stripe-retry__develop__260803_dk
```

---

## 3. Commit Types & Version Bumping

| Type | Description | Version Bump |
| :--- | :--- | :--- |
| **`feat`** | New functionality / feature | **MINOR BUMP** |
| **`fix`** | Bug fix | **PATCH BUMP** |
| **`hotfix`** | Critical production fix | **PATCH BUMP** |
| **`refactor`** | Code improvements with no behavior change | **NO BUMP** |
| **`perf`** | Performance improvements | **NO BUMP** |
| **`test`** | Test-related additions/changes | **NO BUMP** |
| **`docs`** | Documentation updates | **NO BUMP** |
| **`build`** | Build system or dependency updates | **NO BUMP** |
| **`ci`** | CI/CD pipeline changes | **NO BUMP** |
| **`chore`** | Maintenance / non-code tasks | **NO BUMP** |
