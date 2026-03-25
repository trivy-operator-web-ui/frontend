# 1. Create an issue

Every contribution **MUST** be discussed first through an issue.

# 2. Commit convention

This project enforces the [Angular Commit Convention](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#specification). All commits must follow this specification.

# 3. Setup the project

## A. Node

The Node version that should be used for this project is specified inside the [.nvmrc](./.nvmrc) file.

## B. Install the dependencies

Simply run `npm install`.

## C. Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## D. Building

To build the project run:

```bash
npm run build-prod
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

# 4. CI/CD

CI/CD will build the project and check the commits.

# 5. Release

Once your PR merged, eveything will be release automatically.