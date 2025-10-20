# Psychologist Portfolio

A modern, responsive portfolio website for psychologists to showcase their services, experience, and contact information.

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. Push your code to a GitHub, GitLab, or Bitbucket repository
2. Go to [Vercel](https://vercel.com/) and sign in with your Git provider
3. Click "Add New" → "Project"
4. Import your repository
5. Vercel will automatically detect it's a Vite project and configure the settings
6. Click "Deploy"
7. Your site will be live at `https://your-repo-name.vercel.app`

### Option 2: Netlify

1. Push your code to a Git repository
2. Go to [Netlify](https://www.netlify.com/) and sign in with your Git provider
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Set the build command to `npm run build` and publish directory to `dist`
6. Click "Deploy site"

## 🛠 Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📦 Build for Production

```bash
npm run build
```

This will create a `dist` folder with the production build.

## 🌐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_API_URL=your_api_url
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).